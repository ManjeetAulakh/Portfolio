"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { RiGithubLine, RiExternalLinkLine, RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { HiFolderOpen } from "react-icons/hi";

const featuredProjects = [
    {
        name: "Quiz Management System",
        description: "Full-stack quiz platform with JWT auth, question creation, timed attempts, and result analytics dashboard.",
        tech: ["Spring Boot", "React", "JWT", "PostgreSQL"],
        github: "https://github.com/ManjeetAulakh/quiz",
        live: null,
        gradient: "from-violet-600/20 to-cyan-600/20",
    },
    {
        name: "Smart Contact Manager",
        description: "Secure contact app with OAuth2 login (Google & GitHub), profile saving, responsive UI, and smart search/filtering.",
        tech: ["Spring Boot", "OAuth2", "Thymeleaf", "MySQL"],
        github: "https://github.com/ManjeetAulakh/contactManager",
        live: null,
        gradient: "from-cyan-600/20 to-blue-600/20",
    },
    {
        name: "Tech Blog Platform",
        description: "Full-stack blogging platform with user roles, rich content creation, comment system, and JWT-protected endpoints.",
        tech: ["Spring Boot", "React", "JWT", "Hibernate"],
        github: "https://github.com/ManjeetAulakh/techblog-backend",
        live: null,
        gradient: "from-purple-600/20 to-pink-600/20",
    },
];

const otherProjects = [
    {
        name: "REST API Gateway",
        description: "Microservice API gateway with rate limiting, authentication middleware, and request routing.",
        tech: ["Java", "Spring Cloud", "Docker"],
        github: "#",
    },
    {
        name: "ScienceHindi360 Site",
        description: "Landing page for the YouTube channel with video embeds, stats, and newsletter signup.",
        tech: ["React", "Tailwind", "Next.js"],
        github: "#",
    },
    {
        name: "CI/CD Pipeline Template",
        description: "GitHub Actions workflow templates for Java Spring Boot projects with automated testing and Docker builds.",
        tech: ["GitHub Actions", "Docker", "Jenkins"],
        github: "#",
    },
    {
        name: "Portfolio v1",
        description: "Original portfolio built with vanilla HTML, CSS, and JavaScript with custom animations.",
        tech: ["HTML", "CSS", "JavaScript"],
        github: "https://github.com/ManjeetAulakh/manjeetsingh.github.io",
    },
    {
        name: "Auth Starter Kit",
        description: "Boilerplate Spring Boot project with JWT + OAuth2 ready to go — saves setup time on new projects.",
        tech: ["Spring Security", "JWT", "OAuth2"],
        github: "#",
    },
    {
        name: "Discord Bot",
        description: "A Discord bot for study groups with quiz commands, reminders, and resource links.",
        tech: ["Java", "JDA", "PostgreSQL"],
        github: "#",
    },
];

function BrowserFrame({ gradient }: { gradient: string }) {
    return (
        <div className="rounded-xl overflow-hidden border border-white/10">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-2 border-b border-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <div className="ml-3 flex-1 bg-surface rounded px-3 py-1 text-xs text-slate-600 font-mono">
                    https://project.demo
                </div>
            </div>
            <div className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-5xl opacity-20 font-bold">{"</>"}</span>
            </div>
        </div>
    );
}

export default function ProjectsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const dragX = useMotionValue(0);
    const carouselRef = useRef<HTMLDivElement>(null);

    const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const next = () => setActiveIndex((i) => Math.min(featuredProjects.length - 1, i + 1));

    return (
        <section id="projects" className="section-pad">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16 text-center"
                >
                    <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Featured Work</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-xl mx-auto">
                        Full-stack applications built with Java, Spring Boot, React, and secure authentication.
                    </p>
                </motion.div>

                {/* Featured Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="relative overflow-hidden">
                        <motion.div
                            ref={carouselRef}
                            drag="x"
                            dragConstraints={{ left: -(featuredProjects.length - 1) * 100, right: 0 }}
                            style={{ x: dragX }}
                            animate={{ x: -activeIndex * 0 }}
                            className="flex gap-6 pb-4"
                        >
                            {featuredProjects.map((project, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <motion.div
                                        key={project.name}
                                        animate={{
                                            scale: isActive ? 1 : 0.93,
                                            opacity: isActive ? 1 : 0.5,
                                        }}
                                        transition={{ duration: 0.4 }}
                                        className="glass rounded-2xl p-6 min-w-[min(100%,520px)] cursor-grab active:cursor-grabbing"
                                        onClick={() => setActiveIndex(i)}
                                    >
                                        <BrowserFrame gradient={project.gradient} />
                                        <div className="mt-5">
                                            <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-violet-500/10 text-violet-400 border border-violet-500/15">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex gap-3">
                                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                                                    <RiGithubLine size={16} /> Code
                                                </a>
                                                {project.live && (
                                                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
                                                        <RiExternalLinkLine size={16} /> Live
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex gap-2">
                            {featuredProjects.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-violet-500" : "w-2 bg-white/15"
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={prev} disabled={activeIndex === 0}
                                className="p-2 rounded-full glass hover:border-violet-500/30 disabled:opacity-30 transition-colors">
                                <RiArrowLeftLine size={18} />
                            </button>
                            <button onClick={next} disabled={activeIndex === featuredProjects.length - 1}
                                className="p-2 rounded-full glass hover:border-violet-500/30 disabled:opacity-30 transition-colors">
                                <RiArrowRightLine size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Other Projects Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-slate-300 mb-6">Other Notable Projects</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {otherProjects.map((project, i) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.1 * i + 0.5 }}
                                whileHover={{ y: -8 }}
                                className="glass rounded-xl p-5 cursor-pointer group relative overflow-hidden transition-shadow hover:shadow-xl hover:shadow-violet-900/20"
                            >
                                {/* Top gradient border on hover */}
                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                                <div className="flex justify-between items-start mb-4">
                                    <HiFolderOpen className="text-violet-400 text-3xl" />
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                        className="text-slate-500 hover:text-white transition-colors">
                                        <RiGithubLine size={18} />
                                    </a>
                                </div>
                                <h4 className="font-bold text-white text-base mb-2 group-hover:text-violet-300 transition-colors">{project.name}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tech.map((t) => (
                                        <span key={t} className="text-xs font-mono text-slate-600">{t}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
