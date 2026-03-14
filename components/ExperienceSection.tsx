"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EXPERIENCES = [
    {
        company: "Personal Projects / Freelance",
        role: "Full-Stack Developer",
        date: "2024 — Present",
        current: true,
        bullets: [
            "Architected and deployed a highly scalable Quiz Management System using Spring Boot and React.",
            "Implemented secure OAuth2 integrations and advanced rate limiting using Redis.",
            "Containerized multiple services using Docker, improving deployment reliability by 40%.",
        ],
    },
    {
        company: "ScienceHindi360 & Beyond Belief Space",
        role: "Content Creator & Developer",
        date: "2022 — Present",
        current: false,
        bullets: [
            "Grew educational YouTube channels to a combined audience, leveraging AI tools for script generation and video production.",
            "Built custom automation scripts and landing pages to support channel workflows.",
            "Distilled complex astrophysics concepts into accessible Hindi and English content.",
        ],
    },
    {
        company: "Lovely Professional University",
        role: "B.E. Computer Science Student",
        date: "2022 — 2026",
        current: false,
        bullets: [
            "Focusing on System Design, Data Structures, and Cloud Computing.",
            "Led a team of 4 in developing a campus-wide inventory tracking application.",
            "Active member of the open-source engineering club, mentoring junior students in React.",
        ],
    },
];

function TimelineItem({ exp, index }: { exp: any; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div className="relative pl-8 md:pl-0 w-full" ref={ref}>
            {/* Desktop timeline node */}
            <div className="hidden md:block absolute left-1/2 -ml-[5px] top-6 z-10">
                {exp.current ? (
                    <div className="relative flex h-3 w-3 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-700 border-2 border-zinc-950" />
                )}
            </div>

            {/* Mobile timeline node */}
            <div className="md:hidden absolute left-[-5px] top-6 z-10">
                {exp.current ? (
                    <div className="relative flex h-3 w-3 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                ) : (
                    <div className="h-2.5 w-2.5 rounded-full bg-zinc-700 border-2 border-bg" />
                )}
            </div>

            {/* Content Card container - desktop alternates sides, mobile always right */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:mr-auto" : "md:pl-12 md:ml-auto"}`}>
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 && typeof window !== "undefined" && window.innerWidth >= 768 ? -40 : 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="glass rounded-2xl p-6 md:p-8 border border-white/5 shadow-xl hover:border-emerald-500/20 transition-colors group relative"
                >
                    {/* Subtle glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent rounded-2xl transition-colors pointer-events-none" />

                    <h3 className="text-xl md:text-2xl font-bold font-geist text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {exp.company}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 mb-6">
                        <span className="font-mono text-sm text-emerald-400 tracking-tight">{exp.role}</span>
                        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">{exp.date}</span>
                    </div>
                    <ul className="space-y-3">
                        {exp.bullets.map((bullet: string, i: number) => (
                            <li key={i} className="text-sm font-inter text-zinc-400 leading-relaxed flex items-start gap-3">
                                <span className="text-emerald-500/50 mt-1 flex-shrink-0">▹</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div >
    );
}

export default function ExperienceSection() {
    return (
        <section id="experience" className="section-pad relative w-full overflow-hidden">
            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-20 md:text-center">
                    <span className="font-mono text-sm text-emerald-400 tracking-widest uppercase">The Journey</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold font-geist">
                        My <span className="text-zinc-600">Experience</span>
                    </h2>
                </div>

                <div className="relative">
                    {/* Center line (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-[0.5px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

                    {/* Left line (Mobile) */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />

                    <div className="flex flex-col gap-12 md:gap-24 relative z-10 py-10">
                        {EXPERIENCES.map((exp, i) => (
                            <TimelineItem key={i} exp={exp} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
