"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Scroll detection
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Intersection Observer for active section
    useEffect(() => {
        const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`fixed top-0 left-0 right-0 z-[8000] h-[60px] flex items-center px-6 lg:px-10 transition-all duration-300 ${scrolled
                        ? "border-b border-border backdrop-blur-xl bg-bg/80"
                        : "bg-transparent"
                    }`}
            >
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="group flex items-center gap-0.5 font-mono text-sm tracking-tight hover:animate-glitch"
                    data-cursor="button"
                >
                    <span className="text-accent">&lt;</span>
                    <span className="text-zinc-100 font-semibold">M.Singh</span>
                    <span className="text-accent">/&gt;</span>
                </button>

                {/* Center nav links — desktop */}
                <div className="hidden md:flex items-center gap-1 mx-auto">
                    {NAV_LINKS.map((link) => {
                        const isActive = activeSection === link.href.replace("#", "");
                        return (
                            <button
                                key={link.href}
                                onClick={() => scrollTo(link.href)}
                                className="relative px-3 py-2 font-mono text-xs tracking-wide text-zinc-400 hover:text-zinc-100 transition-colors group"
                                data-cursor="button"
                            >
                                {/* Bracket hover effect */}
                                <span className="absolute left-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-accent transition-opacity duration-200">
                                    [
                                </span>
                                {link.label}
                                <span className="absolute right-0.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-accent transition-opacity duration-200">
                                    ]
                                </span>
                                {/* Active dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active-dot"
                                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-3 ml-auto">
                    {/* Status pill */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-bg-surface/50 text-xs font-mono text-zinc-500">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        Available for work
                    </div>
                    {/* Contact CTA */}
                    <button
                        onClick={() => scrollTo("#contact")}
                        className="px-4 py-1.5 rounded-md border border-border hover:border-accent/40 text-xs font-mono text-zinc-300 hover:text-accent transition-all"
                        data-cursor="button"
                    >
                        Contact
                    </button>
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden ml-auto p-2 text-zinc-400 hover:text-zinc-100"
                    data-cursor="button"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[7999] bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <motion.button
                                key={link.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: i * 0.08 }}
                                onClick={() => scrollTo(link.href)}
                                className="font-mono text-2xl text-zinc-300 hover:text-accent transition-colors"
                                data-cursor="button"
                            >
                                <span className="text-accent mr-2 text-lg">0{i + 1}.</span>
                                {link.label}
                            </motion.button>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-600"
                        >
                            <Sparkles size={12} className="text-accent" />
                            Available for work
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
