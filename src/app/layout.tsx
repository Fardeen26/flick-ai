import type { Metadata } from "next";
import Appbar from "@/components/Appbar";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import BackgroundImage from "@/components/BackgroundImage";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Refiner",
  description: "Refine your text with AI",
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
