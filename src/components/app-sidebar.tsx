import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { prisma } from "@/lib/prisma"
import { HistoryType } from "@/types/HistoryType"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import fontInter from "@/app/font"
import Link from "next/link"
import UsageCount from "./UsageCount"

export async function AppSidebar() {
    const session = await getServerSession(authOptions)

    if (!session?.user) return null;

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email ?? ""
        }
    })

    if (!user) return <div className="">User not found</div>

    const interactions: HistoryType[] = await prisma.interaction.findMany({
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

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <div className="flex items-center gap-3 mt-4">
                            <span>
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src="/p8.png" alt="profile" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            </span>
                            <Link href='/' className="text-lg text-white">Flick.AI</Link>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-10">
                        <SidebarMenu className="">
                            {interactions.length < 1 && <span className="text-center">No interactions yet!</span>}
                            {interactions.length > 0 && interactions.map((item) => (
                                <SidebarMenuItem key={item.id} className="hover:bg-gray-100/10 px-2 py-2.5 rounded-xl">
                                    <SidebarMenuButton asChild>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="text-start line-clamp-1">
                                                    <Link href={`/i/${item.id}`}>
                                                        <span className={`${fontInter}`}>{item.userPrompt}</span>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{item.userPrompt}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="absolute bottom-0 w-full text-xl rounded-lg px-2 cursor-pointer">
                    <div className="hover:bg-gray-200/10 p-3 rounded-lg">
                        <UsageCount />
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
