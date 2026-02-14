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
 * Each type includes metadata, structure template, and display config.
 * Structure templates define the section blocks shown in the essay builder.
 */
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
                sections: [
                    { id: 'event_1', label: 'First Key Event', placeholder: 'The first significant moment in your story...' },
                    { id: 'event_2', label: 'Building Tension', placeholder: 'Events that escalate the conflict or challenge...' },
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
        ]
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
                group: 'Body — Sensory Details',
                sections: [
                    { id: 'visual', label: 'Visual Details', placeholder: 'What does it look like? Colors, shapes, lighting...' },
                    { id: 'auditory', label: 'Sounds & Atmosphere', placeholder: 'What sounds are present? Silence, noise, music...' },
                    { id: 'tactile_other', label: 'Touch, Smell & Taste', placeholder: 'Textures, temperatures, scents, flavors...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'final_impression', label: 'Final Impression', placeholder: 'Reinforce the dominant impression and leave the reader with a lasting image...' },
                ]
            },
        ]
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
                sections: [
                    { id: 'topic_1', label: 'Topic Sentence', placeholder: 'The main idea of this paragraph...' },
                    { id: 'evidence_1', label: 'Explanation & Evidence', placeholder: 'Facts, definitions, examples supporting the topic...' },
                ]
            },
            {
                group: 'Body Paragraph 2',
                sections: [
                    { id: 'topic_2', label: 'Topic Sentence', placeholder: 'The main idea of this paragraph...' },
                    { id: 'evidence_2', label: 'Explanation & Evidence', placeholder: 'Facts, definitions, examples supporting the topic...' },
                ]
            },
            {
                group: 'Body Paragraph 3',
                sections: [
                    { id: 'topic_3', label: 'Topic Sentence', placeholder: 'The main idea of this paragraph...' },
                    { id: 'evidence_3', label: 'Explanation & Evidence', placeholder: 'Facts, definitions, examples supporting the topic...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'summary', label: 'Summary of Key Points', placeholder: 'Restate the main points covered...' },
                    { id: 'closing', label: 'Closing Thought', placeholder: 'A final thought that ties everything together...' },
                ]
            },
        ]
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
                sections: [
                    { id: 'topic_1', label: 'Topic Sentence', placeholder: 'Your first supporting argument...' },
                    { id: 'evidence_1', label: 'Evidence & Analysis', placeholder: 'Facts, statistics, or quotes that support this point...' },
                ]
            },
            {
                group: 'Body Paragraph 2',
                sections: [
                    { id: 'topic_2', label: 'Topic Sentence', placeholder: 'Your second supporting argument...' },
                    { id: 'evidence_2', label: 'Evidence & Analysis', placeholder: 'Facts, statistics, or quotes that support this point...' },
                ]
            },
            {
                group: 'Counterargument',
                sections: [
                    { id: 'counter', label: 'Counterargument', placeholder: 'Acknowledge the opposing viewpoint...' },
                    { id: 'rebuttal', label: 'Rebuttal', placeholder: 'Explain why your argument is still stronger...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'restate_thesis', label: 'Restate Thesis', placeholder: 'Reinforce your position in light of the evidence...' },
                    { id: 'call_to_action', label: 'Call to Action', placeholder: 'What should the reader think or do after reading?' },
                ]
            },
        ]
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
                group: 'Similarities',
                sections: [
                    { id: 'similarity_1', label: 'Key Similarity 1', placeholder: 'A major way the subjects are alike...' },
                    { id: 'similarity_2', label: 'Key Similarity 2', placeholder: 'Another important similarity...' },
                ]
            },
            {
                group: 'Differences',
                sections: [
                    { id: 'difference_1', label: 'Key Difference 1', placeholder: 'A major way the subjects differ...' },
                    { id: 'difference_2', label: 'Key Difference 2', placeholder: 'Another important difference...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'synthesis', label: 'Synthesis', placeholder: 'What do these comparisons reveal? Which is better, or what do we learn?' },
                ]
            },
        ]
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
                group: 'Causes',
                sections: [
                    { id: 'cause_1', label: 'Primary Cause', placeholder: 'The main reason something happened...' },
                    { id: 'cause_2', label: 'Contributing Cause', placeholder: 'Another factor that contributed...' },
                ]
            },
            {
                group: 'Effects',
                sections: [
                    { id: 'effect_1', label: 'Immediate Effect', placeholder: 'What happened right away as a result...' },
                    { id: 'effect_2', label: 'Long-term Effect', placeholder: 'Lasting consequences or outcomes...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'summary', label: 'Summary & Significance', placeholder: 'Why does this cause-effect relationship matter?' },
                ]
            },
        ]
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
                sections: [
                    { id: 'claim_1', label: 'Claim', placeholder: 'Your first analytical point...' },
                    { id: 'textual_evidence_1', label: 'Textual Evidence', placeholder: 'A quote or specific reference from the text...' },
                    { id: 'analysis_1', label: 'Analysis', placeholder: 'Explain how this evidence supports your thesis...' },
                ]
            },
            {
                group: 'Analysis Paragraph 2',
                sections: [
                    { id: 'claim_2', label: 'Claim', placeholder: 'Your second analytical point...' },
                    { id: 'textual_evidence_2', label: 'Textual Evidence', placeholder: 'A quote or specific reference from the text...' },
                    { id: 'analysis_2', label: 'Analysis', placeholder: 'Explain how this evidence supports your thesis...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'synthesis', label: 'Synthesis & Broader Significance', placeholder: 'How does your analysis deepen understanding of the work?' },
                ]
            },
        ]
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
                sections: [
                    { id: 'topic_1', label: 'Topic Sentence', placeholder: 'The main idea of this section...' },
                    { id: 'source_evidence_1', label: 'Source Evidence & Citations', placeholder: 'Researched findings with proper citations...' },
                    { id: 'analysis_1', label: 'Analysis', placeholder: 'Your interpretation of the evidence...' },
                ]
            },
            {
                group: 'Body Section 2',
                sections: [
                    { id: 'topic_2', label: 'Topic Sentence', placeholder: 'The main idea of this section...' },
                    { id: 'source_evidence_2', label: 'Source Evidence & Citations', placeholder: 'Researched findings with proper citations...' },
                    { id: 'analysis_2', label: 'Analysis', placeholder: 'Your interpretation of the evidence...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'findings', label: 'Summary of Findings', placeholder: 'Summarize your key research findings...' },
                    { id: 'implications', label: 'Implications & Future Research', placeholder: 'What are the broader implications? What remains to be explored?' },
                ]
            },
        ]
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
                sections: [
                    { id: 'what_happened', label: 'What Happened', placeholder: 'Describe the experience in detail...' },
                    { id: 'thoughts_feelings', label: 'Thoughts & Feelings', placeholder: 'How did you feel during and after the experience?' },
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
        ]
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
                sections: [
                    { id: 'step_1', label: 'Step 1', placeholder: 'The first step in the process...' },
                    { id: 'step_1_detail', label: 'Details & Tips', placeholder: 'Important details, warnings, or tips for this step...' },
                ]
            },
            {
                group: 'Step 2',
                sections: [
                    { id: 'step_2', label: 'Step 2', placeholder: 'The second step in the process...' },
                    { id: 'step_2_detail', label: 'Details & Tips', placeholder: 'Important details, warnings, or tips for this step...' },
                ]
            },
            {
                group: 'Step 3',
                sections: [
                    { id: 'step_3', label: 'Step 3', placeholder: 'The third step in the process...' },
                    { id: 'step_3_detail', label: 'Details & Tips', placeholder: 'Important details, warnings, or tips for this step...' },
                ]
            },
            {
                group: 'Conclusion',
                sections: [
                    { id: 'expected_result', label: 'Expected Result', placeholder: 'What the reader should have accomplished...' },
                    { id: 'troubleshooting', label: 'Troubleshooting & Final Tips', placeholder: 'Common issues and how to fix them...' },
                ]
            },
        ]
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
 * Helper: build an empty structure object for a given essay type
 * Returns { sectionId: '' } for each section
 */
export function buildEmptyStructure(essayTypeId) {
    const type = getEssayType(essayTypeId)
    if (!type) return {}
    const structure = {}
    for (const group of type.structure) {
        for (const section of group.sections) {
            structure[section.id] = ''
        }
    }
    return structure
}

export default essayTypes
