import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Manjeet Singh — Full-Stack Developer",
    description:
        "Portfolio of Manjeet Singh — Full-Stack Java & React Developer, YouTube Creator, and AI Enthusiast building innovative solutions.",
    keywords: [
        "Manjeet Singh",
        "Full-Stack Developer",
        "Java",
        "Spring Boot",
        "React",
        "Portfolio",
    ],
    authors: [{ name: "Manjeet Singh" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-bg text-slate-200 antialiased`}
            >
                <CustomCursor />
                {children}
            </body>
        </html>
    );
}
