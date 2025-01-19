'use client';

import { useContext } from 'react';
import { TweetContext } from "@/context/TweetContext";

export default function useTweet() {
    const context = useContext(TweetContext);

    if (!context) {
        throw new Error('useTweet must be used within a TweetProvider');
    }

    return context;
}