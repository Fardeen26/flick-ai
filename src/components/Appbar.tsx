import Image from "next/image";
import Link from "next/link";

export default function Appbar() {
    return (
        <header>
            <h1>
                <Link href="/">
                    <Image src="/next.svg" alt="logo" width={100} height={100} />
                </Link>
            </h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    )
}