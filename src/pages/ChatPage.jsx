import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import EssayTypeSelector from '../components/EssayTypeSelector'
import ChatInput from '../components/ChatInput'
import MessageBubble from '../components/MessageBubble'
import { Loader2 } from 'lucide-react'

export default function ChatPage() {
    const { chatId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const messagesEndRef = useRef(null)

    const [essayType, setEssayType] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatLoading, setChatLoading] = useState(true)
    const [currentChatId, setCurrentChatId] = useState(chatId || null)

    // Load existing chat if chatId provided
    useEffect(() => {
        if (chatId) {
            loadChat(chatId)
        } else {
            // New chat - reset state
            setEssayType(null)
            setMessages([])
            setCurrentChatId(null)
            setChatLoading(false)
        }
    }, [chatId])

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const loadChat = async (id) => {
        setChatLoading(true)
        try {
            // Fetch chat details
            const { data: chat, error: chatError } = await supabase
                .from('chats')
                .select('*')
                .eq('id', id)
                .single()

            if (chatError) throw chatError

            setEssayType(chat.essay_type)
            setCurrentChatId(chat.id)

            // Fetch messages
            const { data: msgs, error: msgsError } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', id)
                .order('created_at', { ascending: true })

            if (msgsError) throw msgsError
            setMessages(msgs || [])
        } catch (err) {
            console.error('Error loading chat:', err)
            navigate('/')
        } finally {
            setChatLoading(false)
        }
    }

    const handleSelectEssayType = async (type) => {
        setEssayType(type)

        // Create a new chat in the database
        try {
            const { data: newChat, error } = await supabase
                .from('chats')
                .insert({
                    user_id: user.id,
                    title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Essay`,
                    essay_type: type
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

    const handleSendMessage = async (content) => {
        if (!content.trim() || !currentChatId) return

        // Add user message
        const userMessage = {
            id: crypto.randomUUID(),
            chat_id: currentChatId,
            content,
            role: 'user',
            created_at: new Date().toISOString()
        }

        setMessages(prev => [...prev, userMessage])
        setLoading(true)

        try {
            // Save user message to database
            await supabase.from('messages').insert({
                chat_id: currentChatId,
                content,
                role: 'user'
            })

            // Update chat title if this is the first message
            if (messages.length === 0) {
                const title = content.slice(0, 50) + (content.length > 50 ? '...' : '')
                await supabase
                    .from('chats')
                    .update({ title })
                    .eq('id', currentChatId)
            }

            // Simulate AI response (replace with actual AI integration)
            const aiResponse = await generateAIResponse(content, essayType)

            const assistantMessage = {
                id: crypto.randomUUID(),
                chat_id: currentChatId,
                content: aiResponse,
                role: 'assistant',
                created_at: new Date().toISOString()
            }

            setMessages(prev => [...prev, assistantMessage])

            // Save AI response to database
            await supabase.from('messages').insert({
                chat_id: currentChatId,
                content: aiResponse,
                role: 'assistant'
            })
        } catch (err) {
            console.error('Error sending message:', err)
        } finally {
            setLoading(false)
        }
    }

    // Placeholder AI response generator
    const generateAIResponse = async (userMessage, type) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const responses = {
            argumentative: `Great question about argumentative essays! Here's how I can help:

## Key Elements of an Argumentative Essay

1. **Clear Thesis Statement** - State your position clearly
2. **Evidence-Based Arguments** - Support claims with facts and research
3. **Counterargument Acknowledgment** - Address opposing views
4. **Logical Structure** - Introduction → Body Paragraphs → Conclusion

Would you like me to help you develop a specific part of your essay?`,

            persuasive: `I'm here to help with your persuasive essay! Let me share some key strategies:

## Persuasive Writing Techniques

- **Emotional Appeals (Pathos)** - Connect with readers' feelings
- **Credibility (Ethos)** - Establish your authority
- **Logical Reasoning (Logos)** - Use facts and statistics
- **Call to Action** - Inspire readers to act

What aspect of persuasive writing would you like to explore?`,

            narrative: `Let's work on your narrative essay! Here are some storytelling essentials:

## Narrative Essay Elements

1. **Compelling Hook** - Grab attention from the start
2. **Vivid Descriptions** - Use sensory details
3. **Character Development** - Show growth and change
4. **Meaningful Theme** - What's the lesson or insight?

What story are you looking to tell?`
        }

        return responses[type] || responses.argumentative
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
            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto">
                {!essayType ? (
                    // Essay type selection
                    <div className="h-full flex items-center justify-center p-4">
                        <EssayTypeSelector onSelectType={handleSelectEssayType} />
                    </div>
                ) : messages.length === 0 ? (
                    // Empty chat with essay type selected
                    <div className="h-full flex items-center justify-center p-4">
                        <div className="text-center max-w-md">
                            <h2
                                className="text-xl font-semibold mb-2"
                                style={{ color: 'var(--color-text)' }}
                            >
                                {essayType.charAt(0).toUpperCase() + essayType.slice(1)} Essay
                            </h2>
                            <p style={{ color: 'var(--color-text-secondary)' }}>
                                Start typing to get help with your {essayType} essay. I'll guide you through the writing process!
                            </p>
                        </div>
                    </div>
                ) : (
                    // Messages list
                    <div className="max-w-3xl mx-auto px-4 py-6">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message.id}
                                message={message}
                            />
                        ))}
                        {loading && (
                            <div className="flex items-center gap-2 py-4 px-4">
                                <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--color-text-secondary)' }} />
                                <span style={{ color: 'var(--color-text-secondary)' }}>Thinking...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Chat input */}
            <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="max-w-3xl mx-auto px-4 py-4">
                    <ChatInput
                        onSend={handleSendMessage}
                        disabled={!essayType || loading}
                        placeholder={
                            !essayType
                                ? "Select an essay type to start chatting..."
                                : "Type your message..."
                        }
                    />
                </div>
            </div>
        </div>
    )
}
