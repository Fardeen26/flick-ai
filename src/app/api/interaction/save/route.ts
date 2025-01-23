import { PrismaClient } from "@prisma/client";
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../../auth/[...nextauth]/options";
const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { tweet, mood, action, result } = await req.json();
    const session = await getServerSession(authOptions)

    if (!session) {
        return Response.json(
            { success: false, message: 'Not authenticated' },
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
                { success: false, message: 'User not found' },
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
            { success: true, message: "Interaction added successfully" },
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            { success: false, message: error instanceof Error ? error.message : 'Error adding Interaction' },
            { status: 501 }
        )
    }
}