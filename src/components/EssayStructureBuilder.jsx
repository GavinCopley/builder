import { getEssayType } from '../data/essayTypes'
import SectionBlock from './SectionBlock'

export default function EssayStructureBuilder({ essayType, structure, onUpdateSection }) {
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
                </div>

                {/* Structure groups */}
                <div className="space-y-8">
                    {typeConfig.structure.map((group, groupIdx) => (
                        <div key={groupIdx}>
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
                                    className="text-sm font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                >
                                    {group.group}
                                </h2>
                            </div>

                            {/* Section blocks */}
                            <div className="space-y-2 ml-9">
                                {group.sections.map((section) => (
                                    <SectionBlock
                                        key={section.id}
                                        section={section}
                                        content={structure[section.id] || ''}
                                        onUpdate={onUpdateSection}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
