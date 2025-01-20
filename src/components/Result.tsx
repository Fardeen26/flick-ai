import { IoMdCopy } from "react-icons/io";
import TypeWriter from "./TypeWriter";
import useResult from "@/hooks/useResult";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { ShinyButton } from '@/components/ui/shiny-button'

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

                <ShinyButton onClick={handleRegenerate} className="p-3">
                    <FaWandMagicSparkles className="hover:scale-110" />
                </ShinyButton>
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