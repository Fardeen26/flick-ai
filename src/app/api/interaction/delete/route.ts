import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return Response.json(
                { success: false, message: "Interaction ID is required" },
                { status: 400 }
            );
        }

        await prisma.interaction.delete({
            where: { id },
            include: { user: true }
        });

        return Response.json(
            { success: true, message: "Interaction deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return Response.json(
                    { success: false, message: "Interaction not found" },
                    { status: 404 }
                );
            }
            return Response.json(
                { success: false, message: "Database error", error: error.meta },
                { status: 500 }
            );
        }

        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}