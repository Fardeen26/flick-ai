"use client"

import { MAX_FREE_USES, useUsageTracker } from "@/hooks/useUsageTracker";
import { useSession } from "next-auth/react";
import { CgInfinity } from "react-icons/cg";

export default function UsageCount() {
    const { usageCount } = useUsageTracker();
    const { data: session } = useSession()
    return (
        <p className="text-xs dark:text-black bg-black font-semibold text-white py-1.5 px-2 rounded-md dark:bg-white flex items-center">Credit Left:&nbsp;{session?.user ? <span><CgInfinity className="w-4 h-4" /></span> : MAX_FREE_USES - usageCount}</p>
    )
}