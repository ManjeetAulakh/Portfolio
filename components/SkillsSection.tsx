"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const CATEGORIES = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

const skills = [
    // Frontend
    { name: "React.js", category: "Frontend", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", category: "Frontend", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", category: "Frontend", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "HTML5", category: "Frontend", level: 92, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", category: "Frontend", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind CSS", category: "Frontend", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    // Backend
    { name: "Java", category: "Backend", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Spring Boot", category: "Backend", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
    { name: "Hibernate", category: "Backend", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg" },
    { name: "Node.js", category: "Backend", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    // Database
    { name: "PostgreSQL", category: "Database", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MySQL", category: "Database", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", category: "Database", level: 60, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    // DevOps
    { name: "Docker", category: "DevOps", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", category: "DevOps", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Linux", category: "DevOps", level: 72, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    // Tools
    { name: "Git", category: "Tools", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", category: "Tools", level: 88, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "IntelliJ IDEA", category: "Tools", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg" },
    { name: "VS Code", category: "Tools", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
];

const currently = ["Next.js", "AWS Solutions Architect", "System Design"];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="glass rounded-xl p-4 hover:border-violet-500/20 transition-colors group"
        >
            <div className="flex items-center gap-3 mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                <span className="font-mono text-sm font-semibold text-slate-200">{skill.name}</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${skill.level}%` : 0 }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                />
            </div>
            <div className="flex justify-end mt-1">
                <span className="text-xs text-slate-600 font-mono">{skill.level}%</span>
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    const [activeTab, setActiveTab] = useState("All");
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const filtered = activeTab === "All" ? skills : skills.filter((s) => s.category === activeTab);

    return (
        <section id="skills" className="section-pad">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Tech Arsenal</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                        Technologies I use to bring products to life.
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-2 justify-center mb-10"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab === cat
                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-900/30"
                                    : "glass text-slate-400 hover:text-white hover:border-violet-500/30"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filtered.map((skill, i) => (
                            <SkillCard key={skill.name} skill={skill} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Currently Learning */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex flex-col sm:flex-row items-center gap-4 p-5 glass rounded-2xl"
                >
                    <div className="flex items-center gap-2 text-sm font-mono text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Currently Learning:
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {currently.map((item) => (
                            <span
                                key={item}
                                className="px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/20 text-cyan-400 bg-cyan-500/5"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
