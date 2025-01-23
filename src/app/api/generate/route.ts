import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const mindset = process.env.SYSTEM_PROMPT ?? "";

export async function POST(req: Request) {
    const { tweet, mood, action } = await req.json();

    const prompt = `You are an advanced tweet refinement assistant. Your task is to enhance tweets based on the user's preferences while keeping the output short (never exceeding 270 characters) and maintaining the original formatting style. Follow these steps:

    1. Mindset: Reflect the user's this mindset in the refined tweet: ${mindset}

    2. Tone: Adjust the tone to match the user's preference and it will be given by the user.

    3. Action: Perform one of the following as requested:
    - Formatting: Organize the text into a clean, readable structure.
    - Improving: Match the tweet with the given mindset of user, or expressive without altering its core meaning.
    - Correcting: Fix grammatical, spelling, or syntactical errors.

    4.Output: Always use multi-line formatting if the user hasn't specified otherwise.

    5. Regenerate: Provide variations of the refined tweet upon request, keeping the original instructions intact.

    6. Remodify: Accept further adjustments to refine the output as needed.

    Rules:
    - Keep the tweet as short as possible, ideally matching the length of the input text.
    - Always Avoid using hashtags and emojis.
    - Focus only on refining the tweet, not mentioning the user or additional context.

    Input: The tweet to refine: ${tweet}.
    Preferences: Tone: ${mood} and Action: ${action}.

    Respond with the refined tweet based on these parameters.`

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
