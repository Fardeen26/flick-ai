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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import fontInter from "@/app/font"
import Link from "next/link"
import UsageCount from "./UsageCount"
import { Settings } from "lucide-react"
import CorePromptForm from "./CorePromptForm"

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

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const thirtyDaysAgo = new Date(todayStart);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const groupedInteractions = interactions.reduce((acc, interaction) => {
        const interactionDate = new Date(interaction.createdAt);

        if (interactionDate >= todayStart) {
            acc['Today'] = acc['Today'] || [];
            acc['Today'].push(interaction);
        } else if (interactionDate >= yesterdayStart) {
            acc['Yesterday'] = acc['Yesterday'] || [];
            acc['Yesterday'].push(interaction);
        } else if (interactionDate >= sevenDaysAgo) {
            acc['Previous 7 Days'] = acc['Previous 7 Days'] || [];
            acc['Previous 7 Days'].push(interaction);
        } else if (interactionDate >= thirtyDaysAgo) {
            acc['Previous 30 Days'] = acc['Previous 30 Days'] || [];
            acc['Previous 30 Days'].push(interaction);
        } else {
            acc['2024'] = acc['2024'] || [];
            acc['2024'].push(interaction);
        }

        return acc;
    }, {} as Record<string, HistoryType[]>);

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="overflow-y-auto">
                    <SidebarGroupLabel>
                        <div className="flex items-center gap-3 mt-4">
                            <span>
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src="/p8.png" alt="profile" />
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            </span>
                            <Link href='/' className="text-lg text-white max-sm:text-black max-sm:dark:text-white">Flick.AI</Link>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-10">
                        <SidebarMenu>
                            {Object.entries(groupedInteractions).map(([period, items]) => (
                                <div key={period}>
                                    <div className="text-sm text-gray-400 px-2 py-1">{period}</div>
                                    {items.map((item) => (
                                        <Link href={`/i/${item.id}`} key={item.id}>
                                            <SidebarMenuItem className="hover:bg-gray-100/10 px-2 py-2.5 rounded-xl">
                                                <SidebarMenuButton asChild>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger className="text-start line-clamp-1">
                                                                <span className={`${fontInter}`}>{item.userPrompt}</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>{item.userPrompt}</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                            {interactions.length < 1 && <span className="text-center">No interactions yet!</span>}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarFooter className="absolute bottom-0 w-full px-2">
                    <Popover>
                        <PopoverTrigger>
                            <div className="flex gap-1 text-xs items-center p-3 border border-white/20 rounded-lg hover:bg-gray-200/10 cursor-pointer">
                                <span><Settings className="w-4 h-4" /></span>
                                <span>Core Prompt</span>
                                <span className="text-[10px] ml-2 py-[1px] w-12 rounded-xl bg-white text-black font-semibold">
                                    New
                                </span>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="space-y-3 bg-[#30353a] border-none z-50">
                            <CorePromptForm />
                        </PopoverContent>
                    </Popover>
                    <div className="hover:bg-gray-200/10 p-3 rounded-lg border border-white/20">
                        <UsageCount />
                    </div>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}
