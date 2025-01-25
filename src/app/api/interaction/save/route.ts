import { getServerSession } from 'next-auth/next'
import { authOptions } from "../../auth/[...nextauth]/options";
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    const { tweet, mood, action, result } = await req.json();
    const session = await getServerSession(authOptions)

    if (!session) {
        return Response.json(
            { success: false, message: 'Please sign in to save your interaction' },
            { status: 401 }
        );
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user?.email ?? ""
            }
        })

        if (!user) {
            return Response.json(
                { success: false, message: 'Your account could not be found. Please try signing in again' },
                { status: 404 }
            );
        }

        await prisma.interaction.create({
            data: {
                userPrompt: tweet,
                aiResponse: result,
                mood: mood,
                action: action,
                userId: user?.id
            }
        });

        return Response.json(
            { success: true, message: "Your interaction has been saved" },
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            { success: false, message: error instanceof Error ? `We encountered an issue while saving: ${error.message}` : 'An unexpected error occurred while saving your interaction. Please try again later.' },
            { status: 500 }
        )
    }
}