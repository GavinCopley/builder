import {
    BookOpen,
    Palette,
    GraduationCap,
    Sword,
    ArrowLeftRight,
    GitBranch,
    BookMarked,
    Search,
    Lightbulb,
    ListOrdered
} from 'lucide-react'

/**
 * Centralized essay type definitions.
 *
 * Groups with `addable: true` can be duplicated by the user (e.g. add more body paragraphs).
 * The `bodyTemplate` on each type defines what a new body paragraph looks like when added.
 */

// ── Shared body-paragraph templates ────────────────────────────────

const argumentBodySections = [
    { id: 'topic_sentence', label: 'Topic Sentence', placeholder: 'State the main point of this paragraph...' },
    { id: 'lead_in', label: 'Lead-in', placeholder: 'Introduce the evidence with context...' },
    { id: 'quote', label: 'Quote / Paraphrase', placeholder: 'Include a direct quote or paraphrased evidence...' },
    { id: 'analysis', label: 'Analysis', placeholder: 'Explain how this evidence supports your argument...' },
    { id: 'concluding_sentence', label: 'Concluding Sentence', placeholder: 'Wrap up this paragraph and transition to the next...' },
]

const analyticBodySections = [
    { id: 'claim', label: 'Claim', placeholder: 'State your analytical point...' },
    { id: 'lead_in', label: 'Lead-in', placeholder: 'Introduce the evidence with context...' },
    { id: 'quote', label: 'Quote / Paraphrase', placeholder: 'A direct quote or specific reference from the text...' },
    { id: 'analysis', label: 'Analysis', placeholder: 'Explain how this evidence supports your claim...' },
    { id: 'concluding_sentence', label: 'Concluding Sentence', placeholder: 'Wrap up and transition...' },
]

const researchBodySections = [
    { id: 'topic_sentence', label: 'Topic Sentence', placeholder: 'The main idea of this section...' },
    { id: 'lead_in', label: 'Lead-in', placeholder: 'Introduce the source and its relevance...' },
    { id: 'quote', label: 'Quote / Paraphrase / Data', placeholder: 'Include sourced evidence with citation...' },
    { id: 'analysis', label: 'Analysis', placeholder: 'Interpret the evidence and connect it to your thesis...' },
    { id: 'concluding_sentence', label: 'Concluding Sentence', placeholder: 'Summarize and transition...' },
]

const expositoryBodySections = [
    { id: 'topic_sentence', label: 'Topic Sentence', placeholder: 'The main idea of this paragraph...' },
    { id: 'explanation', label: 'Explanation', placeholder: 'Explain the concept clearly...' },
    { id: 'example', label: 'Example / Evidence', placeholder: 'Provide a supporting example, fact, or detail...' },
    { id: 'analysis', label: 'Analysis', placeholder: 'Why does this matter? Connect back to the thesis...' },
    { id: 'concluding_sentence', label: 'Concluding Sentence', placeholder: 'Wrap up and transition...' },
]

// ── Helper to prefix section ids with a group index ────────────────

function prefixSections(sections, prefix) {
    return sections.map(s => ({
        ...s,
        id: `${prefix}_${s.id}`,
    }))
}

// ── Essay type definitions ─────────────────────────────────────────

