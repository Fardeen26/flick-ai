"use client"

import { useContext } from "react";
import { ResultContext } from "@/context/ResultContext";

export default function useResult() {
    const context = useContext(ResultContext);
    if (!context) {
        throw new Error('useResult must be used within a ResultProvider');
    }
    return context;
}
