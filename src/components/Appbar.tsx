import Image from "next/image";
import Link from "next/link";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { GiWireframeGlobe } from "react-icons/gi";

export default function Appbar() {
    return (
        <header className="w-full p-2 mt-4 rounded-lg px-12">
            <nav className="flex items-center justify-between">
                <h1>
                    <Link href="/">
                        <Image src="/vercel.svg" alt="logo" width={15} height={15} />
                    </Link>
                </h1>

                <ul className="flex gap-4">
                    <li>
                        <Link href="/">
                            <FaSquareXTwitter className="w-4 h-4 hover:scale-110 transition-all duration-300" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <GiWireframeGlobe className="w-4 h-4 hover:scale-110 transition-all duration-300" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/about">
                            <FaGithub className="w-4 h-4 hover:scale-110 transition-all duration-300" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}