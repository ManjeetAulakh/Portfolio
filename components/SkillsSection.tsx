"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_CATEGORIES = [
    {
        title: "Frontend",
        skills: [
            { name: "React", icon: "react/react-original.svg" },
            { name: "Next.js", icon: "nextjs/nextjs-original.svg", invertDark: true },
            { name: "TypeScript", icon: "typescript/typescript-original.svg" },
            { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original.svg" },
            { name: "Framer Motion", icon: "framermotion/framermotion-original.svg" },
        ]
    },
    {
        title: "Backend & Database",
        skills: [
            { name: "Java", icon: "java/java-original.svg" },
            { name: "Spring Boot", icon: "spring/spring-original.svg" },
            { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
            { name: "PostgreSQL", icon: "postgresql/postgresql-original.svg" },
            { name: "Redis", icon: "redis/redis-original.svg" },
        ]
    },
    {
        title: "Tools & DevOps",
        skills: [
            { name: "Git", icon: "git/git-original.svg" },
            { name: "Docker", icon: "docker/docker-original.svg" },
            { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark.svg", invertDark: true },
            { name: "Linux", icon: "linux/linux-original.svg" },
            { name: "Figma", icon: "figma/figma-original.svg" },
        ]
    }
];

const MARQUEE_LOGOS = [
    "react/react-original.svg",
    "nextjs/nextjs-original.svg",
    "typescript/typescript-original.svg",
    "tailwindcss/tailwindcss-original.svg",
    "java/java-original.svg",
    "spring/spring-original.svg",
    "postgresql/postgresql-original.svg",
    "docker/docker-original.svg",
    "amazonwebservices/amazonwebservices-original-wordmark.svg",
    "git/git-original.svg",
    "figma/figma-original.svg",
];

export default function SkillsSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="stack" className="section-pad relative w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-20" ref={ref}>
                <div className="mb-16">
                    <span className="font-mono text-sm text-emerald-400 tracking-widest uppercase">My Arsenal</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold font-geist">
                        Tech <span className="text-zinc-600">Stack</span>
                    </h2>
                </div>

                <div className="flex flex-col gap-12">
                    {SKILL_CATEGORIES.map((category, catIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: catIndex * 0.15 }}
                        >
                            <h3 className="text-sm font-mono text-zinc-500 mb-4 tracking-wider uppercase">{category.title}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="group flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800/80 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]"
                                    >
                                        <div className="w-12 h-12 mb-4 drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300">
                                            <img
                                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`}
                                                alt={skill.name}
                                                className={`w-full h-full object-contain ${skill.invertDark ? "invert" : ""}`}
                                            />
                                        </div>
                                        <span className="text-xs font-mono text-zinc-400 group-hover:text-emerald-400 transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Marquee Strip */}
            <div className="w-full relative mt-24 py-8 overflow-hidden mask-edges group">
                {/* Overlay gradient to fade edges */}
                <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                    {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
                        <div key={i} className="flex-shrink-0 w-24 h-12 mx-8 opacity-40 hover:opacity-100 transition-opacity flex items-center justify-center">
                            <img
                                src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${logo}`}
                                alt=""
                                className={`max-w-full max-h-full object-contain ${(logo.includes('next') || logo.includes('amazon')) ? "invert" : "grayscale hover:grayscale-0"}`}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
