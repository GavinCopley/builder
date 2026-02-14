import { useState } from 'react'
import { getEssayType } from '../data/essayTypes'
import { ArrowRight, MessageSquareText, BookOpenText } from 'lucide-react'

export default function TopicInput({ essayType, onSubmit }) {
    const [mode, setMode] = useState('topic') // 'topic' or 'prompt'
    const [text, setText] = useState('')

    const typeConfig = getEssayType(essayType)
    if (!typeConfig) return null

    const handleSubmit = () => {
        onSubmit({
            mode,
            text: text.trim(),
        })
    }

    return (
        <div className="h-full flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-xl">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                            backgroundColor: `${typeConfig.color}15`,
                            color: typeConfig.color
                        }}
                    >
                        <typeConfig.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h1
                            className="text-xl font-semibold"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {typeConfig.title}
                        </h1>
                        <p
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                        >
                            What will you be writing about?
                        </p>
                    </div>
                </div>

                {/* Mode toggle */}
                <div
                    className="flex rounded-lg p-1 mb-4"
                    style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                >
                    <button
                        onClick={() => setMode('topic')}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200"
                        style={{
                            backgroundColor: mode === 'topic' ? 'var(--color-bg)' : 'transparent',
                            color: mode === 'topic' ? 'var(--color-text)' : 'var(--color-text-secondary)',
                            boxShadow: mode === 'topic' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                        }}
                    >
                        <BookOpenText className="w-4 h-4" />
                        My Topic
                    </button>
                    <button
                        onClick={() => setMode('prompt')}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200"
                        style={{
                            backgroundColor: mode === 'prompt' ? 'var(--color-bg)' : 'transparent',
                            color: mode === 'prompt' ? 'var(--color-text)' : 'var(--color-text-secondary)',
                            boxShadow: mode === 'prompt' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none',
                        }}
                    >
                        <MessageSquareText className="w-4 h-4" />
                        Teacher's Prompt
                    </button>
                </div>

                {/* Text input */}
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={
                        mode === 'topic'
                            ? 'Enter your essay topic...\n\nExample: "The impact of social media on teen mental health"'
                            : 'Paste your teacher\'s prompt or assignment instructions here...\n\nExample: "Write a 5-paragraph essay analyzing the theme of identity in The Great Gatsby."'
                    }
                    rows={6}
                    className="w-full resize-none rounded-lg p-4 text-sm outline-none transition-all duration-200"
                    style={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text)',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--color-primary)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'var(--color-border)'
                    }}
                />

                {/* Helper text */}
                <p
                    className="text-xs mt-2 mb-6"
                    style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}
                >
                    {mode === 'topic'
                        ? 'Describe what your essay is about. The AI will use this to help generate content.'
                        : 'Paste the exact assignment prompt. The AI will tailor content to meet the requirements.'
                    }
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSubmit}
                        disabled={!text.trim()}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{
                            backgroundColor: text.trim() ? 'var(--color-primary)' : 'var(--color-bg-hover)',
                            color: text.trim() ? 'white' : 'var(--color-text-secondary)',
                            cursor: text.trim() ? 'pointer' : 'not-allowed',
                            opacity: text.trim() ? 1 : 0.6,
                        }}
                    >
                        Start Building
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onSubmit({ mode: 'none', text: '' })}
                        className="px-4 py-3 rounded-lg text-sm transition-colors"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    )
}
