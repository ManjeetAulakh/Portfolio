"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LINKS = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Stack", href: "#stack" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section tracking
            const sections = document.querySelectorAll("section[id]");
            let current = "";
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute("id") || "";
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 inset-x-0 z-50 h-16 flex items-center transition-all duration-300 ${scrolled
                    ? "bg-zinc-950/80 backdrop-blur-md border-b border-white/5"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        className="font-geist font-bold text-lg text-zinc-200 hover:text-white transition-colors tracking-tight"
                        data-cursor="button"
                    >
                        Manjeet.
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors ${activeSection === link.href.substring(1)
                                    ? "text-emerald-400"
                                    : "text-zinc-400 hover:text-zinc-200"
                                    }`}
                                data-cursor="button"
                            >
                                {link.name}
                                {activeSection === link.href.substring(1) && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-400"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Right CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Available for work
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-[60]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[1.5px] bg-zinc-300 block transition-transform"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-5 h-[1.5px] bg-zinc-300 block"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="w-5 h-[1.5px] bg-zinc-300 block transition-transform"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Overlay */}
            <motion.div
                initial={false}
                animate={mobileMenuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
                className="fixed inset-0 z-[55] bg-zinc-950/95 backdrop-blur flex flex-col items-center justify-center gap-8 md:hidden"
            >
                {LINKS.map((link, i) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: mobileMenuOpen ? 0.1 * i : 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-3xl font-geist font-bold text-zinc-300 hover:text-emerald-400 transition-colors"
                    >
                        {link.name}
                    </motion.a>
                ))}
            </motion.div>
        </>
    );
}
