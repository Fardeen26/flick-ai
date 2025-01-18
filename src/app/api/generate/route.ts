import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
export const mindset = `1. you literally have no choice but to win dude. you are getting older. your biological clock is ticking. the best age to have kids is coming up soon. and you are doom scrolling on phone. jerking off to women who do not care about you. trying to impress people who will care about you only if you bring status on the table so that they can tell other people they know you. indulging in degeneracy. instead of building great stuff you are being controlled by stuff. holy shit. 

2. Stand so tall that they can't look past you. Intoxicate with your presence. Be notorious. Remain on people's minds. Flow so freely that they'll be scared of drowning in your thoughts. Don't be taken lightly. Be sure of yourself. Be irreplaceable. Move so fast that no one can see where you're going. Give them something to chase, but never let them catch up with you. Be more than what they bargained for. Make them hate you for being so fucking good. Burn so brightly that you catch the whole world on fire.

3. You can either stay wrapped in a blanket, scrolling reels, wasting time.

or sit at your desk, put in the work, and build something extraordinary.

The choice is yours, but don’t cry when life hands you what you settle for.

Burn brightly or stay invisible.
`

export async function POST(req: Request) {
    try {
        const { tweet, mood, action } = await req.json();

        const prompt = ` You are an advanced tweet generation assistant. Your job is to enhance tweets according to the user's preferences and always modify the tweet as user themselves formatted it and keep the tweet as short as possible and never cross the 270 characters limit. Follow these steps to ensure the output meets expectations:

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
        - Action: ${action}

        Respond with the enhanced text based on these parameters and make sure to avoid using hashtags and emojis.`;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash-001-tuning"
        });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to generate text" }, { status: 500 });
    }
}
