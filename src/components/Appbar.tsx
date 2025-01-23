import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import UsageCount from "./UsageCount";

export default function Appbar() {
    return (
        <header className="w-full p-2 mt-4 rounded-lg px-10 max-sm:px-5">
            <nav className="flex items-center justify-between">
                <h1>
                    <Link href="/" className={`font-extrabold text-xl tracking-tight`}>
                        Flick.AI
                    </Link>
                </h1>

                <ul className="flex gap-4 items-center">
                    <li>
                        <ThemeToggleButton />
                    </li>
                    <li>
                        <UsageCount />
                    </li>
                </ul>
            </nav>
        </header>
    )
}