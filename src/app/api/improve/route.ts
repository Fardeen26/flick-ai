import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const mindset = process.env.SYSTEM_PROMPT ?? '';

export async function POST(req: Request) {
    const { tweet, result, mood, action, improvePrompt } = await req.json();
    const prompt = `System Instruction:
    "You are an AI assistant helping users refine tweets to better suit their needs. Always maintain clarity and align with the user's selected mood, action, and instructions and please avoid using hashtags and emojis and always give the multi liner output if user has not specified. Ensure the tone and style remain consistent with their preferences."

    0. Mindset: generate the text based on my mindset: ${mindset}
    1. Keep the length of the tweet as minimal as possible and the length of the tweet should be more than 270 characters.
    User Prompt:
    ${improvePrompt}

    User Initial Tweet:
    ${tweet}

    Previously Generated Tweet:
    ${result}

    Mode of Modification: ${mood}.
    Action: ${action}.

    Instructions: Make the tweet witty and engaging while simplifying the language. Add a conversational tone and keep it concise for social media.

    Output Expectations:
    The revised tweet should remain under, convey a humorous yet casual vibe, and retain the original message's core idea."
    `;

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