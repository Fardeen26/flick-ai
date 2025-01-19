"use client";

import ResultProvider from "@/context/ResultContext";
import TweetProvider from "@/context/TweetContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <TweetProvider>
        <ResultProvider>
            {children}
        </ResultProvider>
    </TweetProvider>;
}