const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

/**
 * Generate content for a specific essay section using Gemini.
 *
 * @param {Object} params
 * @param {string} params.essayType - e.g. 'argumentative'
 * @param {string} params.topic - The essay topic or teacher prompt
 * @param {string} params.sectionLabel - e.g. 'Hook', 'Lead-in'
 * @param {string} params.groupLabel - e.g. 'Introduction', 'Body Paragraph 1'
 * @param {Object} params.existingSections - All filled-in sections { id: content }
 * @param {Array}  params.allGroups - The full group structure for context
 * @returns {Promise<string>} Generated text
 */
export async function generateSectionContent({
    essayType,
    topic,
    sectionLabel,
    groupLabel,
    existingSections,
    allGroups,
}) {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.')
    }

    // Build context from existing content
    const filledSections = Object.entries(existingSections || {})
        .filter(([key, val]) => typeof val === 'string' && !key.startsWith('_') && val.trim())
        .map(([key, val]) => `${key}: ${val}`)
        .join('\n')

    const prompt = `You are an expert essay writing assistant helping a student write a ${essayType} essay.

${topic ? `Essay topic/prompt: "${topic}"` : 'No topic specified yet.'}

${filledSections ? `Here is what the student has written so far:\n${filledSections}` : 'The student has not written anything yet.'}

Now write ONLY the "${sectionLabel}" section (part of the "${groupLabel}" paragraph/group).

Rules:
- Write 1-3 sentences appropriate for this section type
- Match the tone and style of a ${essayType} essay
- Be specific and substantive, not generic
- Do NOT include any labels, headers, or meta-commentary
- Output ONLY the essay text for this section, nothing else`

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 300,
            }
        })
    })

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData?.error?.message || `Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
        throw new Error('No content returned from Gemini')
    }

    return text.trim()
}
