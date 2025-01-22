import type { Metadata } from "next";
import Appbar from "@/components/Appbar";
import { Bricolage_Grotesque } from "next/font/google";
import BackgroundImage from "@/components/BackgroundImage";
import { Toaster } from 'sonner'
import Footer from "@/components/Footer";
import Providers from "./Providers";
import "./globals.css";

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
        className={`${bricolage_grotesque_init.className} antialiased h-screen dark:bg-black bg-white relative`}
      >
        <Providers>
          <Toaster />
          <BackgroundImage />
          <div className="flex justify-center">
            <Appbar />
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
