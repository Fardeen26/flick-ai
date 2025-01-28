"use client"

import React, { useRef } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { corePromptPlaceholder } from '@/constants/corePromptInputPlaceholder';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

export default function CorePromptForm() {
    const promptRef = useRef<HTMLTextAreaElement>(null);

    const saveCorePrompt = async () => {
        if (!promptRef.current?.value) {
            toast.info('Provide the core prompt');
            return;
        }
        try {
            const response = await axios.post<ApiResponse>('/api/corePrompt/save', { corePrompt: promptRef.current?.value })
            toast.success(response.data.message);
            promptRef.current.value = '';
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? 'Failed to refine the tweet');
        }
    }

    return (
        <>
            <div>
                <h2 className="text-sm text-white">Add Core Prompt</h2>
                <p className="text-xs text-gray-300">This will determine how your tweet will be refined.</p>
            </div>
            <textarea ref={promptRef} className="text-xs w-full !p-2 rounded-sm !h-full focus:border-none focus:outline-none bg-gray-800" placeholder={corePromptPlaceholder} rows={7} />
            <Button onClick={saveCorePrompt} className="w-full text-sm h-8 bg-gray-100 text-black">Save</Button>
        </>
    )
}