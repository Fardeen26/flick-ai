import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const mindset = process.env.SYSTEM_PROMPT ?? '';

export async function POST(req: Request) {
    const { tweet, result, mood, action, improvePrompt } = await req.json();

    const prompt = `You are an AI assistant helping users refine tweets. Your task is to modify the tweet based on the user's follow-up instructions while maintaining clarity, tone, and alignment with their preferences. Follow these steps:

    1. Mindset: Reflect the user's this mindset in the refined tweet: ${mindset}
    2. Length: Keep the tweet as short as possible, never exceeding 270 characters.
    3. Tone: Match the user's selected mood.
    4. Action: Perform the requested action (Formatting/Improving/Correcting).
    5. Style: Use multi-line formatting if the user hasn’t specified otherwise.
    6. Core Message: Ensure the refined tweet retains the original message's core idea.

    Input:

    - User’s follow-up instructions: ${improvePrompt}
    - Initial Tweet: ${tweet}
    - Previously refined Tweet by you: ${result}
    - Mood: ${mood}
    - Action: ${action}

    Output Expectations:

    - Keep the tweet short and if possible match with the initial tweet length and always use multi lines.
    - Simplify the language and make it concise for twitter.
    - Always Avoid hashtags and emojis.
    - Ensure the tone and style remain consistent with the user's preferences.

    Respond with the refined tweet based on these parameters.`

    try {
        const model = genAI.getGenerativeModel({
            model: process.env.AI_MODEL ?? ""
        });
        const res = await model.generateContent(prompt);
        const text = res.response.text();

        return NextResponse.json(
            { success: true, message: text },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' },
            {
                status: 500,
            }
        );
    }

}