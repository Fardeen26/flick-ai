import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";


export default function Appbar() {
    return (
        <header className="w-full p-2 mt-4 rounded-lg px-12 max-sm:px-5">
            <nav className="flex items-center justify-between">
                <h1>
                    <Link href="/" className={`font-extrabold text-xl tracking-tight`}>
                        Flick.AI
                    </Link>
                </h1>

                <ul className="flex gap-4 items-end">
                    <li>
                        <ThemeToggleButton />
                    </li>
                </ul>
            </nav>
        </header>
    )
}