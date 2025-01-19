"use client"

import { useState, useRef } from "react";
import axios from "axios";
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

export default function Main() {
    const [improvePrompt, setImprovePrompt] = useState('');
    const moodRef = useRef('Casual');
    const actionRef = useRef('Formatting');
    const [isImprovingField, setIsImprovingField] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { tweet, setTweet } = useTweet();
    const { result, setResult } = useResult();

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleGenerate = async () => {
        const response = await axios.post('/api/generate', { tweet, mood: moodRef.current, action: actionRef.current });
        console.log(response.data.text);
        setResult(response.data.text);
    }

    const handleRegenerate = async () => {
        if (!isImprovingField && !improvePrompt) {
            setIsImprovingField(true);
            return;
        };
        if (isImprovingField && !improvePrompt) {
            console.log("improvePrompt", improvePrompt);
            setIsImprovingField(false);
            return;
        }
        const response = await axios.post('/api/improve', { result, mood: moodRef.current, action: actionRef.current, improvePrompt, tweet });
        setResult(response.data.text);
        setImprovePrompt('');
        setIsImprovingField(false);
    }

    const copyToClipboard = () => {
        if (!result) return;
        navigator.clipboard.writeText(result);
    };

    return (
        <main>
            <div className="w-[60vw] relative pt-6 pb-2 px-4 bg-white rounded-xl bg-opacity-10 backdrop-blur-lg border border-white/20 flex flex-col items-center justify-center dark:shadow-none shadow">
                <Textarea
                    ref={textareaRef}
                    value={tweet}
                    onChange={(e) => {
                        setTweet(e.target.value);
                        adjustTextareaHeight();
                    }}
                    placeholder="Paste your tweet"
                    className="h-fit text-white w-full bg-transparent focus:outline-none focus:border-none max-h-[300px]"
                    rows={1}
                />

                <div className="flex justify-between items-end w-full mt-6">
                    <div className="flex gap-3">
                        <div>
                            <Select onValueChange={(value: string) => {
                                moodRef.current = value;
                            }}>
                                <SelectTrigger className="w-[95px] hover:bg-white/10 transition-all duration-300 text-xs bg-transparent rounded-lg before:bg-opacity-90 backdrop-blur-lg border border-white/20 text-white p-2">
                                    <SelectValue placeholder="Casual" />
                                </SelectTrigger>
                                <SelectContent>
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
                                <SelectTrigger className="w-[100px] hover:bg-white/10 transition-all duration-300 text-xs bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-white/20 text-white p-2">
                                    <SelectValue placeholder="Formatting" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Formatting">Formatting</SelectItem>
                                    <SelectItem value="Improving">Improving</SelectItem>
                                    <SelectItem value="Correcting">Correcting</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>
                    <div>
                        <button className="bg-transparent rounded-lg before:bg-opacity-5 hover:bg-white/10 transition-all duration-300 backdrop-blur-lg border border-white/20 text-white p-2" onClick={handleGenerate}>
                            <FaTurnUp className="text-xs" />
                        </button>
                    </div>
                </div>
            </div>
            <Result improvePrompt={improvePrompt} isImprovingField={isImprovingField} setImprovePrompt={setImprovePrompt} handleRegenerate={handleRegenerate} copyToClipboard={copyToClipboard} />
        </main>
    )
}