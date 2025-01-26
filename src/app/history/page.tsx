import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { prisma } from '@/lib/prisma'
import { HistoryType } from '@/types/HistoryType'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Utility from './components/Utility'
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default async function History() {
    const session = await getServerSession(authOptions)

    if (!session?.user) return redirect('/')

    const user = await prisma.user.findFirst({
        where: {
            email: session.user?.email ?? ""
        }
    })

    if (!user) return <div>User not found</div>

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
        <section className="flex flex-col gap-5 items-center px-52 max-sm:px-4 mt-24 pb-12 max-sm:overflow-hidden">
            {
                interactions.length < 1 && <div className='flex flex-col gap-2 justify-center w-[50vw] max-sm:w-[100vw] h-full items-center'>
                    <span className='text-lg'>No Interactions found!</span>
                    <Link href='/' className='dark:bg-white dark:text-black bg-black text-white py-1 px-2 rounded-lg text-sm'>Go Back</Link>
                </div>
            }
            {
                interactions.length > 0 && interactions.map((item, idx) => (
                    <div className="flex flex-col w-full space-y-5" key={idx}>
                        <div className="pl-40 max-sm:pl-12 flex justify-end">
                            <div className="pl-6 pr-6 py-4 max-sm:px-4 text-left bg-gray-400/10 rounded-xl">
                                <div className="space-x-3 mb-2">
                                    <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{item.mood}</span>
                                    <span className='text-xs bg-gray-300/10 px-2 py-1 rounded-md'>{item.action}</span>
                                </div>
                                <p className='max-sm:text-sm'>{item.userPrompt}</p>
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
                                <p className='leading-7 max-sm:text-sm'>&quot;{item.aiResponse}&quot;</p>
                                <div className="flex items-center mt-1 gap-3">
                                    <span className='text-xs'>{item.createdAt.toDateString()}</span>
                                    <Utility aiResponse={item.aiResponse} id={item.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}