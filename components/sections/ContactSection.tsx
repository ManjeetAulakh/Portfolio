"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Loader2, Check, Github, Linkedin, Mail, Twitter } from "lucide-react";

// ── API endpoint social links ──
const ENDPOINTS = [
    { method: "GET", methodColor: "text-emerald-400 bg-emerald-400/10", path: "/api/github", label: "GitHub Profile", href: "https://github.com/manjeetsingh", icon: Github },
    { method: "GET", methodColor: "text-emerald-400 bg-emerald-400/10", path: "/api/linkedin", label: "LinkedIn Profile", href: "https://www.linkedin.com/in/manjeetsingh0", icon: Linkedin },
    { method: "POST", methodColor: "text-yellow-400 bg-yellow-400/10", path: "/api/email", label: "Send Email", href: "mailto:manjeetsingh@example.com", icon: Mail },
    { method: "GET", methodColor: "text-emerald-400 bg-emerald-400/10", path: "/api/twitter", label: "Twitter / X", href: "https://twitter.com/manjeetsingh", icon: Twitter },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
    const [formState, setFormState] = useState<FormState>("idle");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !message) return;
        setFormState("loading");
        setTimeout(() => {
            setFormState("success");
            setTimeout(() => {
                setFormState("idle");
                setName("");
                setEmail("");
                setMessage("");
            }, 4000);
        }, 2000);
    };

    const statusBadge = {
        idle: { text: "Ready", color: "text-zinc-500 bg-zinc-500/10 border-zinc-500/20" },
        loading: { text: "Sending...", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
        success: { text: "200 OK", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
        error: { text: "500 Error", color: "text-red-400 bg-red-400/10 border-red-400/20" },
    };

    const badge = statusBadge[formState];

    return (
        <section id="contact" className="section-pad">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">Connect</span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-geist font-bold">
                        Send a <span className="text-stroke">Request</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Left: Endpoints */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-geist font-bold text-zinc-100 mb-3">
                            Let&apos;s build something.
                        </h3>
                        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
                            Currently available for full-time roles, freelance projects, and open source
                            collaboration. Pick an endpoint below.
                        </p>

                        <div className="space-y-2">
                            {ENDPOINTS.map((ep) => (
                                <a
                                    key={ep.path}
                                    href={ep.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-bg-surface hover:border-accent/20 hover:bg-bg-elevated transition-all group"
                                    data-cursor="button"
                                >
                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${ep.methodColor}`}
                                    >
                                        {ep.method}
                                    </span>
                                    <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors flex-1">
                                        {ep.path}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                        {ep.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: JSON form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.35 }}
                    >
                        <div className="rounded-xl border border-border bg-bg-surface overflow-hidden">
                            {/* Top bar */}
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-bg">
                                <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500">
                                    <span className="text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded font-semibold">POST</span>
                                    <span>/api/contact</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badge.color}`}>
                                    {badge.text}
                                </span>
                            </div>

                            {/* JSON Editor Form */}
                            <form onSubmit={handleSubmit} className="p-5">
                                <pre className="font-mono text-[12px] leading-relaxed">
                                    <span className="text-zinc-700">{"{"}</span>{"\n"}
                                    <span className="text-zinc-700">{"  "}</span>
                                    <span className="text-blue-400">&quot;name&quot;</span>
                                    <span className="text-zinc-600">: </span>
                                    <span className="text-zinc-700">&quot;</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your Name"
                                        className="bg-transparent border-none outline-none text-emerald-400 font-mono text-[12px] w-48 placeholder:text-zinc-800"
                                        disabled={formState !== "idle"}
                                    />
                                    <span className="text-zinc-700">&quot;</span>
                                    <span className="text-zinc-700">,</span>{"\n"}

                                    <span className="text-zinc-700">{"  "}</span>
                                    <span className="text-blue-400">&quot;email&quot;</span>
                                    <span className="text-zinc-600">: </span>
                                    <span className="text-zinc-700">&quot;</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@example.com"
                                        className="bg-transparent border-none outline-none text-emerald-400 font-mono text-[12px] w-52 placeholder:text-zinc-800"
                                        disabled={formState !== "idle"}
                                    />
                                    <span className="text-zinc-700">&quot;</span>
                                    <span className="text-zinc-700">,</span>{"\n"}

                                    <span className="text-zinc-700">{"  "}</span>
                                    <span className="text-blue-400">&quot;message&quot;</span>
                                    <span className="text-zinc-600">: </span>
                                    <span className="text-zinc-700">&quot;</span>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Your message..."
                                        rows={2}
                                        className="bg-transparent border-none outline-none text-emerald-400 font-mono text-[12px] w-full resize-none placeholder:text-zinc-800"
                                        disabled={formState !== "idle"}
                                    />
                                    <span className="text-zinc-700">&quot;</span>{"\n"}
                                    <span className="text-zinc-700">{"}"}</span>
                                </pre>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={formState !== "idle"}
                                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/20 text-accent font-mono text-xs hover:bg-accent/20 disabled:opacity-50 transition-all"
                                    data-cursor="button"
                                >
                                    {formState === "loading" && <Loader2 size={14} className="animate-spin" />}
                                    {formState === "success" && <Check size={14} />}
                                    {formState === "idle" && <Send size={14} />}
                                    <span className="text-zinc-500">$</span>{" "}
                                    {formState === "loading" ? "sending..." : formState === "success" ? "sent!" : "curl -X POST /api/contact"}
                                </button>
                            </form>

                            {/* Response panel */}
                            <AnimatePresence>
                                {formState === "success" && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-border overflow-hidden"
                                    >
                                        <div className="p-4">
                                            <p className="font-mono text-[10px] text-zinc-600 mb-2">Response:</p>
                                            <pre className="font-mono text-[11px] leading-relaxed">
                                                <span className="text-emerald-400">HTTP/1.1 200 OK</span>{"\n"}
                                                <span className="text-zinc-600">Content-Type: application/json</span>{"\n"}
                                                <span className="text-zinc-600">X-Powered-By: Next.js</span>{"\n\n"}
                                                <span className="text-zinc-700">{"{"}</span>{"\n"}
                                                <span className="text-zinc-700">{"  "}</span>
                                                <span className="text-blue-400">&quot;status&quot;</span>
                                                <span className="text-zinc-600">: </span>
                                                <span className="text-emerald-400">&quot;received&quot;</span>
                                                <span className="text-zinc-700">,</span>{"\n"}
                                                <span className="text-zinc-700">{"  "}</span>
                                                <span className="text-blue-400">&quot;message&quot;</span>
                                                <span className="text-zinc-600">: </span>
                                                <span className="text-emerald-400">&quot;Thanks! I&apos;ll respond within 24 hours.&quot;</span>{"\n"}
                                                <span className="text-zinc-700">{"}"}</span>
                                            </pre>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
