"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Github, ChevronDown } from "lucide-react";

// ── Role cycler titles ──
const ROLES = [
    "Full-Stack Engineer",
    "Backend Architect",
    "System Designer",
    "Problem Solver",
];

// ── Stat data ──
const STATS = [
    { value: 10, suffix: "+", label: "Projects Built" },
    { value: 15, suffix: "+", label: "Technologies" },
    { value: 3, suffix: "+", label: "Years Coding" },
];

// ── Counter hook ──
function useCounter(target: number, duration: number = 2000, start: boolean = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number;
        let raf: number;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);
    return count;
}

// ── Role Cycler ──
function RoleCycler() {
    const [index, setIndex] = useState(0);
    const [flipping, setFlipping] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlipping(true);
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % ROLES.length);
                setFlipping(false);
            }, 300);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-1 font-mono text-accent text-lg md:text-xl h-8 overflow-hidden">
            <span className="text-zinc-600">&gt;</span>
            <div className="relative" style={{ perspective: "600px" }}>
                <span
                    className={`inline-block transition-transform duration-300 ${flipping ? "animate-flip-out" : "animate-flip-in"
                        }`}
                >
                    {ROLES[index]}
                </span>
            </div>
            <span className="animate-blink text-accent">_</span>
        </div>
    );
}

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />
            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.04] blur-[120px]" />

            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="relative z-10 max-w-4xl mx-auto px-6 text-center"
            >
                {/* Eyebrow */}
                <motion.p
                    variants={itemVariants}
                    className="font-mono text-xs md:text-sm text-zinc-500 tracking-widest mb-6"
                >
                    <span className="text-zinc-700">{'// '}</span>
                    software engineer & builder
                </motion.p>

                {/* Name heading */}
                <motion.h1 variants={itemVariants} className="mb-4">
                    <span className="block text-5xl md:text-7xl lg:text-8xl font-geist font-bold tracking-tight text-zinc-100">
                        Manjeet
                    </span>
                    <span className="block text-5xl md:text-7xl lg:text-8xl font-geist font-bold tracking-tight text-stroke">
                        Singh
                    </span>
                </motion.h1>

                {/* Role cycler */}
                <motion.div variants={itemVariants} className="mb-5 flex justify-center">
                    <RoleCycler />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    variants={itemVariants}
                    className="text-zinc-500 text-base md:text-lg max-w-lg mx-auto mb-10 font-inter leading-relaxed"
                >
                    Building precise, performant software experiences — from robust backends to
                    polished interfaces.
                </motion.p>

                {/* Buttons */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-14">
                    <button
                        onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                        className="group relative px-6 py-3 rounded-lg bg-accent text-bg-surface font-mono text-sm font-semibold overflow-hidden hover:shadow-lg hover:shadow-accent/20 transition-shadow"
                        data-cursor="button"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                        {/* Sweep overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </button>
                    <a
                        href="https://github.com/manjeetsingh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-3 rounded-lg border border-border hover:border-accent/30 font-mono text-sm text-zinc-300 hover:text-accent transition-all"
                        data-cursor="button"
                    >
                        <span className="flex items-center gap-2">
                            <Github size={16} /> GitHub
                        </span>
                    </a>
                </motion.div>

                {/* Stat counters */}
                <motion.div variants={itemVariants} className="flex items-center justify-center gap-0">
                    {STATS.map((stat, i) => (
                        <div key={stat.label} className="flex items-center">
                            {i > 0 && <div className="w-px h-10 bg-border mx-8 md:mx-12" />}
                            <div className="text-center">
                                <StatCounter target={stat.value} suffix={stat.suffix} start={inView} />
                                <p className="font-mono text-[10px] md:text-xs text-zinc-600 tracking-wide uppercase mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 flex flex-col items-center gap-2 text-zinc-600"
                >
                    <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
                    <ChevronDown size={16} className="animate-bounce" />
                </motion.div>
            </motion.div>
        </section>
    );
}

function StatCounter({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
    const count = useCounter(target, 2000, start);
    return (
        <span className="text-3xl md:text-4xl font-geist font-bold text-zinc-100">
            {count}
            <span className="text-accent">{suffix}</span>
        </span>
    );
}
