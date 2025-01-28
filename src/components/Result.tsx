import { IoMdCopy } from "react-icons/io";
import TypeWriter from "./TypeWriter";
import useResult from "@/hooks/useResult";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ShinyButton } from '@/components/ui/shiny-button'
import { FaHeart } from "react-icons/fa";
import { ResultProps } from "@/types/ResultProps";
import { RiTwitterXLine } from "react-icons/ri";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";


export default function Result({ improvePrompt, isImprovingField, setImprovePrompt, handleRegenerate, copyToClipboard, saveInteraction }: ResultProps) {
    const { result } = useResult();
    return (
        <section className={`flex flex-col gap-2 w-[60vw] max-sm:w-full bg-transparent border-none shadow-none mt-6 py-3 ${result ? 'block' : 'hidden'}`}>
            <div className="flex justify-end gap-2 relative">
                <input
                    type="text"
                    onChange={(e) => setImprovePrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleRegenerate();
                        }
                    }}
                    value={improvePrompt}
                    placeholder="Follow Up"
                    className={`dark:text-white bg-transparent text-xs w-0 py-0 transition-all duration-300 ${isImprovingField ? 'w-[35vw] max-sm:w-full px-2 border border-gray-400/50 dark:border-white/20' : 'w-0'} rounded-lg bg-opacity-10 backdrop-blur-lg dark:focus:outline-none dark:focus:border-white/20`}
                />

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <ShinyButton onClick={handleRegenerate} className="p-2 max-sm:p-2">
                                <FaWandMagicSparkles className="hover:scale-110" />
                            </ShinyButton>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Follow up</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <button onClick={saveInteraction} className="bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-gray-400/50 dark:border-white/20 dark:text-white p-2 max-sm:p-1 max-sm:px-1.5 hover:bg-white/10 transition-all duration-300">
                                <FaHeart className="w-3 h-3" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Save</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <Link href={`https://twitter.com/intent/tweet?text=${result}`} target="_blank">
                            <TooltipTrigger>
                                <button className="bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-gray-400/50 dark:border-white/20 dark:text-white p-2 max-sm:p-1 max-sm:px-1.5 hover:bg-white/10 transition-all duration-300">
                                    <RiTwitterXLine className="w-3 h-3" />
                                </button>
                            </TooltipTrigger>
                        </Link>
                        <TooltipContent>
                            <p>Share on X</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <button onClick={copyToClipboard} className="bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-gray-400/50 dark:border-white/20 dark:text-white p-2 max-sm:p-1 max-sm:px-1.5 hover:bg-white/10 transition-all duration-300">
                    <IoMdCopy className="w-3 h-3" />
                </button>
            </div>

            <div className="w-full mt-2">
                <TypeWriter text={result} speed={30} />
            </div>
        </section>
    )
}