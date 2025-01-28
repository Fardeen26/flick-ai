"use client";

import ResultProvider from "@/context/ResultContext";
import TweetProvider from "@/context/TweetContext";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <TweetProvider>
                <ResultProvider>
                    {children}
                </ResultProvider>
            </TweetProvider>
        </ThemeProvider>
    </SessionProvider>;
}