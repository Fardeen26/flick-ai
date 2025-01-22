"use client";

import ResultProvider from "@/context/ResultContext";
import TweetProvider from "@/context/TweetContext";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider
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
    </ThemeProvider>;
}