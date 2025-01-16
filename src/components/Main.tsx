"use client"

import { useState, useRef } from "react";
import axios from "axios";
import { FaTurnUp } from "react-icons/fa6";
import { IoMdCopy } from "react-icons/io";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import TypeWriter from './TypeWriter';
import { useTweet } from "@/hooks/useTweet";

export default function Main() {
    const [mood, setMood] = useState('Casual');
    const [action, setAction] = useState('Formatting');
    const [result, setResult] = useState('');
    const [improvePrompt, setImprovePrompt] = useState('');
    const [isImprovingField, setIsImprovingField] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { tweet, setTweet } = useTweet();

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleGenerate = async () => {
        const response = await axios.post('/api/generate', { tweet, mood, action });
        console.log(response.data.text);
        setResult(response.data.text);
    }

    const handleRegenerate = async () => {
        if (!improvePrompt) {
            setIsImprovingField(true);
            return;
        };
        if (!improvePrompt && isImprovingField) {
            setIsImprovingField(false);
            return;
        }
        const response = await axios.post('/api/improve', { result, mood, action, improvePrompt, tweet });
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
                                setMood(value);
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
                                setAction(value);
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
            <div className={`flex flex-col gap-2 w-[60vw] mt-6 p-3 ${result ? 'block' : 'hidden'}`}>
                <div className="flex justify-end gap-2 relative" >
                    <input
                        type="text"
                        onChange={(e) => setImprovePrompt(e.target.value)}
                        value={improvePrompt}
                        className={`text-white w-0 transition-all duration-300 ${isImprovingField ? 'w-[30vw] px-2' : 'w-0'} bg-white rounded-lg bg-opacity-10 backdrop-blur-lg border border-white/20 focus:outline-none focus:border-none`}
                    />
                    <button onClick={handleRegenerate} className="bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-white/20 text-white p-2">
                        <Image src="/spark.png" alt="refresh" width={15} height={15} />
                    </button>
                    <button onClick={copyToClipboard} className={`bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-white/20 text-white p-2 ${result ? 'block' : 'hidden'}`}>
                        <IoMdCopy />
                    </button>
                </div>

                <div className="text-white w-full mt-3">
                    <TypeWriter text={result} speed={30} />
                </div>
            </div>

        </main>
    )
}