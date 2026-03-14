"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ROLES = [
    "Full-Stack Developer",
    "Creative Technologist",
    "Systems Architect",
    "Content Creator",
];

function RoleCycler() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % ROLES.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-8 overflow-hidden relative flex items-center mt-6">
            <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute text-emerald-400 font-mono text-xl md:text-2xl font-medium tracking-tight"
            >
                {ROLES[index]}
                <span className="animate-blink ml-1">_</span>
            </motion.div>
        </div>
    );
}

function StatCounter({ value, label, delay }: { value: number; label: string; delay: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const spring = useSpring(0, { bounce: 0, duration: 2000 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (inView) {
            setTimeout(() => spring.set(value), delay * 1000);
        }
    }, [inView, spring, value, delay]);

    useEffect(() => {
        return spring.on("change", (latest) => {
            setDisplay(Math.floor(latest));
        });
    }, [spring]);

    return (
        <div ref={ref} className="flex flex-col gap-1">
            <div className="text-4xl md:text-5xl font-geist font-bold text-zinc-100 flex items-baseline">
                {display}
                <span className="text-emerald-400 text-2xl ml-0.5">+</span>
            </div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function FloatingBadge({ children, className, delay = 0 }: { children: React.ReactNode, className: string, delay?: number }) {
    return (
        <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
            className={`absolute z-30 glass border border-white/10 px-4 py-2 rounded-lg backdrop-blur-md shadow-2xl flex items-center gap-2 ${className}`}
        >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-zinc-300">{children}</span>
        </motion.div>
    );
}

function ProfileCard() {
    return (
        <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px]">
            {/* Floating Tech Badges */}
            <FloatingBadge className="top-[10%] -left-[15%] md:-left-[25%]" delay={0.2}>
                Next.js
            </FloatingBadge>
            <FloatingBadge className="bottom-[30%] -right-[15%] md:-right-[25%]" delay={1.5}>
                Spring Boot
            </FloatingBadge>
            <FloatingBadge className="bottom-[5%] left-[5%] md:-left-[10%]" delay={2.8}>
                React
            </FloatingBadge>

            {/* Profile Image Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)] group transition-all duration-500 hover:shadow-[0_0_60px_rgba(16,185,129,0.3)] hover:border-emerald-500/40 z-10 bg-zinc-900">
                <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
                <img
                    src="/images/myprofilepic.JPG"
                    alt="Manjeet Singh"
                    className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                />
            </div>
        </div>
    );
}

export default function HeroSection() {
    const line1 = "Manjeet Singh,".split(" ");
    const line2 = "Software Engineer.".split(" ");

    return (
        <section className="relative min-h-[85svh] flex items-center pt-28 pb-16 overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 lg:items-start items-center relative z-10">
                {/* Left Column */}
                <div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-xs font-mono text-zinc-500 mb-6"
                    >
                        // software engineer & builder
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-geist font-bold tracking-tighter leading-[1.1]">
                        <div className="overflow-hidden flex flex-wrap gap-x-4">
                            {line1.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-white inline-block"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
                        <div className="overflow-hidden flex flex-wrap gap-x-4 mt-2">
                            {line2.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-transparent"
                                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </div>
                    </h1>

                    <RoleCycler />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-6 text-lg text-zinc-400 font-inter max-w-lg leading-relaxed"
                    >
                        I build resilient backend architectures and highly polished digital experiences that wow users.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <a
                            href="#projects"
                            className="px-6 py-3 rounded-full font-medium bg-emerald-500 text-zinc-950 hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                        >
                            View Projects
                        </a>
                        <a
                            href="https://github.com/manjeetsingh"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-full font-medium border border-zinc-700 text-zinc-300 hover:text-white hover:border-emerald-500/50 transition-colors"
                        >
                            GitHub Profile
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="mt-16 flex items-center gap-8 md:gap-12"
                    >
                        <StatCounter value={15} label="Projects Built" delay={1.4} />
                        <div className="w-px h-12 bg-zinc-800" />
                        <StatCounter value={10} label="Technologies" delay={1.5} />
                        <div className="w-px h-12 bg-zinc-800" />
                        <StatCounter value={4} label="Years Coding" delay={1.6} />
                    </motion.div>
                </div>

                {/* Right Column (Profile Image) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 lg:mt-10 xl:mt-12 flex items-center justify-center lg:justify-center"
                >
                    <ProfileCard />
                </motion.div>
            </div>
        </section>
    );
}
