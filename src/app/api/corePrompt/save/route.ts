import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const userMail = session?.user?.email;

    if (!userMail) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const { corePrompt } = await req.json();

    if (!corePrompt) {
        return NextResponse.json(
            { success: false, message: "Core prompt is required" },
            { status: 400 }
        );
    }

    try {
        await prisma.user.update({
            where: { email: userMail },
            data: {
                corePrompt
            }
        });

        return NextResponse.json(
            { success: true, message: "Core prompt updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: `Failed to update core prompt: ${error instanceof Error ? error.message : 'Unknown error'}` },
            { status: 500 }
        );
    }
}