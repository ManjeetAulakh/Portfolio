"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const BIO_CODE = `/**
 * @author  Manjeet Singh
 * @role    Full-Stack Developer
 * @stack   Java · Spring Boot · React
 * @passion Building & teaching
 */

const manjeet = {
  location: "Jalandhar, Punjab, India",
  education: "B.E. @ LPU (2022–2026)",
  skills:    ["Java", "Spring Boot", "React", "AWS"],
  channels:  ["ScienceHindi360", "BeyondBeliefSpace"],
  motto:     "Build things that matter.",
};`;

const STATUS_PILLS = [
    { label: "Open to Work", color: "bg-green-500/10 text-green-400 border-green-500/20", dot: "bg-green-400" },
    { label: "Building ScienceHindi360", color: "bg-violet-500/10 text-violet-400 border-violet-500/20", dot: "bg-violet-400" },
    { label: "Learning AWS", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20", dot: "bg-cyan-400" },
];

function TerminalCard() {
    const [displayText, setDisplayText] = useState("");
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView && !started) {
            setStarted(true);
            let i = 0;
            const interval = setInterval(() => {
                setDisplayText(BIO_CODE.slice(0, i + 1));
                i++;
                if (i >= BIO_CODE.length) clearInterval(interval);
            }, 18);
            return () => clearInterval(interval);
        }
    }, [inView, started]);

    return (
        <div ref={ref} className="glass rounded-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-surface-2/60">
                <span className="w-3 h-3 rounded-full bg-red-400/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <span className="w-3 h-3 rounded-full bg-green-400/80" />
                <span className="ml-3 font-mono text-xs text-slate-500">about.ts</span>
            </div>
            {/* Code body */}
            <div className="p-5 min-h-[280px]">
                <pre className="font-mono text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
                    <span className="text-slate-500">{displayText.split("\n").map((line, i) => {
                        const lineNum = String(i + 1).padStart(2, " ");
                        const colored = line
                            .replace(/(@\w+)/g, '<span class="text-violet-400">$1</span>')
                            .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
                            .replace(/(\/\*\*|@|\*\/|\*)/g, '<span class="text-slate-500">$1</span>')
                            .replace(/(\bconst\b|\blet\b|\bvar\b)/g, '<span class="text-violet-400">$1</span>');
                        return (
                            <span key={i} className="flex">
                                <span className="text-slate-600 select-none w-6 mr-4 text-right shrink-0">{lineNum}</span>
                                <span dangerouslySetInnerHTML={{ __html: colored }} />
                            </span>
                        );
                    })}</span>
                    <span className="animate-blink text-violet-400">|</span>
                </pre>
            </div>
        </div>
    );
}

export default function AboutSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="about" className="section-pad">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    ref={ref}
                    className="mb-16 text-center"
                >
                    <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Who I Am</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold">
                        About <span className="gradient-text">Me</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT: Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <TerminalCard />
                    </motion.div>

                    {/* RIGHT: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="space-y-5 text-slate-400 text-base leading-relaxed">
                            <p>
                                Hey! I&apos;m <span className="text-white font-semibold">Manjeet Singh</span> — a Full-Stack Developer
                                pursuing my B.E. at Lovely Professional University. I build robust backends with{" "}
                                <span className="text-violet-400">Java & Spring Boot</span> and sleek frontends with{" "}
                                <span className="text-cyan-400">React</span>.
                            </p>
                            <p>
                                Beyond code, I run two YouTube channels —{" "}
                                <span className="text-white font-medium">ScienceHindi360</span> and{" "}
                                <span className="text-white font-medium">Beyond Belief Space</span> — where I use AI tools to bring
                                space science to life for audiences in Hindi and English.
                            </p>
                            <p>
                                I believe great software is both{" "}
                                <span className="text-violet-400">technically sound</span> and{" "}
                                <span className="text-cyan-400">visually stunning</span> — whether it&apos;s a REST API or a video about black holes.
                            </p>
                        </div>

                        {/* Status Pills */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {STATUS_PILLS.map((pill) => (
                                <span
                                    key={pill.label}
                                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${pill.color}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${pill.dot} animate-pulse`} />
                                    {pill.label}
                                </span>
                            ))}
                        </div>

                        {/* Quick links */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://www.linkedin.com/in/manjeetsingh0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-900/30 transition-all hover:-translate-y-0.5"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="#contact"
                                className="px-5 py-2.5 rounded-full text-sm font-semibold border border-white/10 text-slate-300 hover:border-violet-500/40 hover:text-white transition-all"
                            >
                                Reach Out →
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
