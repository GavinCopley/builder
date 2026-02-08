import { Sword, Megaphone, BookOpen } from 'lucide-react'

const essayTypes = [
    {
        id: 'argumentative',
        title: 'Argumentative',
        description: 'Present evidence and reasoning to support a position',
        icon: Sword,
        color: 'var(--color-argumentative)',
    },
    {
        id: 'persuasive',
        title: 'Persuasive',
        description: 'Convince readers to adopt your point of view',
        icon: Megaphone,
        color: 'var(--color-persuasive)',
    },
    {
        id: 'narrative',
        title: 'Narrative',
        description: 'Tell a compelling story with a meaningful theme',
        icon: BookOpen,
        color: 'var(--color-narrative)',
    },
]

export default function EssayTypeSelector({ onSelectType }) {
    return (
        <div className="w-full max-w-2xl">
            <div className="text-center mb-8">
                <h1
                    className="text-2xl font-semibold mb-2"
                    style={{ color: 'var(--color-text)' }}
                >
                    What type of essay are you working on?
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Select an essay type to get tailored guidance and suggestions
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {essayTypes.map((type) => {
                    const Icon = type.icon
                    return (
                        <button
                            key={type.id}
                            onClick={() => onSelectType(type.id)}
                            className="group p-6 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                style={{
                                    backgroundColor: `${type.color}15`,
                                    color: type.color
                                }}
                            >
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3
                                className="font-semibold mb-1 text-lg"
                                style={{ color: 'var(--color-text)' }}
                            >
                                {type.title}
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                {type.description}
                            </p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
