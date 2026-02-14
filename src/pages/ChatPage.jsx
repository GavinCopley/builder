import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import EssayTypeSelector from '../components/EssayTypeSelector'
import TopicInput from '../components/TopicInput'
import EssayStructureBuilder from '../components/EssayStructureBuilder'
import { buildInitialGroups, buildEmptyStructure, createNewBodyGroup } from '../data/essayTypes'
import { Loader2 } from 'lucide-react'

export default function ChatPage() {
    const { chatId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    // Flow steps: 'select_type' → 'topic_input' → 'builder'
    const [step, setStep] = useState('select_type')
    const [essayType, setEssayType] = useState(null)
    const [topic, setTopic] = useState('')
    const [groups, setGroups] = useState([])
    const [structure, setStructure] = useState({})
    const [chatLoading, setChatLoading] = useState(true)
    const [currentChatId, setCurrentChatId] = useState(chatId || null)

    // Load existing chat if chatId provided
    useEffect(() => {
        if (chatId) {
            loadChat(chatId)
        } else {
            // New chat — reset state
            setEssayType(null)
            setTopic('')
            setGroups([])
            setStructure({})
            setCurrentChatId(null)
            setStep('select_type')
            setChatLoading(false)
        }
    }, [chatId])

    const loadChat = async (id) => {
        setChatLoading(true)
        try {
            const { data: chat, error: chatError } = await supabase
                .from('chats')
                .select('*')
                .eq('id', id)
                .single()

            if (chatError) throw chatError

            setEssayType(chat.essay_type)
            setCurrentChatId(chat.id)

            // Load topic from structure meta
            const savedStructure = chat.structure || {}
            setTopic(savedStructure._topic || '')

            // Load saved groups or build defaults
            if (savedStructure._groups && Array.isArray(savedStructure._groups)) {
                setGroups(savedStructure._groups)
            } else {
                setGroups(buildInitialGroups(chat.essay_type))
            }

            setStructure(savedStructure)
            setStep('builder')
        } catch (err) {
            console.error('Error loading chat:', err)
            navigate('/')
        } finally {
            setChatLoading(false)
        }
    }

    // Step 1: Select essay type
    const handleSelectEssayType = (type) => {
        setEssayType(type)
        setStep('topic_input')
    }

    // Step 2: Submit topic/prompt
    const handleTopicSubmit = async ({ mode, text }) => {
        setTopic(text)

        const initialGroups = buildInitialGroups(essayType)
        setGroups(initialGroups)

        const emptyStructure = {
            ...buildEmptyStructure(initialGroups),
            _topic: text,
            _topicMode: mode,
            _groups: initialGroups,
        }
        setStructure(emptyStructure)
        setStep('builder')

        // Create the chat in Supabase
        try {
            const title = text
                ? text.trim().slice(0, 60) + (text.trim().length > 60 ? '...' : '')
                : 'Untitled Essay'

            const { data: newChat, error } = await supabase
                .from('chats')
                .insert({
                    user_id: user.id,
                    title,
                    essay_type: essayType,
                    structure: emptyStructure,
                })
                .select()
                .single()

            if (error) throw error

            setCurrentChatId(newChat.id)
            navigate(`/chat/${newChat.id}`, { replace: true })
        } catch (err) {
            console.error('Error creating chat:', err)
        }
    }

    // Save structure to Supabase (debounce-friendly)
    const saveStructure = useCallback(async (newStructure) => {
        if (!currentChatId) return
        try {
            await supabase
                .from('chats')
                .update({ structure: newStructure })
                .eq('id', currentChatId)
        } catch (err) {
            console.error('Error saving structure:', err)
        }
    }, [currentChatId])

    // Update a section's content
    const handleUpdateSection = (sectionId, content) => {
        const newStructure = { ...structure, [sectionId]: content }
        setStructure(newStructure)
        saveStructure(newStructure)

        // Auto-update title from thesis/hook
        if ((sectionId === 'thesis' || sectionId === 'hook') && content.trim()) {
            const title = content.trim().slice(0, 60) + (content.trim().length > 60 ? '...' : '')
            supabase
                .from('chats')
                .update({ title })
                .eq('id', currentChatId)
                .then()
        }
    }

    // Add a new body paragraph group
    const handleAddParagraph = () => {
        const newGroup = createNewBodyGroup(essayType, groups)
        if (!newGroup) return

        // Insert before the conclusion (last group)
        const newGroups = [...groups]
        const conclusionIdx = newGroups.length - 1
        newGroups.splice(conclusionIdx, 0, newGroup)

        // Re-number non-intro/conclusion body groups
        let bodyNum = 1
        const renumbered = newGroups.map(g => {
            if (g.addable) {
                const base = g.group.replace(/\s*\d+$/, '')
                return { ...g, group: `${base} ${bodyNum++}` }
            }
            return g
        })

        setGroups(renumbered)

        // Add empty entries for new sections & persist
        const newStructure = { ...structure }
        for (const section of newGroup.sections) {
            if (!(section.id in newStructure)) {
                newStructure[section.id] = ''
            }
        }
        newStructure._groups = renumbered
        setStructure(newStructure)
        saveStructure(newStructure)
    }

    // Remove a dynamically-added paragraph group
    const handleRemoveParagraph = (groupKey) => {
        const filtered = groups.filter(g => g.key !== groupKey)

        // Re-number body groups
        let bodyNum = 1
        const renumbered = filtered.map(g => {
            if (g.addable) {
                const base = g.group.replace(/\s*\d+$/, '')
                return { ...g, group: `${base} ${bodyNum++}` }
            }
            return g
        })

        setGroups(renumbered)

        const newStructure = { ...structure, _groups: renumbered }
        setStructure(newStructure)
        saveStructure(newStructure)
    }

    if (chatLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--color-text-secondary)' }} />
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            {step === 'select_type' && (
                <div className="h-full flex items-center justify-center p-4 overflow-y-auto">
                    <EssayTypeSelector onSelectType={handleSelectEssayType} />
                </div>
            )}

            {step === 'topic_input' && (
                <TopicInput
                    essayType={essayType}
                    onSubmit={handleTopicSubmit}
                />
            )}

            {step === 'builder' && (
                <EssayStructureBuilder
                    essayType={essayType}
                    topic={topic}
                    structure={structure}
                    groups={groups}
                    onUpdateSection={handleUpdateSection}
                    onAddParagraph={handleAddParagraph}
                    onRemoveParagraph={handleRemoveParagraph}
                />
            )}
        </div>
    )
}
