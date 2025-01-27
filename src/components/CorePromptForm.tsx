"use client"

import React, { useRef } from 'react'
import { Button } from './ui/button'
import useCorePrompt from '@/hooks/useCorePrompt';
import { toast } from 'sonner';
import { corePromptPlaceholder } from '@/constants/corePromptInputPlaceholder';

export default function CorePromptForm() {
    const promptRef = useRef<HTMLTextAreaElement>(null);
    const { SetCorePrompt } = useCorePrompt();

    const saveCorePrompt = () => {
        if (!promptRef.current?.value) {
            toast.info('Provide a core prompt');
            return;
        }
        SetCorePrompt(promptRef.current?.value as string)
        toast.success("Core prompt saved")
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