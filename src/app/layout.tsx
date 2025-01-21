import type { Metadata } from "next";
import Appbar from "@/components/Appbar";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import BackgroundImage from "@/components/BackgroundImage";
import { Toaster } from 'sonner'

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "flick.ai",
  description: "Refine your tweet with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage_grotesque_init.className} antialiased bg-transparent relative`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundImage />
          <div className="flex justify-center">
            <Appbar />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
