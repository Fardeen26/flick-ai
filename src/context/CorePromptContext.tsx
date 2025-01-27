"use client"

import { createContext, useState } from "react";

type CorePromptContextType = {
    corePrompt: string;
    SetCorePrompt: (result: string) => void;
};

export const CorePromptContext = createContext<CorePromptContextType | undefined>(undefined);

export default function CorePromptProvider({ children }: { children: React.ReactNode }) {
    const defaultCorePrompt = process.env.NEXT_PUBLIC_SYSTEM_PROMPT;
    const [corePrompt, SetCorePrompt] = useState(defaultCorePrompt ?? "");
    return <CorePromptContext.Provider value={{ corePrompt, SetCorePrompt }}>{children}</CorePromptContext.Provider>;
}