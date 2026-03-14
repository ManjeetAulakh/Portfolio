"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";

const SOCIAL_LINKS = [
    { name: "GitHub", icon: <Github size={24} />, href: "https://github.com/manjeetsingh" },
    { name: "LinkedIn", icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/manjeetsingh0" },
    { name: "Twitter", icon: <Twitter size={24} />, href: "#" },
    { name: "Email", icon: <Mail size={24} />, href: "mailto:manjeetsingh@example.com" },
];

function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setTimeout(() => {
            setStatus("success");
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-mono text-zinc-400">Name</label>
                <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900 transition-colors shadow-inner font-inter"
                    placeholder="John Doe"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-mono text-zinc-400">Email</label>
                <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900 transition-colors shadow-inner font-inter"
                    placeholder="john@example.com"
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-mono text-zinc-400">Message</label>
                <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900 transition-colors shadow-inner font-inter resize-none"
                    placeholder="How can we help you?"
                />
            </div>

            <button
                type="submit"
                disabled={status !== "idle"}
                className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-medium text-sm transition-all duration-300 disabled:opacity-80
                         bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)]"
            >
                {status === "idle" && (
                    <>
                        Send Message <Send size={16} />
                    </>
                )}
                {status === "loading" && (
                    <>
                        Sending... <Loader2 size={16} className="animate-spin" />
                    </>
                )}
                {status === "success" && (
                    <>
                        Message Sent <CheckCircle2 size={16} />
                    </>
                )}
            </button>
        </form>
    );
}

export default function ContactSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="contact" className="section-pad relative w-full overflow-hidden">
            <div className="max-w-6xl mx-auto px-6" ref={ref}>
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold font-geist tracking-tight mb-4 text-zinc-100">
                            Let&apos;s Work <span className="text-emerald-400">Together.</span>
                        </h2>
                        <p className="text-zinc-500 font-inter text-lg leading-relaxed mb-12 max-w-md">
                            Currently available for full-time roles, freelance projects, and open source collaboration. Drop me a line.
                        </p>

                        <div className="grid grid-cols-2 gap-4 max-w-md">
                            {SOCIAL_LINKS.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                    className="group flex flex-col items-center justify-center gap-3 p-6 glass rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
                                >
                                    <div className="text-zinc-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300">
                                        {link.icon}
                                    </div>
                                    <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                                        {link.name}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column (Form) */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="glass p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl relative"
                    >
                        {/* Decorative corner glow */}
                        <div className="absolute -top-px -right-px w-32 h-32 bg-emerald-500/20 blur-[50px] pointer-events-none rounded-full" />

                        <h3 className="text-2xl font-bold font-geist mb-8 text-zinc-100">Send a Message</h3>
                        <ContactForm />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
