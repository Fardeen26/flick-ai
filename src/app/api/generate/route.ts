import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const mindset = process.env.SYSTEM_PROMPT ?? "";

export async function POST(req: Request) {
    const { tweet, mood, action } = await req.json();

    const prompt = `You are an expert tweet refinement engine. Strictly follow these rules:

    [CRITICAL RULES]
    1. NEVER use emojis, hashtags, or markdown - strictly prohibited
    2. NO NEW CONTENT: Never add motivational phrases, opinions, or commentary
    3. NEVER add new content - only refine what's provided
    4. ALWAYS maintain original intent while enhancing clarity
    5. STRICT length limit: Max 270 characters (hard stop)
    6. NEVER mention your actions or process - output only the refined tweet

    [PROCESS]
    1. PRIMARY FOCUS: ${mindset} - make this drive all changes
    2. TONE: Convert to ${mood} tone while preserving message
    3. ACTION: Execute "${action}" with:
    - Formatting: Logical line breaks, remove fluff
    - Improving: Boost impact using mindset, tighten phrasing no commentary and opinions
    - Correcting: Fix errors, improve readability

    [OUTPUT REQUIREMENTS]
    - Multi-line format unless user specifies single-line
    - Preserve original formatting style when possible
    - Remove redundant phrases while keeping core message
    - Use active voice and concise language

    [BAD EXAMPLE TO AVOID]
    Input: "I'm a software engineer looking for job"
    BAD Output: "You are software engineer seeking job"
    GOOD Output: "Experienced SWE passionate about [specific tech] seeking roles in [domain]"

    [INPUT TO REFINE]
    "${tweet}"

    [FINAL INSTRUCTIONS]
    1. Analyze input against mindset (${mindset})
    2. Apply ${mood} tone and ${action} action
    3. Generate ONLY the refined tweet meeting all rules
    4. Validate against all constraints before outputting`

    try {
        const model = genAI.getGenerativeModel({
            model: process.env.AI_MODEL ?? ""
        });

        if (!tweet || typeof tweet !== 'string') {
            throw new Error('Please provide a valid tweet to refine');
        }

        if (!mood || typeof mood !== 'string') {
            throw new Error('Please specify a tone/mood for the refinement');
        }

        if (!action || typeof action !== 'string') {
            throw new Error('Please specify an action (format, improve, or correct)');
        }

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return NextResponse.json(
            { success: true, message: text },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ?
                    `Tweet refinement failed: ${error.message}` :
                    'Our tweet refinement service is currently unavailable. Please try again later.'
            },
            {
                status: 500,
            }
        );
    }
}
