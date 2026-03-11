"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiGithubLine, RiLinkedinLine, RiMailLine, RiArrowUpLine } from "react-icons/ri";

const socials = [
    { icon: <RiGithubLine size={18} />, href: "https://github.com/ManjeetAulakh", label: "GitHub" },
    { icon: <RiLinkedinLine size={18} />, href: "https://www.linkedin.com/in/manjeetsingh0/", label: "LinkedIn" },
    { icon: <RiMailLine size={18} />, href: "mailto:manjeetsingh.codes@gmail.com", label: "Email" },
];

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <footer className="border-t border-white/5 py-10 mt-8">
                {/* Gradient divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent mb-10" />

                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
                    {/* Social links */}
                    <div className="flex gap-4">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="p-2.5 glass rounded-lg text-slate-500 hover:text-white transition-colors"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>

                    {/* Credit */}
                    <p className="font-mono text-sm text-slate-600">
                        Designed & built by{" "}
                        <span className="text-violet-400">Manjeet Singh</span> · {new Date().getFullYear()}
                    </p>
                    <p className="font-mono text-xs text-slate-700">
                        Built with Next.js · Tailwind CSS · Framer Motion
                    </p>
                </div>
            </footer>

            {/* Back to top */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-violet-900/30 hover:shadow-violet-900/50"
                        aria-label="Back to top"
                    >
                        <RiArrowUpLine size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
