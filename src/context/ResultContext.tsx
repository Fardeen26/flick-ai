"use client"

import { createContext, useState } from "react";

type ResultContextType = {
    result: string;
    setResult: (result: string) => void;
};

export const ResultContext = createContext<ResultContextType | undefined>(undefined);

export default function ResultProvider({ children }: { children: React.ReactNode }) {
    const [result, setResult] = useState('');
    return <ResultContext.Provider value={{ result, setResult }}>{children}</ResultContext.Provider>;
}