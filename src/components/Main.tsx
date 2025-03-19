"use client"

import { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { FaTurnUp } from "react-icons/fa6";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea";
import useTweet from "@/hooks/useTweet";
import Result from "./Result";
import useResult from "@/hooks/useResult";
import { HiStop } from "react-icons/hi2";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useUsageTracker } from "@/hooks/useUsageTracker";
import { ApiResponse } from "@/types/ApiResponse";
import LoginModal from "./LoginModel";
import { useRouter } from "next/navigation";

export default function Main() {
    const [improvePrompt, setImprovePrompt] = useState('');
    const [isImprovingField, setIsImprovingField] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const moodRef = useRef('Casual');
    const actionRef = useRef('Formatting');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { tweet, setTweet } = useTweet();
    const { result, setResult } = useResult();
    const { incrementUsage, isLimitReached, resetUsage } = useUsageTracker();
    const { data: session } = useSession();
    const router = useRouter()

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleGenerate = async () => {
        if (!session && isLimitReached) {
            setShowLoginModal(true);
            return;
        }

        setIsGenerating(true);
        try {
            const response = await axios.post<ApiResponse>('/api/generate', { tweet, mood: moodRef.current, action: actionRef.current });
            incrementUsage();
            setResult(response.data.message);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? 'Failed to refine the tweet')
        } finally {
            setIsGenerating(false);
        }
    }

    const handleRegenerate = async () => {
        if (!isImprovingField && !improvePrompt) {
            setIsImprovingField(true);
            return;
        };
        if (isImprovingField && !improvePrompt) {
            setIsImprovingField(false);
            return;
        }
        setIsGenerating(true);
        try {
            const response = await axios.post<ApiResponse>('/api/improve', { tweet, result, improvePrompt });
            setResult(response.data.message);
            setImprovePrompt('');
            setIsImprovingField(false);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? 'Failed to refine the tweet')
        } finally {
            setIsGenerating(false);
        }
    }

    const saveInteraction = async () => {
        try {
            const response = await axios.post<ApiResponse>('/api/interaction/save', { tweet, mood: moodRef.current, action: actionRef.current, result })
            toast.success(response.data.message)
            router.refresh()
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message ?? 'Failed to save interaction')
        }
    }

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
        toast.success('Text copied to clipboard')
    };

    useEffect(() => {
        if (session) {
            resetUsage();
        }
    }, [session, resetUsage]);

    return (
        <main className="max-sm:w-full max-sm:px-2">
            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} showLoginModal={showLoginModal} />}
            <div className="w-[60vw] max-lg:w-[80vw] max-sm:w-full relative pt-6 pb-2 px-4 rounded-xl dark:border-white/20 border-black/40 bg-white bg-opacity-10 backdrop-blur-xl border flex flex-col items-center justify-center dark:shadow-none shadow-none z-50">
                <Textarea
                    ref={textareaRef}
                    value={tweet}
                    onChange={(e) => {
                        setTweet(e.target.value);
                        adjustTextareaHeight();
                    }}
                    placeholder="Paste your tweet"
                    className="h-fit dark:text-white shadow-none w-full bg-transparent focus:outline-none focus:border-none max-h-[300px] max-sm:text-xs"
                    rows={1}
                />

                <div className="flex justify-between items-end w-full mt-6">
                    <div className="flex gap-3">
                        <div>
                            <Select onValueChange={(value: string) => {
                                moodRef.current = value;
                            }}>

                                

                                <SelectTrigger className="btn w-[97px] max-sm:w-[86px] max-sm:text-[10px] bg-[rgba(229,231,235,0.3)] dark:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-xs rounded-lg backdrop-blur-lg -webkit-backdrop-blur-lg border border-gray-400/50 dark:border-white/20 dark:text-white p-2 !text-center">
                                    <SelectValue placeholder="Casual" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-400 dark:text-white bg-opacity-20 backdrop-blur-lg border dark:border-white/10">
                                    <SelectItem value="light">Funny</SelectItem>
                                    <SelectItem value="Serious">Serious</SelectItem>
                                    <SelectItem value="Casual">Casual</SelectItem>
                                    <SelectItem value="Formal">Formal</SelectItem>
                                    <SelectItem value="Humorous">Humorous</SelectItem>
                                    <SelectItem value="Sarcastic">Sarcastic</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                        <div>
                            <Select onValueChange={(value: string) => {
                                actionRef.current = value;
                            }}>

                                <SelectTrigger className="btn w-[100px] max-sm:w-[90px] max-sm:text-[10px] bg-[rgba(229,231,235,0.3)] dark:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 text-xs rounded-lg backdrop-blur-lg -webkit-backdrop-blur-lg border border-gray-400/50 dark:border-white/20 dark:text-white p-2">
                                    <SelectValue placeholder="Formatting" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-400 dark:text-white bg-opacity-20 backdrop-blur-lg border dark:border-white/10">
                                    <SelectItem value="Formatting">Formatting</SelectItem>
                                    <SelectItem value="Improving">Improving</SelectItem>
                                    <SelectItem value="Correcting">Correcting</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                    <div>

                        <button className="btn bg-[rgba(229,231,235,0.3)] dark:bg-[rgba(0,0,0,0.05)] rounded-lg backdrop-blur-lg -webkit-backdrop-blur-lg border border-gray-400/50 dark:border-white/20 dark:text-white p-2 dark:hover:bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(0,0,0,0.05)]" onClick={handleGenerate} disabled={isGenerating}>
                            {isGenerating ? <HiStop className="text-xs animate-pulse" /> : <FaTurnUp className="text-xs" />}
                        </button>
                    </div>
                </div>
            </div>
            <Result improvePrompt={improvePrompt} isImprovingField={isImprovingField} setImprovePrompt={setImprovePrompt} handleRegenerate={handleRegenerate} copyToClipboard={copyToClipboard} saveInteraction={saveInteraction} />
        </main>
    )
}