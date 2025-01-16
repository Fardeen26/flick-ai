"use client"

import { createContext, useState } from "react";

type TweetContextType = {
    tweet: string;
    setTweet: (tweet: string) => void;
};

export const TweetContext = createContext<TweetContextType | undefined>(undefined);

export default function TweetProvider({ children }:
    { children: React.ReactNode }
) {
    const [tweet, setTweet] = useState('');
    return <TweetContext.Provider value={{ tweet, setTweet }}>
        {children}
    </TweetContext.Provider>;
};