import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GiWireframeGlobe } from "react-icons/gi";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Appbar() {
    return (
        <header className="w-full p-2 mt-4 rounded-lg px-12">
            <nav className="flex items-center justify-between">
                <h1>
                    <Link href="/" className={`font-extrabold text-xl tracking-tight`}>
                        Flick.AI
                    </Link>
                </h1>

                <ul className="flex gap-4 items-center">
                    <li>
                        <Link href="https://x.com/fardeen14693425">
                            <FaSquareXTwitter className="w-4 h-4 hover:scale-110 transition-all duration-300" />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://fardeen.tech/">
                            <GiWireframeGlobe className="w-4 h-4 hover:scale-110 transition-all duration-300" />
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/Fardeen26">
                            <FaGithub className="w-4 h-4 hover:scale-110 transition-all duration-300" />
                        </Link>
                    </li>
                    <li>
                        <ThemeToggleButton />
                    </li>
                </ul>
            </nav>
        </header>
    )
}