'use client';

import useTweet from "@/hooks/useTweet";
import { samples } from "../constants/smaples";
import { FiArrowUpRight } from "react-icons/fi";
import useResult from "@/hooks/useResult";

export default function Samples() {
    const { setTweet } = useTweet();
    const { result } = useResult();
    return (
        <section className={`mt-3 ${result ? 'hidden' : 'block'}`}>
            <div className="flex gap-5">
                {samples.map((sample, index) => (
                    <button key={index} className="flex items-center gap-2 hover:bg-white/10 transition-all duration-300 bg-transparent rounded-full before:bg-opacity-5 backdrop-blur-lg border border-white/20 text-white p-1" onClick={() => setTweet(sample)}>
                        <span className="text-xs font-semibold">
                            {sample}
                        </span>
                        <span>
                            <FiArrowUpRight />
                        </span>
                    </button>
                ))}
            </div>
        </section>
    )
}