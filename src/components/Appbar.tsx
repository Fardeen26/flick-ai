import Image from "next/image";
import Link from "next/link";

export default function Appbar() {
    return (
        <header className="bg-white text-black w-[50vw] p-4 mt-6 rounded-lg">
            <nav className="flex items-center justify-between">
                <h1>
                    <Link href="/">
                        <Image src="/next.svg" alt="logo" width={100} height={100} />
                    </Link>
                </h1>

                <ul className="flex gap-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/about">Developer</Link></li>
                </ul>
            </nav>
        </header>
    )
}