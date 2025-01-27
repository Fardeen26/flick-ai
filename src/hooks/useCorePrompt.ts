"use client"

import { useContext } from "react";
import { CorePromptContext } from "@/context/CorePromptContext";

export default function useCorePrompt() {
    const context = useContext(CorePromptContext);
    if (!context) {
        throw new Error('useResult must be used within a CorePromptProvider');
    }
    return context;
}
