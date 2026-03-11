"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiBriefcase, HiAcademicCap } from "react-icons/hi";

const experiences = [
    {
        type: "work",
        date: "2025 — Present",
        role: "Full-Stack Developer",
        org: "Personal Projects / Freelance",
        bullets: [
            "Built Quiz Management System with Spring Boot + React, JWT auth, and attempt tracking.",
            "Developed Smart Contact Manager with OAuth2 (Google/GitHub), Thymeleaf UI.",
            "Implemented secure REST APIs, role-based access, PostgreSQL with JPA/Hibernate.",
        ],
        current: true,
    },
    {
        type: "work",
        date: "2024 — 2025",
        role: "Developer & Content Creator",
        org: "Side Projects + YouTube",
        bullets: [
            "Launched ScienceHindi360 and Beyond Belief Space YouTube channels.",
            "Containerized services with Docker; improved frontend UX.",
            "Wrote unit/integration tests with JUnit and Mockito.",
            "Built an AI-powered content pipeline for video production.",
        ],
        current: false,
    },
];

const education = [
    {
        type: "edu",
        date: "2022 — 2026",
        role: "Bachelor of Engineering",
        org: "Lovely Professional University",
        grade: "CGPA: 7.8 / 10",
        current: false,
    },
    {
        type: "edu",
        date: "2020 — 2021",
        role: "Higher Secondary School",
        org: "Mother India Convent School",
        grade: "Grade: 70%",
        current: false,
    },
];

function TimelineCard({
    item,
    index,
    side,
    inView,
}: {
    item: (typeof experiences)[0] | (typeof education)[0];
    index: number;
    side: "left" | "right";
    inView: boolean;
}) {
    const isWork = item.type === "work";
    const hasBullets = "bullets" in item;

    return (
        <div className={`flex ${side === "right" ? "flex-row-reverse" : "flex-row"} items-start gap-0 relative`}>
            {/* Card */}
            <motion.div
                initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`glass rounded-2xl p-5 w-[calc(50%-32px)] ${side === "right" ? "mr-auto" : "ml-auto"}`}
            >
                <span className="font-mono text-xs text-slate-500 mb-2 block">{item.date}</span>
                <h3 className="text-base font-bold text-white mb-1">{item.role}</h3>
                <div className="text-sm font-semibold text-violet-400 mb-3">{item.org}</div>
                {hasBullets && (
                    <ul className="space-y-1.5">
                        {(item as typeof experiences[0]).bullets.map((b, i) => (
                            <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                                <span className="text-violet-500 mt-1.5 shrink-0">▸</span>
                                {b}
                            </li>
                        ))}
                    </ul>
                )}
                {"grade" in item && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        ★ {(item as typeof education[0]).grade}
                    </span>
                )}
            </motion.div>

            {/* Center Node */}
            <div className="flex flex-col items-center shrink-0 w-16">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.1 }}
                    className="relative"
                >
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isWork ? "from-violet-500 to-purple-600" : "from-cyan-500 to-blue-600"} flex items-center justify-center shadow-lg z-10 relative`}>
                        {isWork ? <HiBriefcase className="text-white text-lg" /> : <HiAcademicCap className="text-white text-lg" />}
                    </div>
                    {item.current && (
                        <div className="absolute inset-0 rounded-full bg-violet-500/30 animate-pulse-ring" />
                    )}
                </motion.div>
            </div>

            {/* Spacer for the other side */}
            <div className="w-[calc(50%-32px)]" />
        </div>
    );
}

export default function ExperienceSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="experience" className="section-pad">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16 text-center"
                >
                    <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">My Journey</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold">
                        Experience & <span className="gradient-text">Education</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/80 via-purple-500/40 to-transparent -translate-x-1/2" />

                    {/* Experience items */}
                    <div className="mb-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            className="flex items-center justify-center mb-8"
                        >
                            <div className="px-4 py-2 glass rounded-full flex items-center gap-2 text-sm font-semibold text-violet-400">
                                <HiBriefcase /> Experience
                            </div>
                        </motion.div>
                        <div className="space-y-10">
                            {experiences.map((exp, i) => (
                                <TimelineCard
                                    key={exp.role + exp.date}
                                    item={exp}
                                    index={i}
                                    side={i % 2 === 0 ? "left" : "right"}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Education items */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center mb-8 mt-10"
                        >
                            <div className="px-4 py-2 glass rounded-full flex items-center gap-2 text-sm font-semibold text-cyan-400">
                                <HiAcademicCap /> Education
                            </div>
                        </motion.div>
                        <div className="space-y-10">
                            {education.map((edu, i) => (
                                <TimelineCard
                                    key={edu.role + edu.date}
                                    item={edu}
                                    index={i + experiences.length}
                                    side={i % 2 === 0 ? "left" : "right"}
                                    inView={inView}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
