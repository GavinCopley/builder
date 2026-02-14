import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import EssayTypeSelector from '../components/EssayTypeSelector'
import EssayStructureBuilder from '../components/EssayStructureBuilder'
import { buildEmptyStructure } from '../data/essayTypes'
import { Loader2 } from 'lucide-react'

export default function ChatPage() {
    const { chatId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [essayType, setEssayType] = useState(null)
    const [structure, setStructure] = useState({})
    const [chatLoading, setChatLoading] = useState(true)
    const [currentChatId, setCurrentChatId] = useState(chatId || null)

    // Load existing chat if chatId provided
    useEffect(() => {
        if (chatId) {
            loadChat(chatId)
        } else {
            // New chat - reset state
            setEssayType(null)
            setStructure({})
            setCurrentChatId(null)
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
            setStructure(chat.structure || buildEmptyStructure(chat.essay_type))
        } catch (err) {
            console.error('Error loading chat:', err)
            navigate('/')
        } finally {
            setChatLoading(false)
        }
    }

    const handleSelectEssayType = async (type) => {
        setEssayType(type)
        const emptyStructure = buildEmptyStructure(type)
        setStructure(emptyStructure)

        try {
            const { data: newChat, error } = await supabase
                .from('chats')
                .insert({
                    user_id: user.id,
                    title: 'Untitled Essay',
                    essay_type: type,
                    structure: emptyStructure
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

    // Debounced save to Supabase
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

    const handleUpdateSection = (sectionId, content) => {
        const newStructure = { ...structure, [sectionId]: content }
        setStructure(newStructure)
        saveStructure(newStructure)

        // Update title based on content if it's a thesis/hook and title is still default
        if ((sectionId === 'thesis' || sectionId === 'hook') && content.trim()) {
            const title = content.trim().slice(0, 60) + (content.trim().length > 60 ? '...' : '')
            supabase
                .from('chats')
                .update({ title })
                .eq('id', currentChatId)
                .then()
        }
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
            {!essayType ? (
                // Essay type selection
                <div className="h-full flex items-center justify-center p-4 overflow-y-auto">
                    <EssayTypeSelector onSelectType={handleSelectEssayType} />
                </div>
            ) : (
                // Structure builder
                <EssayStructureBuilder
                    essayType={essayType}
                    structure={structure}
                    onUpdateSection={handleUpdateSection}
                />
            )}
        </div>
    )
}
