"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Terminal } from "lucide-react";

// ── Skills data ──
const CATEGORIES = ["Frontend", "Backend", "Database", "DevOps", "Tools"] as const;
type Category = (typeof CATEGORIES)[number];

interface Skill {
    name: string;
    icon: string; // devicon class suffix
    category: Category;
    level: number; // 0-100
    version: string; // npm-style version
}

const SKILLS: Skill[] = [
    // Frontend
    { name: "React", icon: "react", category: "Frontend", level: 85, version: "^18.2.0" },
    { name: "TypeScript", icon: "typescript", category: "Frontend", level: 78, version: "^5.3.0" },
    { name: "Next.js", icon: "nextjs", category: "Frontend", level: 75, version: "^14.0.0" },
    { name: "JavaScript", icon: "javascript", category: "Frontend", level: 88, version: "ES2024" },
    { name: "HTML5", icon: "html5", category: "Frontend", level: 92, version: "^5.0.0" },
    { name: "CSS3", icon: "css3", category: "Frontend", level: 88, version: "^3.0.0" },
    { name: "Tailwind", icon: "tailwindcss", category: "Frontend", level: 85, version: "^3.4.0" },
    // Backend
    { name: "Java", icon: "java", category: "Backend", level: 90, version: "^21.0.0" },
    { name: "Spring Boot", icon: "spring", category: "Backend", level: 85, version: "^3.2.0" },
    { name: "Node.js", icon: "nodejs", category: "Backend", level: 65, version: "^20.0.0" },
    { name: "Hibernate", icon: "hibernate", category: "Backend", level: 78, version: "^6.0.0" },
    // Database
    { name: "PostgreSQL", icon: "postgresql", category: "Database", level: 80, version: "^16.0" },
    { name: "MySQL", icon: "mysql", category: "Database", level: 78, version: "^8.0" },
    { name: "MongoDB", icon: "mongodb", category: "Database", level: 60, version: "^7.0" },
    // DevOps
    { name: "Docker", icon: "docker", category: "DevOps", level: 72, version: "^24.0" },
    { name: "AWS", icon: "amazonwebservices", category: "DevOps", level: 55, version: "latest" },
    { name: "Linux", icon: "linux", category: "DevOps", level: 70, version: "^6.0" },
    { name: "Git", icon: "git", category: "DevOps", level: 88, version: "^2.43" },
    // Tools
    { name: "IntelliJ", icon: "intellij", category: "Tools", level: 85, version: "2024.1" },
    { name: "VS Code", icon: "vscode", category: "Tools", level: 90, version: "^1.85" },
    { name: "GitHub", icon: "github", category: "Tools", level: 88, version: "latest" },
    { name: "Postman", icon: "postman", category: "Tools", level: 82, version: "^10.0" },
];

// ── Terminal proficiency bars ──
const TOP_SKILLS = SKILLS.filter((s) => s.level >= 75).sort((a, b) => b.level - a.level).slice(0, 10);

function TerminalBar({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
    const width = inView ? skill.level : 0;
    const levelLabel = skill.level >= 85 ? "expert" : skill.level >= 70 ? "proficient" : "learning";

    return (
        <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="w-24 text-right text-zinc-500 shrink-0">{skill.name}</span>
            <div className="flex-1 h-3 bg-bg rounded overflow-hidden border border-border">
                <motion.div
                    className="h-full bg-accent/70 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
                />
            </div>
            <span className="w-8 text-zinc-500 text-right">{skill.level}%</span>
            <span className="w-20 text-zinc-700">{levelLabel}</span>
        </div>
    );
}

export default function SkillsSection() {
    const [activeTab, setActiveTab] = useState<Category>("Frontend");
    const ref = useRef<HTMLDivElement>(null);
    const termRef = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const termInView = useInView(termRef, { once: true, margin: "-80px" });

    const filteredSkills = SKILLS.filter((s) => s.category === activeTab);

    return (
        <section id="skills" className="section-pad">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">Stack</span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-geist font-bold">
                        Tech <span className="text-stroke">Arsenal</span>
                    </h2>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 }}
                    className="flex justify-center gap-1 mb-10"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${activeTab === cat
                                    ? "bg-accent/15 text-accent border border-accent/30"
                                    : "text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-white/5"
                                }`}
                            data-cursor="button"
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Skill Cards — npm-style */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
                    >
                        {filteredSkills.map((skill, i) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative p-4 rounded-xl border border-border bg-bg-surface hover:border-accent/30 hover:bg-bg-elevated hover:-translate-y-1 transition-all duration-200"
                                data-cursor="button"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`}
                                        alt={skill.name}
                                        className="w-8 h-8"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-plain.svg`;
                                        }}
                                    />
                                    <div>
                                        <p className="font-mono text-sm text-zinc-200 group-hover:text-accent transition-colors">
                                            {skill.name}
                                        </p>
                                        <p className="font-mono text-[10px] text-zinc-600">{skill.version}</p>
                                    </div>
                                </div>
                                {/* Progress bar */}
                                <div className="h-1 bg-bg rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-accent/50 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${skill.level}%` } : {}}
                                        transition={{ duration: 0.8, delay: i * 0.05 + 0.3 }}
                                    />
                                </div>
                                {/* Hover checkmark */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Check size={14} className="text-accent" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Terminal Proficiency Bars */}
                <motion.div
                    ref={termRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={termInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="rounded-xl border border-border bg-bg-surface overflow-hidden"
                >
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-bg">
                        <Terminal size={12} className="text-zinc-600" />
                        <span className="font-mono text-[10px] text-zinc-600">skill-proficiency — bash</span>
                    </div>
                    <div className="p-5 space-y-2.5">
                        <p className="font-mono text-[11px] text-zinc-600 mb-4">
                            <span className="text-accent">$</span> cat skill_levels.sh
                        </p>
                        {TOP_SKILLS.map((skill, i) => (
                            <TerminalBar key={skill.name} skill={skill} index={i} inView={termInView} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
