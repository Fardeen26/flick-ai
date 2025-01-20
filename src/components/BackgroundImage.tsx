"use client"

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function BackgroundImage() {
    const { theme } = useTheme()
    const [background, setBackground] = useState('/g23.png');

    useEffect(() => {
        setBackground(theme == 'dark' ? '/g23.png' : '/g22.png')
    }, [theme])

    return (
        <Image
            src={background}
            alt=""
            width={500}
            height={1000}
            className="absolute object-cover inset-0 size-full opacity-40 -z-50 h-screen"
            priority
        />
    )
}