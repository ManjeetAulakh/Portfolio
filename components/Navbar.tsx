"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = ["hero", "about", "skills", "projects", "experience", "contact"];
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: "-40% 0px -55% 0px" }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const handleNavClick = () => setMobileOpen(false);

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.07, duration: 0.4 },
        }),
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-bg/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#hero" className="font-mono text-xl font-bold tracking-tight">
                        M<span className="text-violet-400">.</span>Singh
                    </a>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 relative">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace("#", "");
                            return (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 text-slate-400 hover:text-white"
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-underline"
                                            className="absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-violet-500 to-cyan-400"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className={isActive ? "text-white" : ""}>{link.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA + Hamburger */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#contact"
                            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-200 shadow-lg shadow-violet-900/30"
                        >
                            Hire Me ✦
                        </a>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                custom={i}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                onClick={handleNavClick}
                                className="text-3xl font-bold text-slate-300 hover:text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-violet-400 hover:to-cyan-400 transition-all duration-200"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            custom={navLinks.length}
                            variants={linkVariants}
                            initial="hidden"
                            animate="visible"
                            onClick={handleNavClick}
                            className="mt-4 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg"
                        >
                            Hire Me ✦
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
