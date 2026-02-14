import essayTypes from '../data/essayTypes'

export default function EssayTypeSelector({ onSelectType }) {
    return (
        <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
                <h1
                    className="text-2xl font-semibold mb-2"
                    style={{ color: 'var(--color-text)' }}
                >
                    What type of essay are you working on?
                </h1>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Select an essay type to get started with a guided structure
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {essayTypes.map((type) => {
                    const Icon = type.icon
                    return (
                        <button
                            key={type.id}
                            onClick={() => onSelectType(type.id)}
                            className="group p-5 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
                            style={{
                                backgroundColor: 'var(--color-bg-secondary)',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                                style={{
                                    backgroundColor: `${type.color}15`,
                                    color: type.color
                                }}
                            >
                                <Icon className="w-5 h-5" />
                            </div>
                            <h3
                                className="font-semibold mb-1"
                                style={{ color: 'var(--color-text)' }}
                            >
                                {type.title}
                            </h3>
                            <p
                                className="text-xs leading-relaxed"
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
