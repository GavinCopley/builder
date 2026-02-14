import { getEssayType, createNewBodyGroup } from '../data/essayTypes'
import SectionBlock from './SectionBlock'
import { Plus, Trash2 } from 'lucide-react'

export default function EssayStructureBuilder({
    essayType,
    topic,
    structure,
    groups,
    onUpdateSection,
    onAddParagraph,
    onRemoveParagraph,
}) {
    const typeConfig = getEssayType(essayType)

    if (!typeConfig) {
        return (
            <div
                className="text-center py-12"
                style={{ color: 'var(--color-text-secondary)' }}
            >
                Unknown essay type
            </div>
        )
    }

    // Find where to place the "+ Add Paragraph" button:
    // after the last addable group, but before the conclusion
    const lastAddableIdx = (() => {
        let last = -1
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].addable) last = i
        }
        return last
    })()

    const essayContext = {
        essayType,
        topic,
        structure,
        groups,
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-2xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{
                                backgroundColor: `${typeConfig.color}15`,
                                color: typeConfig.color
                            }}
                        >
                            <typeConfig.icon className="w-5 h-5" />
                        </div>
                        <h1
                            className="text-xl font-semibold"
                            style={{ color: 'var(--color-text)' }}
                        >
                            {typeConfig.title}
                        </h1>
                    </div>
                    <p
                        className="text-sm ml-[52px]"
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        Build your essay section by section. Click edit or use AI to fill in each part.
                    </p>
                    {topic && (
                        <div
                            className="ml-[52px] mt-2 px-3 py-2 rounded-md text-sm"
                            style={{
                                backgroundColor: `${typeConfig.color}10`,
                                color: 'var(--color-text-secondary)',
                                border: `1px solid ${typeConfig.color}25`,
                            }}
                        >
                            <span className="font-medium" style={{ color: 'var(--color-text)' }}>Topic:</span>{' '}
                            {topic}
                        </div>
                    )}
                </div>

                {/* Structure groups */}
                <div className="space-y-8">
                    {groups.map((group, groupIdx) => (
                        <div key={group.key || groupIdx}>
                            {/* Group label */}
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{
                                        backgroundColor: typeConfig.color,
                                        color: 'white',
                                    }}
                                >
                                    {groupIdx + 1}
                                </div>
                                <h2
                                    className="text-sm font-semibold uppercase tracking-wider flex-1"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {group.group}
                                </h2>

                                {/* Remove button for dynamically-added paragraphs */}
                                {group.isDynamic && onRemoveParagraph && (
                                    <button
                                        onClick={() => onRemoveParagraph(group.key)}
                                        className="p-1.5 rounded-md transition-colors opacity-0 group-hover:opacity-100 hover:opacity-100"
                                        style={{ color: 'var(--color-text-secondary)' }}
                                        title="Remove paragraph"
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#e53e3e'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Section blocks */}
                            <div className="space-y-2 ml-9">
                                {group.sections.map((section) => (
                                    <SectionBlock
                                        key={section.id}
                                        section={section}
                                        groupLabel={group.group}
                                        content={structure[section.id] || ''}
                                        onUpdate={onUpdateSection}
                                        essayContext={essayContext}
                                    />
                                ))}
                            </div>

                            {/* "+ Add Paragraph" button after last addable group */}
                            {groupIdx === lastAddableIdx && typeConfig.bodyTemplate && (
                                <div className="ml-9 mt-4">
                                    <button
                                        onClick={onAddParagraph}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 w-full justify-center"
                                        style={{
                                            border: '1px dashed var(--color-border)',
                                            color: 'var(--color-text-secondary)',
                                            backgroundColor: 'transparent',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = typeConfig.color
                                            e.currentTarget.style.color = typeConfig.color
                                            e.currentTarget.style.backgroundColor = `${typeConfig.color}08`
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'var(--color-border)'
                                            e.currentTarget.style.color = 'var(--color-text-secondary)'
                                            e.currentTarget.style.backgroundColor = 'transparent'
                                        }}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add {typeConfig.bodyTemplate.group}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
