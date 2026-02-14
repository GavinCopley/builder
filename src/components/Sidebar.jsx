import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import essayTypes, { getEssayTypeColor } from '../data/essayTypes'
import {
    Plus,
    ChevronLeft,
    ChevronDown,
    ChevronRight,
    LogOut,
    FileText,
    Loader2,
    Trash2
} from 'lucide-react'

export default function Sidebar({ isCollapsed, onToggle, onCloseMobile }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, signOut } = useAuth()
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const [collapsedGroups, setCollapsedGroups] = useState({})

    useEffect(() => {
        if (user) {
            fetchChats()
        }
    }, [user])

    // Re-fetch chats when navigating (to catch new chats / title updates)
    useEffect(() => {
        if (user) {
            fetchChats()
        }
    }, [location.pathname])

    const fetchChats = async () => {
        try {
            const { data, error } = await supabase
                .from('chats')
                .select('id, title, essay_type, created_at')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setChats(data || [])
        } catch (err) {
            console.error('Error fetching chats:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleNewChat = () => {
        navigate('/')
        onCloseMobile?.()
    }

    const handleChatClick = (chatId) => {
        navigate(`/chat/${chatId}`)
        onCloseMobile?.()
    }

    const handleDeleteChat = async (e, chatId) => {
        e.stopPropagation()
        try {
            const { error } = await supabase
                .from('chats')
                .delete()
                .eq('id', chatId)

            if (error) throw error
            setChats(chats.filter(chat => chat.id !== chatId))

            if (location.pathname === `/chat/${chatId}`) {
                navigate('/')
            }
        } catch (err) {
            console.error('Error deleting chat:', err)
        }
    }

    const handleSignOut = async () => {
        await signOut()
        navigate('/login')
    }

    const toggleGroup = (typeId) => {
        setCollapsedGroups(prev => ({
            ...prev,
            [typeId]: !prev[typeId]
        }))
    }

    // Group chats by essay type
    const groupedChats = {}
    for (const chat of chats) {
        const type = chat.essay_type || 'other'
        if (!groupedChats[type]) {
            groupedChats[type] = []
        }
        groupedChats[type].push(chat)
    }

    // Order groups by the essayTypes config order
    const orderedGroupKeys = essayTypes
        .map(t => t.id)
        .filter(id => groupedChats[id])

    // Add any uncategorized types at the end
    for (const key of Object.keys(groupedChats)) {
        if (!orderedGroupKeys.includes(key)) {
            orderedGroupKeys.push(key)
        }
    }

    const getTypeLabel = (typeId) => {
        const type = essayTypes.find(t => t.id === typeId)
        return type ? type.title : typeId
    }

    return (
        <div
            className="h-full flex flex-col"
            style={{
                width: '260px',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRight: '1px solid var(--color-border)'
            }}
        >
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 border-b"
                style={{ borderColor: 'var(--color-border)' }}
            >
                <div className="flex items-center gap-2">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                    >
                        <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>
                        Essay Assistant
                    </span>
                </div>
                <button
                    onClick={onToggle}
                    className="p-1.5 rounded-lg transition-colors hidden md:flex"
                    style={{ color: 'var(--color-text-secondary)' }}
                >
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* New Chat Button */}
            <div className="p-3">
                <button
                    onClick={handleNewChat}
                    className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium"
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white'
                    }}
                >
                    <Plus className="w-5 h-5" />
                    New Essay
                </button>
            </div>

            {/* Chat List — grouped by type */}
            <div className="flex-1 overflow-y-auto px-3 pb-3">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--color-text-secondary)' }} />
                    </div>
                ) : chats.length === 0 ? (
                    <div
                        className="text-sm text-center py-8 px-2"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        No essays yet. Start a new one!
                    </div>
                ) : (
                    <div className="space-y-2">
                        {orderedGroupKeys.map((typeId) => {
                            const typeChats = groupedChats[typeId]
                            const isGroupCollapsed = collapsedGroups[typeId]
                            const color = getEssayTypeColor(typeId)

                            return (
                                <div key={typeId}>
                                    {/* Group header */}
                                    <button
                                        onClick={() => toggleGroup(typeId)}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors hover:bg-[var(--color-bg-hover)]"
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: color }}
                                        />
                                        <span
                                            className="text-xs font-semibold uppercase tracking-wider flex-1 text-left"
                                            style={{ color: 'var(--color-text-secondary)' }}
                                        >
                                            {getTypeLabel(typeId)}
                                        </span>
                                        <span
                                            className="text-xs"
                                            style={{ color: 'var(--color-text-secondary)' }}
                                        >
                                            {typeChats.length}
                                        </span>
                                        {isGroupCollapsed ? (
                                            <ChevronRight className="w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} />
                                        ) : (
                                            <ChevronDown className="w-3 h-3" style={{ color: 'var(--color-text-secondary)' }} />
                                        )}
                                    </button>

                                    {/* Chat items */}
                                    {!isGroupCollapsed && (
                                        <div className="ml-4 mt-1 space-y-0.5">
                                            {typeChats.map((chat) => {
                                                const isActive = location.pathname === `/chat/${chat.id}`
                                                return (
                                                    <div
                                                        key={chat.id}
                                                        onClick={() => handleChatClick(chat.id)}
                                                        className="group flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                                                        style={{
                                                            backgroundColor: isActive ? 'var(--color-bg-hover)' : 'transparent',
                                                        }}
                                                    >
                                                        <span
                                                            className="flex-1 truncate text-sm"
                                                            style={{ color: 'var(--color-text)' }}
                                                        >
                                                            {chat.title}
                                                        </span>
                                                        <button
                                                            onClick={(e) => handleDeleteChat(e, chat.id)}
                                                            className="opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity"
                                                            style={{ color: 'var(--color-text-secondary)' }}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* User section */}
            <div
                className="p-3 border-t"
                style={{ borderColor: 'var(--color-border)' }}
            >
                <div className="flex items-center gap-3 px-2 py-2">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'white'
                        }}
                    >
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div
                            className="text-sm font-medium truncate"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {user?.email}
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="p-1.5 rounded-lg transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                        title="Sign out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