const essayTypes = [
    {
        id: 'narrative',
        title: 'Narrative Essay',
        description: 'Tells a story, often from your own experience. Focuses on characters, setting, and plot, like a short story but true or realistic.',
        icon: BookOpen,
        color: 'var(--color-narrative)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'An attention-grabbing opening that draws readers into your story...' },
                    { id: 'setting', label: 'Setting & Context', placeholder: 'Establish the time, place, and circumstances of your story...' },
                    { id: 'thesis', label: 'Thesis / Central Theme', placeholder: 'The main insight or lesson your narrative will convey...' },
                ]
            },
            {
                group: 'Rising Action',
                addable: true,
                sections: [
                    { id: 'body_1_event', label: 'Key Event', placeholder: 'A significant moment in your story...' },
                    { id: 'body_1_details', label: 'Sensory Details & Dialogue', placeholder: 'Vivid details that bring this moment to life...' },
                    { id: 'body_1_reflection', label: 'In-the-Moment Reflection', placeholder: 'What were you thinking or feeling at this point?' },
                ]
            },
            {
                group: 'Climax',
                sections: [
                    { id: 'climax', label: 'Turning Point', placeholder: 'The pivotal moment — the peak of your story\'s tension...' },
                ]
            },
            {
                group: 'Falling Action & Resolution',
                sections: [
                    { id: 'resolution', label: 'Resolution', placeholder: 'How the conflict was resolved or what changed...' },
                    { id: 'reflection', label: 'Reflection & Takeaway', placeholder: 'What you learned or how this experience shaped you...' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Rising Action',
            sections: [
                { id: 'event', label: 'Key Event', placeholder: 'A significant moment in your story...' },
                { id: 'details', label: 'Sensory Details & Dialogue', placeholder: 'Vivid details that bring this moment to life...' },
                { id: 'reflection', label: 'In-the-Moment Reflection', placeholder: 'What were you thinking or feeling at this point?' },
            ]
        }
    },
    {
        id: 'descriptive',
        title: 'Descriptive Essay',
        description: 'Paints a picture of a person, place, object, or event. Uses sensory details (sight, sound, smell, touch, taste).',
        icon: Palette,
        color: 'var(--color-descriptive)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'A vivid opening that immerses the reader...' },
                    { id: 'subject_intro', label: 'Subject Introduction', placeholder: 'Introduce what you are describing and why it matters...' },
                    { id: 'thesis', label: 'Dominant Impression', placeholder: 'The overall feeling or main impression you want to leave...' },
                ]
            },
            {
                group: 'Sensory Paragraph',
                addable: true,
                sections: [
                    { id: 'body_1_focus', label: 'Focus / Sense', placeholder: 'Which sense or aspect are you focusing on here?' },
                    { id: 'body_1_details', label: 'Vivid Details', placeholder: 'Rich, specific descriptions that paint a picture...' },
                    { id: 'body_1_impression', label: 'Connection to Impression', placeholder: 'How do these details reinforce your dominant impression?' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'final_impression', label: 'Final Impression', placeholder: 'Reinforce the dominant impression and leave the reader with a lasting image...' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Sensory Paragraph',
            sections: [
                { id: 'focus', label: 'Focus / Sense', placeholder: 'Which sense or aspect are you focusing on here?' },
                { id: 'details', label: 'Vivid Details', placeholder: 'Rich, specific descriptions that paint a picture...' },
                { id: 'impression', label: 'Connection to Impression', placeholder: 'How do these details reinforce your dominant impression?' },
            ]
        }
    },
    {
        id: 'expository',
        title: 'Expository Essay',
        description: 'Explains or informs about a topic in a clear, logical way. Often includes facts, definitions, and examples. Common in subjects like science and history.',
        icon: GraduationCap,
        color: 'var(--color-expository)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'An interesting fact, question, or statement to engage the reader...' },
                    { id: 'background', label: 'Background Information', placeholder: 'Context the reader needs to understand the topic...' },
                    { id: 'thesis', label: 'Thesis Statement', placeholder: 'A clear statement of what you will explain...' },
                ]
            },
            {
                group: 'Body Paragraph 1',
                addable: true,
                sections: prefixSections(expositoryBodySections, 'body_1'),
            },
            {
                group: 'Body Paragraph 2',
                addable: true,
                sections: prefixSections(expositoryBodySections, 'body_2'),
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'summary', label: 'Summary of Key Points', placeholder: 'Restate the main points covered...' },
                    { id: 'closing', label: 'Closing Thought', placeholder: 'A final thought that ties everything together...' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Body Paragraph',
            sections: expositoryBodySections,
        }
    },
    {
        id: 'argumentative',
        title: 'Argumentative Essay',
        description: 'Tries to convince the reader of a point of view. Uses reasons, evidence, and sometimes addresses counterarguments.',
        icon: Sword,
        color: 'var(--color-argumentative)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'A compelling opening that grabs attention...' },
                    { id: 'intro_topic', label: 'Introduction to Topic', placeholder: 'Provide background context on the issue...' },
                    { id: 'thesis', label: 'Thesis Statement', placeholder: 'Your clear position on the argument...' },
                ]
            },
            {
                group: 'Body Paragraph 1',
                addable: true,
                sections: prefixSections(argumentBodySections, 'body_1'),
            },
            {
                group: 'Body Paragraph 2',
                addable: true,
                sections: prefixSections(argumentBodySections, 'body_2'),
            },
            {
                group: 'Counterargument',
                sections: [
                    { id: 'counter', label: 'Counterargument', placeholder: 'Acknowledge the opposing viewpoint...' },
                    { id: 'rebuttal_lead_in', label: 'Lead-in to Rebuttal', placeholder: 'Transition into your response to the counterargument...' },
                    { id: 'rebuttal_evidence', label: 'Rebuttal Evidence', placeholder: 'Evidence that weakens the counterargument...' },
                    { id: 'rebuttal_analysis', label: 'Rebuttal Analysis', placeholder: 'Explain why your argument is still stronger...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'restate_thesis', label: 'Restate Thesis', placeholder: 'Reinforce your position in light of the evidence...' },
                    { id: 'call_to_action', label: 'Call to Action', placeholder: 'What should the reader think or do after reading?' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Body Paragraph',
            sections: argumentBodySections,
        }
    },
    {
        id: 'compare_contrast',
        title: 'Compare-and-Contrast Essay',
        description: 'Shows similarities and differences between two or more things (books, ideas, historical events, etc.).',
        icon: ArrowLeftRight,
        color: 'var(--color-compare-contrast)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'An engaging opening about the subjects being compared...' },
                    { id: 'subjects_intro', label: 'Introduce Both Subjects', placeholder: 'Briefly introduce the two subjects and why comparing them is worthwhile...' },
                    { id: 'thesis', label: 'Thesis Statement', placeholder: 'What is the main point of this comparison?' },
                ]
            },
            {
                group: 'Point of Comparison 1',
                addable: true,
                sections: [
                    { id: 'body_1_point', label: 'Point of Comparison', placeholder: 'What aspect are you comparing?' },
                    { id: 'body_1_subject_a', label: 'Subject A', placeholder: 'How does the first subject relate to this point?' },
                    { id: 'body_1_subject_b', label: 'Subject B', placeholder: 'How does the second subject relate to this point?' },
                    { id: 'body_1_analysis', label: 'Analysis', placeholder: 'What does this comparison reveal?' },
                ]
            },
            {
                group: 'Point of Comparison 2',
                addable: true,
                sections: [
                    { id: 'body_2_point', label: 'Point of Comparison', placeholder: 'What aspect are you comparing?' },
                    { id: 'body_2_subject_a', label: 'Subject A', placeholder: 'How does the first subject relate to this point?' },
                    { id: 'body_2_subject_b', label: 'Subject B', placeholder: 'How does the second subject relate to this point?' },
                    { id: 'body_2_analysis', label: 'Analysis', placeholder: 'What does this comparison reveal?' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'synthesis', label: 'Synthesis', placeholder: 'What do these comparisons reveal? Which is better, or what do we learn?' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Point of Comparison',
            sections: [
                { id: 'point', label: 'Point of Comparison', placeholder: 'What aspect are you comparing?' },
                { id: 'subject_a', label: 'Subject A', placeholder: 'How does the first subject relate to this point?' },
                { id: 'subject_b', label: 'Subject B', placeholder: 'How does the second subject relate to this point?' },
                { id: 'analysis', label: 'Analysis', placeholder: 'What does this comparison reveal?' },
            ]
        }
    },
    {
        id: 'cause_effect',
        title: 'Cause-and-Effect Essay',
        description: 'Explains why something happened (cause) and what happened as a result (effect).',
        icon: GitBranch,
        color: 'var(--color-cause-effect)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'A striking fact or question about the topic...' },
                    { id: 'background', label: 'Background', placeholder: 'Context needed to understand the cause-effect relationship...' },
                    { id: 'thesis', label: 'Thesis Statement', placeholder: 'State the cause-effect relationship you will explore...' },
                ]
            },
            {
                group: 'Cause 1',
                addable: true,
                sections: [
                    { id: 'body_1_cause', label: 'Cause', placeholder: 'Describe this cause...' },
                    { id: 'body_1_lead_in', label: 'Lead-in', placeholder: 'Introduce evidence for this cause...' },
                    { id: 'body_1_evidence', label: 'Evidence', placeholder: 'Facts or examples that demonstrate this cause...' },
                    { id: 'body_1_analysis', label: 'Analysis', placeholder: 'How does this cause lead to the effect?' },
                ]
            },
            {
                group: 'Effects',
                sections: [
                    { id: 'effect_immediate', label: 'Immediate Effect', placeholder: 'What happened right away as a result...' },
                    { id: 'effect_longterm', label: 'Long-term Effect', placeholder: 'Lasting consequences or outcomes...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'summary', label: 'Summary & Significance', placeholder: 'Why does this cause-effect relationship matter?' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Cause',
            sections: [
                { id: 'cause', label: 'Cause', placeholder: 'Describe this cause...' },
                { id: 'lead_in', label: 'Lead-in', placeholder: 'Introduce evidence for this cause...' },
                { id: 'evidence', label: 'Evidence', placeholder: 'Facts or examples that demonstrate this cause...' },
                { id: 'analysis', label: 'Analysis', placeholder: 'How does this cause lead to the effect?' },
            ]
        }
    },
    {
        id: 'literary_analysis',
        title: 'Literary Analysis Essay',
        description: 'Analyzes a novel, poem, or play. Discusses themes, characters, symbolism, or writing style using evidence from the text.',
        icon: BookMarked,
        color: 'var(--color-literary-analysis)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'An intriguing observation about the text...' },
                    { id: 'work_intro', label: 'Introduce the Work', placeholder: 'Title, author, and brief context about the literary work...' },
                    { id: 'thesis', label: 'Thesis Statement', placeholder: 'Your analytical argument about the text...' },
                ]
            },
            {
                group: 'Analysis Paragraph 1',
                addable: true,
                sections: prefixSections(analyticBodySections, 'body_1'),
            },
            {
                group: 'Analysis Paragraph 2',
                addable: true,
                sections: prefixSections(analyticBodySections, 'body_2'),
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'synthesis', label: 'Synthesis & Broader Significance', placeholder: 'How does your analysis deepen understanding of the work?' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Analysis Paragraph',
            sections: analyticBodySections,
        }
    },
    {
        id: 'research',
        title: 'Research Essay',
        description: 'Investigates a topic using outside sources. Requires citations and a bibliography.',
        icon: Search,
        color: 'var(--color-research)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'An engaging fact or question about your research topic...' },
                    { id: 'background', label: 'Background & Context', placeholder: 'What the reader needs to know about this topic...' },
                    { id: 'thesis', label: 'Thesis Statement', placeholder: 'Your research question or central argument...' },
                ]
            },
            {
                group: 'Body Section 1',
                addable: true,
                sections: prefixSections(researchBodySections, 'body_1'),
            },
            {
                group: 'Body Section 2',
                addable: true,
                sections: prefixSections(researchBodySections, 'body_2'),
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'findings', label: 'Summary of Findings', placeholder: 'Summarize your key research findings...' },
                    { id: 'implications', label: 'Implications & Future Research', placeholder: 'What are the broader implications? What remains to be explored?' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Body Section',
            sections: researchBodySections,
        }
    },
    {
        id: 'reflective',
        title: 'Reflective Essay',
        description: 'Looks back on an experience and explains what you learned from it.',
        icon: Lightbulb,
        color: 'var(--color-reflective)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'Draw the reader into your reflective experience...' },
                    { id: 'experience_intro', label: 'Introduction to the Experience', placeholder: 'What happened? Set the scene briefly...' },
                    { id: 'thesis', label: 'Thesis / Main Insight', placeholder: 'What is the key lesson or realization?' },
                ]
            },
            {
                group: 'Description of Experience',
                addable: true,
                sections: [
                    { id: 'body_1_event', label: 'What Happened', placeholder: 'Describe a key moment of the experience...' },
                    { id: 'body_1_thoughts', label: 'Thoughts & Feelings', placeholder: 'How did you feel? What were you thinking?' },
                    { id: 'body_1_significance', label: 'Why It Mattered', placeholder: 'Why was this moment significant?' },
                ]
            },
            {
                group: 'Reflection & Analysis',
                sections: [
                    { id: 'why_significant', label: 'Why Was This Significant?', placeholder: 'Why does this experience stand out to you?' },
                    { id: 'what_learned', label: 'What You Learned', placeholder: 'How did this experience change your perspective or behavior?' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'looking_forward', label: 'Looking Forward', placeholder: 'How will you apply what you learned in the future?' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Experience Moment',
            sections: [
                { id: 'event', label: 'What Happened', placeholder: 'Describe a key moment of the experience...' },
                { id: 'thoughts', label: 'Thoughts & Feelings', placeholder: 'How did you feel? What were you thinking?' },
                { id: 'significance', label: 'Why It Mattered', placeholder: 'Why was this moment significant?' },
            ]
        }
    },
    {
        id: 'process',
        title: 'Process Essay (How-to)',
        description: 'Explains how to do something step by step.',
        icon: ListOrdered,
        color: 'var(--color-process)',
        structure: [
            {
                group: 'Introduction',
                sections: [
                    { id: 'hook', label: 'Hook', placeholder: 'Why is this process worth learning?' },
                    { id: 'overview', label: 'Process Overview', placeholder: 'Briefly describe what the reader will learn to do...' },
                    { id: 'materials', label: 'Materials / Prerequisites', placeholder: 'What does the reader need before starting?' },
                ]
            },
            {
                group: 'Step 1',
                addable: true,
                sections: [
                    { id: 'body_1_instruction', label: 'Instruction', placeholder: 'What does the reader need to do in this step?' },
                    { id: 'body_1_detail', label: 'Details & Tips', placeholder: 'Important details, warnings, or tips...' },
                    { id: 'body_1_transition', label: 'Transition', placeholder: 'Connect to the next step...' },
                ]
            },
            {
                group: 'Step 2',
                addable: true,
                sections: [
                    { id: 'body_2_instruction', label: 'Instruction', placeholder: 'What does the reader need to do in this step?' },
                    { id: 'body_2_detail', label: 'Details & Tips', placeholder: 'Important details, warnings, or tips...' },
                    { id: 'body_2_transition', label: 'Transition', placeholder: 'Connect to the next step...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'expected_result', label: 'Expected Result', placeholder: 'What the reader should have accomplished...' },
                    { id: 'troubleshooting', label: 'Troubleshooting & Final Tips', placeholder: 'Common issues and how to fix them...' },
                ]
            },
        ],
        bodyTemplate: {
            group: 'Step',
            sections: [
                { id: 'instruction', label: 'Instruction', placeholder: 'What does the reader need to do in this step?' },
                { id: 'detail', label: 'Details & Tips', placeholder: 'Important details, warnings, or tips...' },
                { id: 'transition', label: 'Transition', placeholder: 'Connect to the next step...' },
            ]
        }
    },
]

/**
 * Helper: get a single essay type config by id
 */
export function getEssayType(id) {
    return essayTypes.find(t => t.id === id) || null
}

/**
 * Helper: get the color for an essay type
 */
export function getEssayTypeColor(id) {
    const type = getEssayType(id)
    return type ? type.color : 'var(--color-text-secondary)'
}

/**
 * Helper: build an initial groups array from a type's default structure.
 * Each group gets a unique key for React rendering.
 */
export function buildInitialGroups(essayTypeId) {
    const type = getEssayType(essayTypeId)
    if (!type) return []
    return type.structure.map((group, idx) => ({
        ...group,
        key: `${group.group.replace(/\s+/g, '_').toLowerCase()}_${idx}`,
    }))
}

/**
 * Helper: create a new body paragraph group from the type's bodyTemplate
 * with uniquely-prefixed section ids.
 */
export function createNewBodyGroup(essayTypeId, existingGroups) {
    const type = getEssayType(essayTypeId)
    if (!type || !type.bodyTemplate) return null

    // Count how many body groups already exist to generate unique ids
    const bodyCount = existingGroups.filter(g => g.addable).length + 1
    const prefix = `body_${bodyCount}`

    return {
        group: `${type.bodyTemplate.group} ${bodyCount}`,
        addable: true,
        isDynamic: true,
        key: `dynamic_body_${Date.now()}`,
        sections: type.bodyTemplate.sections.map(s => ({
            ...s,
            id: `${prefix}_${s.id}`,
        })),
    }
}

/**
 * Helper: build an empty structure object from groups
 */
export function buildEmptyStructure(groups) {
    const structure = {}
    for (const group of groups) {
        for (const section of group.sections) {
            structure[section.id] = ''
        }
    }
    return structure
}

export default essayTypes
