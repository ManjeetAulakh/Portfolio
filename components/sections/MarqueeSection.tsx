"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TECHS_ROW1 = [
    "React", "TypeScript", "Next.js", "Java", "Spring Boot", "PostgreSQL",
    "Docker", "AWS", "Node.js", "Tailwind CSS", "Git", "GitHub",
];
const TECHS_ROW2 = [
    "MongoDB", "MySQL", "Hibernate", "Redux", "REST APIs", "Linux",
    "Postman", "IntelliJ IDEA", "VS Code", "Figma", "Kubernetes", "GraphQL",
];
const TECHS_ROW3 = [
    "HTML5", "CSS3", "JavaScript", "Webpack", "Jest", "JUnit",
    "Maven", "Gradle", "NGINX", "Redis", "Kafka", "Jenkins",
];

const ICON_MAP: Record<string, string> = {
    React: "react", TypeScript: "typescript", "Next.js": "nextjs", Java: "java",
    "Spring Boot": "spring", PostgreSQL: "postgresql", Docker: "docker",
    AWS: "amazonwebservices", "Node.js": "nodejs", "Tailwind CSS": "tailwindcss",
    Git: "git", GitHub: "github", MongoDB: "mongodb", MySQL: "mysql",
    Hibernate: "hibernate", Redux: "redux", Linux: "linux",
    Postman: "postman", "IntelliJ IDEA": "intellij", "VS Code": "vscode",
    Figma: "figma", Kubernetes: "kubernetes", GraphQL: "graphql",
    HTML5: "html5", CSS3: "css3", JavaScript: "javascript", Webpack: "webpack",
    Jest: "jest", JUnit: "junit", Maven: "maven", Gradle: "gradle",
    NGINX: "nginx", Redis: "redis", Kafka: "apachekafka", Jenkins: "jenkins",
    "REST APIs": "fastapi",
};

function MarqueeRow({
    techs,
    reverse = false,
    speed = "30s",
}: {
    techs: string[];
    reverse?: boolean;
    speed?: string;
}) {
    const doubled = [...techs, ...techs];

    return (
        <div
            className="flex gap-3 marquee-mask group"
            style={{ "--marquee-duration": speed } as React.CSSProperties}
        >
            <div
                className={`flex gap-3 shrink-0 ${reverse ? "animate-marquee-reverse" : "animate-marquee"
                    } group-hover:[animation-duration:60s]`}
            >
                {doubled.map((tech, i) => (
                    <div
                        key={`${tech}-${i}`}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-bg-surface text-xs font-mono text-zinc-500 hover:text-zinc-200 hover:border-accent/30 transition-all shrink-0 whitespace-nowrap"
                    >
                        <img
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${ICON_MAP[tech] || tech.toLowerCase()}/${ICON_MAP[tech] || tech.toLowerCase()}-original.svg`}
                            className="w-4 h-4"
                            alt={tech}
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = "none";
                            }}
                        />
                        {tech}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function MarqueeSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section className="py-20 overflow-hidden relative">
            {/* Watermark background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[12vw] font-geist font-bold text-zinc-900/[0.03] whitespace-nowrap select-none">
                    TECHNOLOGIES
                </span>
            </div>

            <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6 }}
                className="space-y-3"
            >
                <MarqueeRow techs={TECHS_ROW1} speed="28s" />
                <MarqueeRow techs={TECHS_ROW2} reverse speed="35s" />
                <MarqueeRow techs={TECHS_ROW3} speed="22s" />
            </motion.div>
        </section>
    );
}
