"use client";

import { motion } from "framer-motion";
import { RiArrowRightLine, RiGithubLine } from "react-icons/ri";
import { HiCode, HiOutlineChip, HiBriefcase } from "react-icons/hi";

const techBadges = [
    { label: "Java", color: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400", style: { top: "5%", right: "10%" } },
    { label: "Spring Boot", color: "from-green-500/20 to-green-600/10 border-green-500/30 text-green-400", style: { top: "30%", right: "-5%" } },
    { label: "React", color: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400", style: { bottom: "20%", right: "0%" } },
    { label: "PostgreSQL", color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400", style: { bottom: "5%", right: "25%" } },
    { label: "Docker", color: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400", style: { top: "15%", left: "0%" } },
];

const floatDelays = ["animate-float", "animate-float-delay-1", "animate-float-delay-2", "animate-float-delay-3", "animate-float-delay-4"];

const stats = [
    { icon: <HiBriefcase />, value: "3+", label: "Years of Experience" },
    { icon: <HiCode />, value: "10+", label: "Projects Built" },
    { icon: <HiOutlineChip />, value: "15+", label: "Technologies" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center pt-16 overflow-hidden"
        >
            {/* Background blobs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 w-full py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="order-2 lg:order-1"
                    >
                        {/* Label */}
                        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
                            <span className="font-mono text-sm text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                &gt; Available for opportunities
                                <span className="animate-blink text-violet-400 ml-1">_</span>
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
                            <span className="text-slate-100">Manjeet</span>
                            <br />
                            <span className="gradient-text">Singh</span>
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 font-light mb-8">
                            Full-Stack Developer &{" "}
                            <span className="text-violet-400 font-medium">Content Creator</span>
                        </motion.p>

                        {/* Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-200 shadow-xl shadow-violet-900/30 hover:shadow-violet-900/50 hover:-translate-y-0.5"
                            >
                                Explore My Work <RiArrowRightLine size={18} />
                            </a>
                            <a
                                href="https://github.com/ManjeetAulakh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-white/15 text-slate-300 hover:border-violet-500/50 hover:text-white hover:bg-violet-500/5 transition-all duration-200"
                            >
                                <RiGithubLine size={20} /> GitHub
                            </a>
                        </motion.div>

                        {/* Stat Cards */}
                        <motion.div variants={containerVariants} className="grid grid-cols-3 gap-3">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    variants={itemVariants}
                                    className="glass rounded-2xl p-4 text-center hover:border-violet-500/20 transition-colors"
                                >
                                    <div className="text-violet-400 text-2xl flex justify-center mb-1">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-slate-500 mt-1 leading-tight">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            {/* Rotating gradient border */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 p-[3px] animate-spin-slow">
                                <div className="w-full h-full rounded-full bg-bg" />
                            </div>

                            {/* Profile image */}
                            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-surface-2">
                                <div className="w-full h-full bg-gradient-to-br from-violet-900/40 via-surface-2 to-cyan-900/20 flex items-center justify-center">
                                    {/* Placeholder avatar */}
                                    <div className="w-full h-full bg-gradient-to-br from-violet-800/30 to-cyan-800/20 flex items-center justify-center">
                                        <span className="font-bold text-8xl text-violet-300/30 select-none">MS</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Tech Badges */}
                            {techBadges.map((badge, i) => (
                                <div
                                    key={badge.label}
                                    className={`absolute px-3 py-1.5 rounded-full text-xs font-mono font-semibold border bg-gradient-to-r ${badge.color} backdrop-blur-sm ${floatDelays[i]} whitespace-nowrap shadow-lg`}
                                    style={badge.style}
                                >
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs text-slate-600 font-mono">scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-8 bg-gradient-to-b from-violet-500/40 to-transparent"
                />
            </motion.div>
        </section>
    );
}
