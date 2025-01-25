import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return Response.json(
            { success: false, message: 'Please sign in to see your interactions' },
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

        const interactions = await prisma.interaction.findMany({
            where: {
                userId: user.id
            },
            include: {
                user: false,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Response.json(interactions, { status: 200 });
    } catch (error) {
        console.error('Error fetching interactions:', error);
        return Response.json(
            { message: 'Failed to fetch interactions' },
            { status: 500 }
        );
    }
}