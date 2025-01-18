import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { mindset } from '../generate/route';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
    const { tweet, result, mood, action, improvePrompt } = await req.json();
    const prompt = `System Instruction:
    "You are an AI assistant helping users refine tweets to better suit their needs. Always maintain clarity and align with the user's selected mood, action, and instructions and please avoid using hashtags and emojis. Ensure the tone and style remain consistent with their preferences."

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

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-001-tuning"
    });
    const result2 = await model.generateContent(prompt);
    const response = result2.response;
    const text = response.text();
    return NextResponse.json({ text: text });
}