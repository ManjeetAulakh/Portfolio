"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { GitCommit, BookOpen, Star, GitFork } from "lucide-react";

// ── Generate fake contribution data ──
function generateContributions(): number[] {
    const data: number[] = [];
    for (let i = 0; i < 364; i++) {
        const rand = Math.random();
        if (rand < 0.3) data.push(0);
        else if (rand < 0.55) data.push(1);
        else if (rand < 0.75) data.push(2);
        else if (rand < 0.9) data.push(3);
        else data.push(4);
    }
    return data;
}

const INTENSITY_COLORS = [
    "bg-bg-elevated",        // 0 - empty
    "bg-emerald-900/50",     // 1
    "bg-emerald-700/60",     // 2
    "bg-emerald-500/70",     // 3
    "bg-emerald-400",        // 4
];

// ── Stats data ──
const STATS = [
    { label: "Total Commits", value: 847, icon: GitCommit },
    { label: "Repositories", value: 24, icon: BookOpen },
    { label: "Pull Requests", value: 56, icon: GitCommit },
];

// ── Pinned repos ──
const PINNED = [
    {
        name: "quiz-management-system",
        desc: "Full-stack quiz platform with JWT auth, question creation, timed attempts",
        lang: "Java",
        langColor: "#b07219",
        stars: 12,
        forks: 4,
    },
    {
        name: "smart-contact-manager",
        desc: "Secure contact app with OAuth2 login, profile saving, search & filtering",
        lang: "Java",
        langColor: "#b07219",
        stars: 8,
        forks: 2,
    },
];

function Counter({ target, start }: { target: number; start: boolean }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number;
        let raf: number;
        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / 2000, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target, start]);
    return <>{count.toLocaleString()}</>;
}

export default function GitHubStatsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const contributions = useMemo(() => generateContributions(), []);

    // Reshape into 7 rows × 52 cols
    const grid: number[][] = [];
    for (let day = 0; day < 7; day++) {
        const row: number[] = [];
        for (let week = 0; week < 52; week++) {
            const idx = week * 7 + day;
            row.push(contributions[idx] ?? 0);
        }
        grid.push(row);
    }

    // Generate date labels
    const today = new Date();
    const getDate = (weekOffset: number, dayOffset: number) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (52 - weekOffset) * 7 - (6 - dayOffset));
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <section className="section-pad">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">Activity</span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-geist font-bold">
                        GitHub <span className="text-stroke">Stats</span>
                    </h2>
                </motion.div>

                {/* Contribution Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.15 }}
                    className="mb-10 p-6 rounded-xl border border-border bg-bg-surface overflow-x-auto"
                >
                    <p className="font-mono text-[10px] text-zinc-600 mb-4">
                        <span className="text-accent">847 contributions</span> in the last year
                    </p>
                    <div className="flex gap-[3px]">
                        {Array.from({ length: 52 }).map((_, week) => (
                            <div key={week} className="flex flex-col gap-[3px]">
                                {Array.from({ length: 7 }).map((_, day) => {
                                    const level = grid[day]?.[week] ?? 0;
                                    const delay = (week * 7 + day) * 0.002;
                                    return (
                                        <motion.div
                                            key={day}
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                                            transition={{ delay: 0.3 + delay, duration: 0.2 }}
                                            className={`w-[11px] h-[11px] rounded-[2px] ${INTENSITY_COLORS[level]} hover:ring-1 hover:ring-accent/50 transition-shadow`}
                                            title={`${level} contributions on ${getDate(week, day)}`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-1 mt-4 justify-end">
                        <span className="font-mono text-[9px] text-zinc-700 mr-1">Less</span>
                        {INTENSITY_COLORS.map((color, i) => (
                            <div key={i} className={`w-[11px] h-[11px] rounded-[2px] ${color}`} />
                        ))}
                        <span className="font-mono text-[9px] text-zinc-700 ml-1">More</span>
                    </div>
                </motion.div>

                {/* Stat Cards */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="p-5 rounded-xl border border-border bg-bg-surface text-center"
                        >
                            <stat.icon size={18} className="text-accent mx-auto mb-2" />
                            <p className="text-3xl font-geist font-bold text-zinc-100">
                                <Counter target={stat.value} start={inView} />
                            </p>
                            <p className="font-mono text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Pinned Repos */}
                <div className="grid md:grid-cols-2 gap-4">
                    {PINNED.map((repo, i) => (
                        <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="p-5 rounded-xl border border-border bg-bg-surface hover:border-accent/20 transition-colors"
                            data-cursor="button"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <BookOpen size={14} className="text-zinc-600" />
                                <span className="font-mono text-sm text-accent">{repo.name}</span>
                            </div>
                            <p className="text-xs text-zinc-500 mb-4">{repo.desc}</p>
                            <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full" style={{ background: repo.langColor }} />
                                    {repo.lang}
                                </span>
                                <span className="flex items-center gap-1"><Star size={10} /> {repo.stars}</span>
                                <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
