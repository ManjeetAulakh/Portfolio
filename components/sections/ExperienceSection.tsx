"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

// ── Experience data — no YouTube/content creator references ──
const EXPERIENCE = [
    {
        type: "work" as const,
        hash: "a3f8d2e",
        company: "Personal Projects / Freelance",
        role: "Full-Stack Developer",
        dates: "2025 — Present",
        branch: "HEAD → main",
        achievements: [
            "Built Quiz Management System with Spring Boot + React, JWT auth, and attempt tracking.",
            "Developed Smart Contact Manager with OAuth2 (Google/GitHub), Thymeleaf UI.",
            "Implemented secure REST APIs, role-based access, PostgreSQL with JPA/Hibernate.",
            "Containerized services with Docker; improved deployment reliability.",
        ],
    },
    {
        type: "work" as const,
        hash: "b7c4e1f",
        company: "Side Projects",
        role: "Developer & Builder",
        dates: "2024 — 2025",
        branch: "feature/side-projects",
        achievements: [
            "Wrote unit/integration tests with JUnit and Mockito.",
            "Built tech blog platform with markdown support and comment system.",
            "Designed responsive frontends with React and Tailwind CSS.",
        ],
    },
    {
        type: "education" as const,
        hash: "c9d2a3b",
        company: "Lovely Professional University",
        role: "B.E. in Computer Science",
        dates: "2022 — 2026",
        branch: "origin/education",
        achievements: [
            "CGPA: 7.8 / 10",
        ],
    },
    {
        type: "education" as const,
        hash: "d4e5f6g",
        company: "Mother India Convent School",
        role: "Higher Secondary",
        dates: "2020 — 2021",
        branch: "origin/school",
        achievements: [
            "Grade: 70%",
        ],
    },
];

export default function ExperienceSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="experience" className="section-pad">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">Journey</span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-geist font-bold">
                        git <span className="text-stroke">log</span>
                    </h2>
                </motion.div>

                {/* Terminal prompt */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="mb-8 p-3 rounded-lg bg-bg-surface border border-border"
                >
                    <p className="font-mono text-[11px] text-zinc-500">
                        <span className="text-accent">~/career</span>
                        <span className="text-zinc-700"> $ </span>
                        <span className="text-zinc-300">git log --graph --oneline --all</span>
                    </p>
                </motion.div>

                {/* Git log graph */}
                <div className="relative">
                    {/* Vertical SVG line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />

                    <div className="space-y-6">
                        {EXPERIENCE.map((entry, i) => (
                            <motion.div
                                key={entry.hash}
                                initial={{ opacity: 0, x: -30 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + i * 0.12 }}
                                className="relative flex gap-4"
                            >
                                {/* Commit node */}
                                <div className="relative z-10 shrink-0 mt-1">
                                    <div
                                        className={`w-[38px] h-[38px] rounded-full border-2 flex items-center justify-center ${i === 0
                                                ? "border-accent bg-accent/20"
                                                : "border-border bg-bg-surface"
                                            }`}
                                    >
                                        {entry.type === "work" ? (
                                            <Briefcase size={14} className={i === 0 ? "text-accent" : "text-zinc-600"} />
                                        ) : (
                                            <GraduationCap size={14} className={i === 0 ? "text-accent" : "text-zinc-600"} />
                                        )}
                                    </div>
                                    {/* Pulsing ring for HEAD */}
                                    {i === 0 && (
                                        <div className="absolute inset-0 rounded-full border border-accent/40 animate-ping" />
                                    )}
                                </div>

                                {/* Commit card */}
                                <div className="flex-1 p-4 rounded-xl border border-border bg-bg-surface hover:border-accent/20 transition-colors">
                                    {/* Hash + branch */}
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <span className="font-mono text-xs text-accent">{entry.hash}</span>
                                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent/10 text-accent/70 border border-accent/20">
                                            {entry.branch}
                                        </span>
                                        <span className="font-mono text-[10px] text-zinc-700 ml-auto">{entry.dates}</span>
                                    </div>

                                    {/* Company & role */}
                                    <h3 className="text-base font-geist font-bold text-zinc-200 mb-0.5">
                                        {entry.company}
                                    </h3>
                                    <p className="font-mono text-xs text-zinc-500 mb-3">{entry.role}</p>

                                    {/* Achievements as git diff additions */}
                                    <div className="space-y-1">
                                        {entry.achievements.map((achievement, j) => (
                                            <p key={j} className="flex items-start gap-2 text-xs text-zinc-400">
                                                <span className="text-emerald-500 font-mono shrink-0 mt-0.5">+</span>
                                                {achievement}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
