import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User, Bot, Copy, Check } from 'lucide-react'

export default function MessageBubble({ message }) {
    const [copied, setCopied] = useState(false)
    const isUser = message.role === 'user'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(message.content)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div className={`flex gap-3 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                    backgroundColor: isUser ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                    color: isUser ? 'white' : 'var(--color-text-secondary)',
                    border: isUser ? 'none' : '1px solid var(--color-border)'
                }}
            >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message content */}
            <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : ''}`}>
                <div
                    className={`inline-block max-w-full rounded-2xl px-4 py-2.5 ${isUser ? 'text-left' : ''}`}
                    style={{
                        backgroundColor: isUser ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
                        color: isUser ? 'white' : 'var(--color-text)',
                        border: isUser ? 'none' : '1px solid var(--color-border)'
                    }}
                >
                    {isUser ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <div className="markdown-content">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Copy button for AI messages */}
                {!isUser && (
                    <button
                        onClick={handleCopy}
                        className="mt-1 p-1.5 rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        {copied ? (
                            <>
                                <Check className="w-3.5 h-3.5" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
