import Utility from "@/app/history/components/Utility";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { HistoryType } from "@/types/HistoryType";
import { InteractionPageProps } from "@/types/InteractionPageProps";
import { getServerSession } from "next-auth";

export default async function InteractionPage({ params }: InteractionPageProps) {
    const interactionId = await params.interactionId
    const session = await getServerSession(authOptions)

    if (!session?.user) return <div className="">You are unauthorized</div>

    const interaction: HistoryType | null = await prisma.interaction.findUnique({
        where: {
            id: Number(interactionId)
        }
    })

    return (
        <section className="w-full flex px-20 interactions-center mt-24 pb-12">
            <div className="flex flex-col w-full space-y-5">
                <div className="pl-40 flex justify-end">
                    <div className="pl-6 pr-6 py-4 text-left bg-gray-400/10 rounded-xl">
                        <div className="space-x-3 mb-2">
                            <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{interaction?.mood}</span>
                            <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{interaction?.action}</span>
                        </div>
                        <p>{interaction?.userPrompt}</p>
                    </div>
                </div>
                <div className="flex justify-start gap-3">
                    <span>
                        <Avatar>
                            <AvatarImage src="/p8.png" alt="profile" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    </span>
                    <div>
                        <p className='leading-7'>&quot;{interaction?.aiResponse}&quot;</p>
                        <div className="flex interactions-center mt-1 gap-3">
                            <span className='text-xs'>{interaction?.createdAt.toDateString()}</span>
                            <Utility aiResponse={interaction?.aiResponse} id={interaction?.id} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}