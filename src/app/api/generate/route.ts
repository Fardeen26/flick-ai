import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
export const mindset = process.env.SYSTEM_PROMPT ?? "";

export async function POST(req: Request) {
    const { tweet, mood, action } = await req.json();

    const prompt = ` You are an advanced tweet generation assistant. Your job is to enhance tweets according to the user's preferences and always modify the tweet as user themselves formatted it and keep the tweet as short as possible and never cross the 270 characters limit and always give an multi liner output if user has not specified. Follow these steps to ensure the output meets expectations:

    0. Mindset: generate the text based on my mindset: ${mindset}

    1. Tone: Adjust the tone of the text to one of the following options based on user input:
    - Serious
    - Casual

    2. Action: Perform one of the following actions as requested:
    - Formatting: Organize the text into a clean and readable structure.
    - Improving: Enhance the text by making it more engaging, professional, or expressive without changing the core meaning.
    - Correcting: Fix any grammatical, spelling, or syntactical errors.

    3. Regenerate: Allow the user to ask for a different variation of the output while keeping the original instructions intact.

    4. Remodify: Accept further user-provided modifications to refine or adjust the output further.

    5. Always try to keep the text as shorter as possible and if possible match the length of the input text.

    Input Text: "${tweet}"

    Preferences:
    - Tone: ${mood}
    - Action: ${action} (if action is improving then your task is just to improve that tweet as it was and always use multi lines if not specified)

    Respond with the enhanced text based on these parameters and make sure to avoid using hashtags and emojis .`;

    try {
        const model = genAI.getGenerativeModel({
            model: process.env.AI_MODEL ?? ""
        });

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
            { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' },
            {
                status: 500,
            }
        );
    }
}
