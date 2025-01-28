import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email!,
                            name: user.name,
                            profileImage: user.image,
                            corePrompt: process.env.SYSTEM_PROMPT
                        },
                    });
                }
                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false;
            } finally {
                await prisma.$disconnect();
            }
        },
    },
    session: {
        strategy: "jwt",
    },
}