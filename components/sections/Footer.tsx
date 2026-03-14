"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";

const SOCIALS = [
    { icon: Github, href: "https://github.com/manjeetsingh", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/manjeetsingh0", label: "LinkedIn" },
    { icon: Mail, href: "mailto:manjeetsingh@example.com", label: "Email" },
    { icon: Twitter, href: "https://twitter.com/manjeetsingh", label: "Twitter" },
];

function LiveClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const update = () => {
            setTime(
                new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Kolkata",
                })
            );
        };
        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span className="font-mono text-[10px] text-zinc-700">{time} IST</span>;
}

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <footer className="border-t border-border">
                <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="font-mono text-xs text-zinc-500">
                        <span className="text-accent">&lt;</span>M.Singh<span className="text-accent">/&gt;</span>
                    </div>

                    {/* Built with */}
                    <p className="font-mono text-[10px] text-zinc-700 text-center">
                        Built with Next.js · TypeScript · Tailwind · Framer Motion
                    </p>

                    {/* Social + clock */}
                    <div className="flex items-center gap-3">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-zinc-700 hover:text-accent transition-colors"
                                data-cursor="button"
                                title={s.label}
                            >
                                <s.icon size={14} />
                            </a>
                        ))}
                        <div className="w-px h-3 bg-border mx-1" />
                        <LiveClock />
                    </div>
                </div>
            </footer>

            {/* Back to top */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-6 right-6 z-[7000] w-10 h-10 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-zinc-400 hover:text-accent hover:border-accent/30 transition-all shadow-lg shadow-black/30"
                        data-cursor="button"
                    >
                        <ArrowUp size={16} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
