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

function TerminalCard() {
    const [text, setText] = useState("");
    const fullText = `> Init engineer...
> Loading modules...
> [ok] React, Next.js, Spring Boot
> [ok] System Architecture
> Status: Ready to build.`;

    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let i = 0;
        const timer = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(timer);
        }, 40);
        return () => clearInterval(timer);
    }, [inView, fullText]);

    // Simple tilt on mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-[480px] rounded-xl overflow-hidden glass shadow-2xl shadow-black/60 transition-transform duration-200 ease-out will-change-transform border border-white/5"
        >
            <div className="h-10 bg-zinc-900/80 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <div className="ml-auto text-xs font-mono text-zinc-500">manjeet ~ bash</div>
            </div>
            <div className="p-6 h-[240px] bg-zinc-950/80 text-sm font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {text}
                <span className="animate-blink text-emerald-400">_</span>
            </div>
        </div>
    );
}

export default function HeroSection() {
    const line1 = "Precise software".split(" ");
    const line2 = "engineered to scale.".split(" ");

    return (
        <section className="relative min-h-[100svh] flex items-center pt-24 overflow-hidden">
            {/* Background radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
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

                    <h1 className="text-6xl md:text-8xl font-geist font-bold tracking-tighter leading-[1.1]">
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

                {/* Right Column (Terminal) */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="hidden lg:flex justify-end perspective-1000"
                >
                    <TerminalCard />
                </motion.div>
            </div>
        </section>
    );
}
