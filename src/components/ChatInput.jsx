import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSend, disabled, placeholder }) {
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim() && !disabled) {
            onSend(message)
            setMessage('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                className="flex items-end gap-2 p-2 rounded-xl transition-colors"
                style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    opacity: disabled ? 0.6 : 1,
                }}
            >
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={1}
                    className="flex-1 resize-none bg-transparent px-2 py-2 outline-none"
                    style={{
                        color: 'var(--color-text)',
                        minHeight: '40px',
                        maxHeight: '200px',
                    }}
                    onInput={(e) => {
                        e.target.style.height = 'auto'
                        e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px'
                    }}
                />
                <button
                    type="submit"
                    disabled={disabled || !message.trim()}
                    className="p-2 rounded-lg transition-colors flex-shrink-0"
                    style={{
                        backgroundColor: message.trim() && !disabled ? 'var(--color-primary)' : 'transparent',
                        color: message.trim() && !disabled ? 'white' : 'var(--color-text-secondary)',
                        cursor: disabled || !message.trim() ? 'not-allowed' : 'pointer',
                    }}
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
            <p
                className="text-xs mt-2 text-center"
                style={{ color: 'var(--color-text-secondary)' }}
            >
                Press Enter to send, Shift+Enter for new line
            </p>
        </form>
    )
}
