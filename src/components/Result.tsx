import { IoMdCopy } from "react-icons/io";
import TypeWriter from "./TypeWriter";
import useResult from "@/hooks/useResult";
import { FaWandMagicSparkles } from "react-icons/fa6";

type ResultProps = {
    improvePrompt: string;
    isImprovingField: boolean;
    setImprovePrompt: (improvePrompt: string) => void;
    handleRegenerate: () => void;
    copyToClipboard: () => void;
}

export default function Result({ improvePrompt, isImprovingField, setImprovePrompt, handleRegenerate, copyToClipboard }: ResultProps) {
    const { result } = useResult();
    return (
        <div className={`flex flex-col gap-2 w-[60vw] mt-6 py-3 ${result ? 'block' : 'hidden'}`}>
            <div className="flex justify-end gap-2 relative" >
                <input
                    type="text"
                    onChange={(e) => setImprovePrompt(e.target.value)}
                    value={improvePrompt}
                    className={`text-white text-xs w-0 transition-all duration-300 ${isImprovingField ? 'w-[35vw] px-2 border border-white/20' : 'w-0'} bg-white rounded-lg bg-opacity-10 backdrop-blur-lg focus:outline-none focus:border-white/20`}
                />
                <button
                    onClick={handleRegenerate}
                    className="relative bg-transparent rounded-lg p-2 text-white
                    before:absolute before:inset-0 before:rounded-lg before:p-[1px]
                    before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-indigo-500
                    before:animate-border-rotate before:content-['']
                    hover:before:bg-gradient-to-r hover:before:from-indigo-500 hover:before:via-purple-500 hover:before:to-indigo-500
                    after:absolute after:inset-[1px] after:rounded-lg after:bg-transparent after:content-['']
                    hover:after:bg-gradient-to-r hover:after:from-indigo-500/40 hover:after:to-purple-500/40
                    transition-all duration-300"
                >
                    <span className="relative z-10">
                        <FaWandMagicSparkles className="hover:scale-110" />
                    </span>
                </button>
                <button onClick={copyToClipboard} className={`bg-transparent rounded-lg before:bg-opacity-5 backdrop-blur-lg border border-white/20 text-white p-2 ${result ? 'block' : 'hidden'} hover:bg-white/10 transition-all duration-300`}>
                    <IoMdCopy />
                </button>
            </div>

            <div className="text-white w-full mt-3">
                <TypeWriter text={result} speed={30} />
            </div>
        </div>
    )
}