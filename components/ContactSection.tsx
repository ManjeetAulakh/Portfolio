"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { RiGithubLine, RiLinkedinLine, RiMailLine, RiTwitterXLine } from "react-icons/ri";
import { HiCheck } from "react-icons/hi";
import { BiLoader } from "react-icons/bi";

const socials = [
    {
        icon: <RiGithubLine size={22} />,
        label: "GitHub",
        href: "https://github.com/ManjeetAulakh",
        color: "hover:text-white hover:shadow-white/10",
    },
    {
        icon: <RiLinkedinLine size={22} />,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/manjeetsingh0/",
        color: "hover:text-blue-400 hover:shadow-blue-400/20",
    },
    {
        icon: <RiMailLine size={22} />,
        label: "Email",
        href: "mailto:manjeetsingh.codes@gmail.com",
        color: "hover:text-red-400 hover:shadow-red-400/20",
    },
    {
        icon: <RiTwitterXLine size={22} />,
        label: "Twitter",
        href: "#",
        color: "hover:text-sky-400 hover:shadow-sky-400/20",
    },
];

type SubmitState = "idle" | "loading" | "success";

export default function ContactSection() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitState, setSubmitState] = useState<SubmitState>("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitState("loading");
        setTimeout(() => {
            setSubmitState("success");
        }, 1500);
    };

    return (
        <section id="contact" className="section-pad">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    className="mb-16 text-center"
                >
                    <span className="font-mono text-sm text-violet-400 tracking-widest uppercase">Let&apos;s Connect</span>
                    <h2 className="mt-2 text-4xl md:text-5xl font-bold">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="mt-4 text-slate-500 max-w-md mx-auto">
                        Open to projects, collaborations, or just geeking out about space science and code.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT: Info + Socials */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-white leading-tight mb-4">
                                Let&apos;s build something{" "}
                                <span className="gradient-text">extraordinary</span> together.
                            </h3>
                            <p className="text-slate-400 leading-relaxed">
                                Whether you have a project in mind, want to collaborate, or just say hi —
                                my inbox is always open. I respond within 24 hours.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-400">
                                <span className="text-violet-400">📍</span> Jalandhar, Punjab, India
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <span className="text-violet-400">📧</span>
                                <a href="mailto:manjeetsingh.codes@gmail.com" className="hover:text-white transition-colors">
                                    manjeetsingh.codes@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <span className="text-violet-400">📞</span>
                                <a href="tel:+917056440985" className="hover:text-white transition-colors">
                                    +91 70564 40985
                                </a>
                            </div>
                        </div>

                        {/* Social icons */}
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-3 glass rounded-xl text-slate-400 transition-all duration-200 ${social.color} hover:shadow-lg`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.35 }}
                        className="glass rounded-2xl p-8"
                    >
                        <AnimatePresence mode="wait">
                            {submitState === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-72 text-center"
                                >
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                                        <HiCheck className="text-green-400 text-3xl" />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                    <p className="text-slate-400">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                                    <button
                                        onClick={() => { setSubmitState("idle"); setForm({ name: "", email: "", message: "" }); }}
                                        className="mt-6 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                                    >
                                        Send another →
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-slate-200 placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-slate-200 placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            placeholder="Tell me about your project..."
                                            className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 text-slate-200 placeholder-slate-600 outline-none focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitState === "loading"}
                                        className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 hover:-translate-y-0.5"
                                    >
                                        {submitState === "loading" ? (
                                            <>
                                                <BiLoader className="animate-spin" size={20} />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message ✦"
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
