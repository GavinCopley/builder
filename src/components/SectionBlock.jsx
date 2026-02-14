import { useState } from 'react'
import { Pencil, Sparkles, Check, X, Loader2 } from 'lucide-react'

export default function SectionBlock({ section, content, onUpdate }) {
    const [editing, setEditing] = useState(false)
    const [draft, setDraft] = useState(content || '')
    const [generating, setGenerating] = useState(false)

    const handleSave = () => {
        onUpdate(section.id, draft)
        setEditing(false)
    }

    const handleCancel = () => {
        setDraft(content || '')
        setEditing(false)
    }

    const handleAIGenerate = async () => {
        setGenerating(true)
        try {
            // Placeholder AI generation - simulate delay
            await new Promise(resolve => setTimeout(resolve, 1200))
            const generated = `[AI-generated content for "${section.label}"] This is a placeholder. Connect to your AI backend to generate real content based on the essay context.`
            setDraft(generated)
            onUpdate(section.id, generated)
        } catch (err) {
            console.error('AI generation error:', err)
        } finally {
            setGenerating(false)
        }
    }

    return (
        <div
            className="section-block group rounded-lg transition-all duration-200"
            style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
            }}
        >
            {/* Header row */}
            <div className="flex items-center justify-between px-4 py-3">
                <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--color-text)' }}
                >
                    {section.label}
                </span>

                {!editing && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => {
                                setDraft(content || '')
                                setEditing(true)
                            }}
                            className="p-1.5 rounded-md transition-colors"
                            style={{ color: 'var(--color-text-secondary)' }}
                            title="Edit"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={handleAIGenerate}
                            disabled={generating}
                            className="p-1.5 rounded-md transition-colors"
                            style={{ color: 'var(--color-primary)' }}
                            title="AI Generate"
                        >
                            {generating ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                                <Sparkles className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Content area */}
            {editing ? (
                <div className="px-4 pb-3">
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder={section.placeholder}
                        rows={3}
                        autoFocus
                        className="w-full resize-none rounded-md p-3 text-sm outline-none transition-colors"
                        style={{
                            backgroundColor: 'var(--color-bg)',
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-text)',
                        }}
                        onInput={(e) => {
                            e.target.style.height = 'auto'
                            e.target.style.height = Math.min(e.target.scrollHeight, 300) + 'px'
                        }}
                    />
                    <div className="flex items-center gap-2 mt-2">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: 'white'
                            }}
                        >
                            <Check className="w-3 h-3" />
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                            style={{
                                backgroundColor: 'var(--color-bg-hover)',
                                color: 'var(--color-text-secondary)'
                            }}
                        >
                            <X className="w-3 h-3" />
                            Cancel
                        </button>
                    </div>
                </div>
            ) : content ? (
                <div
                    className="px-4 pb-3 text-sm whitespace-pre-wrap"
                    style={{ color: 'var(--color-text)' }}
                >
                    {content}
                </div>
            ) : (
                <div
                    className="px-4 pb-3 text-sm italic"
                    style={{ color: 'var(--color-text-secondary)', opacity: 0.6 }}
                >
                    {section.placeholder}
                </div>
            )}
        </div>
    )
}
