"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const FEATURED_PROJECTS = [
    {
        title: "Quiz Management System",
        description:
            "A comprehensive scalable quiz platform supporting user authentication, dynamic quiz creation, and real-time attempt tracking. Built with a robust Java/Spring Boot backend honoring clean architecture principles.",
        tech: ["Java", "Spring Boot", "React", "JWT", "PostgreSQL"],
        github: "https://github.com/manjeetsingh",
        live: "#",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop",
    },
    {
        title: "Smart Contact Manager",
        description:
            "A secure cloud-based contact management solution with OAuth2 integration (Google/GitHub) and role-based access control. Features a responsive Thymeleaf UI and reliable data persistence.",
        tech: ["Spring Security", "OAuth2", "Thymeleaf", "Docker"],
        github: "https://github.com/manjeetsingh",
        live: "#",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    },
];

const OTHER_PROJECTS = [
    {
        title: "Tech Blog Platform",
        description: "A complete blogging platform with Markdown support, commenting system, and admin dashboard.",
        tech: ["React", "Spring Boot", "MySQL"],
        github: "#",
    },
    {
        title: "Inventory API",
        description: "High-performance REST API for inventory tracking with Redis caching and rate limiting.",
        tech: ["Java 21", "Redis", "Spring WebFlux"],
        github: "#",
    },
    {
        title: "Portfolio V1",
        description: "My previous developer portfolio built with pure HTML, CSS, and vanilla JavaScript.",
        tech: ["HTML5", "CSS3", "JS"],
        github: "#",
        live: "#",
    },
    {
        title: "ScienceHindi360 Web",
        description: "A content aggregator for my space science YouTube channel, featuring article translations.",
        tech: ["Next.js", "Tailwind"],
        github: "#",
    },
    {
        title: "Task Orchestrator",
        description: "A distributed cron job manager using RabbitMQ for reliable message queuing.",
        tech: ["Spring AMQP", "RabbitMQ"],
        github: "#",
    },
    {
        title: "Code Snippet Vault",
        description: "A CLI tool and web app for saving and retrieving commonly used code snippets.",
        tech: ["Go", "React"],
        github: "#",
    },
];

function FeaturedProject({ project, index }: { project: any; index: number }) {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full group"
        >
            <div className={`flex flex-col gap-8 lg:gap-12 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                {/* Image side */}
                <div className="w-full lg:w-3/5 rounded-2xl overflow-hidden glass border border-white/10 shadow-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:border-white/20">
                    <div className="bg-zinc-900 border-b border-white/5 px-4 py-3 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-red-500/80 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-yellow-500/80 transition-colors" />
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 group-hover:bg-emerald-500/80 transition-colors" />
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                        {/* Fake image using a gradient since we don't have actual images yet, but an img tag is provided */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 mix-blend-overlay z-10" />
                        <img
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                    </div>
                </div>

                {/* Text side */}
                <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? "lg:items-start lg:text-left" : "lg:items-end lg:text-right"}`}>
                    <div className="font-mono text-xs text-emerald-400 mb-2">Featured Project</div>
                    <h3 className="text-2xl md:text-3xl font-geist font-bold mb-6 text-zinc-100 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <div className="glass p-6 rounded-xl border border-white/5 text-zinc-400 text-sm leading-relaxed mb-6 shadow-lg relative z-10 w-full group-hover:border-white/10 transition-colors">
                        {project.description}
                    </div>
                    <ul className={`flex flex-wrap gap-2 mb-8 font-mono text-xs text-zinc-500 ${isEven ? "justify-start" : "justify-end"}`}>
                        {project.tech.map((t: string) => (
                            <li key={t} className="px-2 py-1 rounded bg-zinc-900/50 border border-white/5">{t}</li>
                        ))}
                    </ul>
                    <div className={`flex items-center gap-4 ${isEven ? "justify-start" : "justify-end"}`}>
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-emerald-400 transition-colors p-2 -m-2">
                            <Github size={20} />
                        </a>
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-emerald-400 transition-colors p-2 -m-2">
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function GridProject({ project, index }: { project: any; index: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 + 0.2 }}
            className="group relative h-full glass rounded-xl p-6 border-t-2 border-t-transparent border-x border-b border-x-white/5 border-b-white/5 hover:border-t-emerald-500 hover:bg-zinc-900/50 transition-all duration-300 flex flex-col hover:-translate-y-1 hover:shadow-2xl shadow-black/50"
        >
            <div className="flex justify-between items-start mb-6">
                <Folder size={32} className="text-emerald-400/80 group-hover:text-emerald-400 transition-colors" />
                <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors z-10">
                        <Github size={18} />
                    </a>
                    {project.live && (
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-400 transition-colors z-10">
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
            <h4 className="text-lg font-bold font-geist text-zinc-200 group-hover:text-emerald-400 transition-colors mb-2">{project.title}</h4>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8 flex-grow">{project.description}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-auto font-mono text-[10px] text-zinc-500">
                {project.tech.map((t: string) => (
                    <li key={t}>{t}</li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function ProjectsSection() {
    return (
        <section id="projects" className="section-pad w-full">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-20">
                    <span className="font-mono text-sm text-emerald-400 tracking-widest uppercase">My Work</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold font-geist">
                        Featured <span className="text-zinc-600">Projects</span>
                    </h2>
                </div>

                {/* Featured Projects Stack */}
                <div className="flex flex-col gap-24 md:gap-32 mb-32">
                    {FEATURED_PROJECTS.map((project, i) => (
                        <FeaturedProject key={project.title} project={project} index={i} />
                    ))}
                </div>

                {/* Other Projects Grid */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold font-geist text-center mb-12">Other Noteworthy Projects</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {OTHER_PROJECTS.map((project, i) => (
                            <GridProject key={project.title} project={project} index={i} />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <a href="https://github.com/manjeetsingh" className="inline-flex items-center gap-2 text-sm font-mono text-emerald-400 hover:underline underline-offset-4">
                        View more on GitHub <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
}
