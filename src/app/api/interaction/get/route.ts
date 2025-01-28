import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return NextResponse.json(
            { success: false, message: 'Authentication required. Please sign in to access this resource.' },
            { status: 401 }
        );
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: session.user.email ?? ""
            }
        })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User account not found. Please verify your account status.' },
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

        if (!interactions) {
            return NextResponse.json(
                { success: true, message: 'No interactions found.' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { success: true, message: interactions },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? `Error fetching interactions ${error.message}` : 'An unexpected error occurred while fetching your interactions.'
            },
            { status: 500 }
        );
    }
}