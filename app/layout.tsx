import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Manjeet Singh — Software Engineer",
    description:
        "Full-Stack Software Engineer. Building precise, performant digital products.",
    keywords: [
        "Software Engineer",
        "Full-Stack Developer",
        "React",
        "Spring Boot",
        "Java",
        "Portfolio",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={`dark ${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}
        >
            <body className="bg-bg text-zinc-100 font-inter antialiased overflow-x-hidden">
                <CustomCursor />
                <ScrollProgress />
                <NoiseOverlay />
                {children}
            </body>
        </html>
    );
}
