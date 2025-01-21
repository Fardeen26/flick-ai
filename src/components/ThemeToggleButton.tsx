"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
    const { setTheme } = useTheme()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className="p-0">
            <Button variant='outline' className="border-none outline-none !p-0 hover:bg-transparent hover:scale-110 transition-all duration-300">
                <Sun className="w-4 h-4 p-0 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute w-4 h-4 p-0 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}