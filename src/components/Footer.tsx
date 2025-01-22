"use client"

import Link from "next/link";
import fontInter from "@/app/font";
import useResult from "@/hooks/useResult";

export default function Footer() {
    const { result } = useResult()
    return (
        <footer className={`absolute bottom-8 w-full flex flex-col gap-2 items-center transition-all duration-300 ${result ? 'hidden' : ''}`}>
            <div className="">
                <ul className="flex gap-8 items-center dark:text-gray-400 text-sm">
                    <li>
                        <Link href="https://x.com/fardeen14693425">
                            Twitter
                        </Link>
                    </li>

                    <li className="list-disc">
                        <Link href="https://fardeen.tech/">
                            Developer
                        </Link>
                    </li>
                    <li className="list-disc">
                        <Link href="https://github.com/Fardeen26">
                            GitHub
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`${fontInter} text-xs text-gray-600`}>© 2025 Flick.AI from Fardeen</div>
        </footer>
    )
}