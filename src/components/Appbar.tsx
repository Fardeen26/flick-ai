import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import Profile from "./Profile";

export default function Appbar() {
    return (
        <header className="w-full p-1 mt-3 rounded-lg px-8 max-sm:px-5">
            <nav className="w-full flex items-center justify-between">
                <h1>
                    <Link href="/" className={`font-extrabold text-xl tracking-tight`}>
                        Flick.AI
                    </Link>
                </h1>

                <div className="flex items-center gap-4">
                    <ThemeToggleButton />
                    <Profile />
                </div>
            </nav>
        </header>
    )
}