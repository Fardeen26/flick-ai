import { genAI } from '@/lib/genAI';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const { tweet, mood, action } = await req.json();
    const session = await getServerSession(authOptions);
    const forwarded = req.headers.get('x-forwarded-for');
    const userIp: string = forwarded?.split(',')[0]?.trim() || 'Unknown IP';

    const ipResult = await prisma.userIp.findFirst({
        where: {
            ipAddress: userIp ?? ''
        }
    })

    if (!session && ipResult) {
        return Response.json(
            { success: false, message: 'Credit limit reached, please signup' },
            { status: 401 }
        );
    }

    let corePrompt;

    try {
        if (!session?.user || !ipResult) {
            corePrompt = process.env.SYSTEM_PROMPT;
            await prisma.userIp.create({
                data: {
                    ipAddress: userIp
                }
            })
        } else {
            if (!session?.user) return;

            const user = await prisma.user.findFirst({
                where: {
                    email: session.user.email ?? ""
                }
            })
            corePrompt = user?.corePrompt;
        }

        const prompt = `You are an expert tweet refinement engine. Strictly follow these rules:

        [CRITICAL RULES]
        1. NEVER use emojis, hashtags, or markdown - strictly prohibited
        2. NO NEW CONTENT: Never add motivational phrases, opinions, advise or commentary. It's strict rule
        3. NEVER add new content - only refine what's provided
        4. ALWAYS maintain original intent while enhancing clarity
        5. STRICT length limit: Max 280 characters (hard stop)
        6. NEVER mention your actions or process - output only the refined tweet no other bullshit
        7. If the user provides you with a tweet, your task is to refine it, not comment on it or make it longer than the original tweet.

        [PROCESS]
        1. PRIMARY FOCUS: ${corePrompt} - make this drive all changes
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
        1. Analyze input against core prompt (${corePrompt})
        2. Apply ${mood} tone and ${action} action
        3. Generate ONLY the refined tweet meeting all rules
        4. Validate against all constraints before outputting`

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
