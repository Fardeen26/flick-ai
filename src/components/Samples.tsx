import { samples } from "../constants/smaples";
import { FiArrowUpRight } from "react-icons/fi";

export default function Samples() {
    return (
        <section className="mt-3">
            <div className="flex gap-5">
                {samples.map((sample, index) => (
                    <button key={index} className="flex items-center gap-2 bg-transparent rounded-full before:bg-opacity-5 backdrop-blur-lg border border-white/20 text-white p-1">
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