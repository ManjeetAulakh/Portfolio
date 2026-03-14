"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink, ArrowRight, GitFork, Star, BookOpen } from "lucide-react";

// ── Featured projects ──
const FEATURED = [
    {
        name: "Quiz Management System",
        desc: "Full-stack quiz platform with JWT authentication, question creation, timed attempts, and result analytics dashboard.",
        tech: ["Spring Boot", "React", "JWT", "PostgreSQL"],
        github: "https://github.com/manjeetsingh",
        live: "",
    },
    {
        name: "Smart Contact Manager",
        desc: "Secure contact management app with OAuth2 login (Google & GitHub), profile management, responsive UI, and smart search.",
        tech: ["Spring Boot", "OAuth2", "Thymeleaf", "MySQL"],
        github: "https://github.com/manjeetsingh",
        live: "",
    },
    {
        name: "Tech Blog Platform",
        desc: "Full-stack blogging platform with markdown support, comment system, role-based access, and RESTful API.",
        tech: ["Spring Boot", "React", "PostgreSQL", "Docker"],
        github: "https://github.com/manjeetsingh",
        live: "",
    },
];

// ── Other repos ──
const REPOS = [
    { name: "spring-security-jwt-starter", desc: "JWT authentication boilerplate for Spring Boot 3.x", lang: "Java", langColor: "#b07219", stars: 12, forks: 4 },
    { name: "react-dashboard-template", desc: "Admin dashboard template with charts and dark mode", lang: "TypeScript", langColor: "#3178c6", stars: 8, forks: 2 },
    { name: "docker-compose-stacks", desc: "Production-ready Docker Compose configurations for common tech stacks", lang: "Dockerfile", langColor: "#384d54", stars: 15, forks: 6 },
    { name: "rest-api-design-guide", desc: "Opinionated guide for designing clean RESTful APIs", lang: "Markdown", langColor: "#083fa1", stars: 20, forks: 3 },
    { name: "dsa-solutions", desc: "Data structures and algorithms solutions in Java", lang: "Java", langColor: "#b07219", stars: 5, forks: 1 },
    { name: "portfolio-v2", desc: "This portfolio — built with Next.js 14, Three.js, GSAP, Framer Motion", lang: "TypeScript", langColor: "#3178c6", stars: 0, forks: 0 },
];

// ── 3D tilt card ──
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({});
    const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -10;
        const rotateY = (x - 0.5) * 10;
        setStyle({
            transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
            transition: "transform 0.1s ease-out",
        });
        setSpotlightPos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
            transition: "transform 0.4s ease-out",
        });
        setSpotlightPos({ x: 50, y: 50 });
    };

    return (
        <div
            ref={cardRef}
            className={`relative overflow-hidden ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor="button"
        >
            {/* Spotlight gradient */}
            <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(400px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(16,185,129,0.06), transparent 50%)`,
                }}
            />
            {children}
        </div>
    );
}

export default function ProjectsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section id="projects" className="section-pad">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">Work</span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-geist font-bold">
                        Featured <span className="text-stroke">Projects</span>
                    </h2>
                </motion.div>

                {/* Featured Projects */}
                <div className="grid gap-6 mb-20">
                    {FEATURED.map((project, i) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 + i * 0.12 }}
                        >
                            <TiltCard className="rounded-xl border border-border bg-bg-surface hover:border-accent/20 transition-colors">
                                <div className="p-6 md:p-8">
                                    {/* Browser chrome */}
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                        <div className="flex-1 h-6 rounded-md bg-bg ml-2 flex items-center px-3">
                                            <span className="font-mono text-[10px] text-zinc-600">
                                                https://{project.name.toLowerCase().replace(/\s/g, "-")}.dev
                                            </span>
                                        </div>
                                    </div>

                                    {/* Screenshot placeholder */}
                                    <div className="h-40 md:h-56 rounded-lg bg-bg flex items-center justify-center mb-6 border border-border">
                                        <span className="text-zinc-800 text-5xl font-geist font-bold opacity-20">&lt;/&gt;</span>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-geist font-bold text-zinc-100 mb-2">
                                                {project.name}
                                            </h3>
                                            <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-md">
                                                {project.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-mono border border-accent/20"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-zinc-400 hover:text-accent hover:border-accent/30 text-xs font-mono transition-all"
                                                    data-cursor="button"
                                                >
                                                    <Github size={14} /> Code
                                                </a>
                                            )}
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg-surface text-xs font-mono font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all"
                                                    data-cursor="button"
                                                >
                                                    <ExternalLink size={14} /> Live
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* Repository Grid */}
                <div className="mb-8">
                    <h3 className="font-mono text-sm text-zinc-500 mb-6 flex items-center gap-2">
                        <BookOpen size={14} /> Other Repositories
                    </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {REPOS.map((repo, i) => (
                        <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.06 }}
                            className="group relative p-4 rounded-xl border border-border bg-bg-surface hover:bg-bg-elevated hover:border-accent/20 transition-all"
                            data-cursor="button"
                        >
                            {/* Accent left border on hover */}
                            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-start gap-2 mb-2">
                                <BookOpen size={14} className="text-zinc-600 mt-0.5 shrink-0" />
                                <span className="font-mono text-sm text-zinc-300 group-hover:text-accent transition-colors">
                                    {repo.name}
                                </span>
                            </div>
                            <p className="text-xs text-zinc-600 leading-relaxed mb-3 pl-[22px]">{repo.desc}</p>
                            <div className="flex items-center gap-4 pl-[22px] text-[10px] font-mono text-zinc-600">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full" style={{ background: repo.langColor }} />
                                    {repo.lang}
                                </span>
                                <span className="flex items-center gap-1"><Star size={10} /> {repo.stars}</span>
                                <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks}</span>
                            </div>

                            {/* View repo arrow on hover */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-2">
                                <ArrowRight size={14} className="text-accent" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
