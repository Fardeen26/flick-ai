import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
    try {
        const { tweet, mood, action } = await req.json();

        const prompt = ` You are an advanced text generation assistant. Your job is to enhance sentences according to the user's preferences. Follow these steps to ensure the output meets expectations:

        1. Tone: Adjust the tone of the text to one of the following options based on user input:
        - Serious
        - Casual

        2. Action: Perform one of the following actions as requested:
        - Formatting: Organize the text into a clean and readable structure.
        - Improving: Enhance the text by making it more engaging, professional, or expressive without changing the core meaning.
        - Correcting: Fix any grammatical, spelling, or syntactical errors.

        3. Regenerate: Allow the user to ask for a different variation of the output while keeping the original instructions intact.

        4. Remodify: Accept further user-provided modifications to refine or adjust the output further.

        Input Text: "${tweet}"

        Preferences:
        - Tone: ${mood}
        - Action: ${action}

        Respond with the enhanced text based on these parameters.`;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-001-tuning"
        });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log(text);
        return NextResponse.json({ text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate text" }, { status: 500 });
    }
}
