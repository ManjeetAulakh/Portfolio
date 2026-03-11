"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative border-t border-white/5 bg-zinc-950 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left */}
                <div className="text-center md:text-left">
                    <div className="font-geist font-bold text-lg text-zinc-200">
                        Manjeet.
                    </div>
                    <div className="text-xs font-mono text-zinc-500 mt-1">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </div>
                </div>

                {/* Center */}
                <div className="text-xs font-mono text-zinc-600 text-center">
                    Built with <span className="text-zinc-400">Next.js</span>, <span className="text-zinc-400">Tailwind</span> & ☕
                </div>

                {/* Right (Socials) */}
                <div className="flex items-center gap-4">
                    <a href="https://github.com/manjeetsingh" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors p-2">
                        <Github size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/manjeetsingh0" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors p-2">
                        <Linkedin size={18} />
                    </a>
                    <a href="#" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors p-2">
                        <Twitter size={18} />
                    </a>
                    <a href="mailto:manjeetsingh@example.com" className="text-zinc-500 hover:text-emerald-400 transition-colors p-2">
                        <Mail size={18} />
                    </a>
                </div>
            </div>

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed right-6 bottom-6 md:right-10 md:bottom-10 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:-translate-y-1 transition-all shadow-xl z-50 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                    }`}
            >
                <ArrowUp size={20} />
            </button>
        </footer >
    );
}
