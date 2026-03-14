"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    FileCode2, FileJson, FileText, ChevronRight, ChevronDown,
    Folder, FolderOpen, GitBranch, AlertCircle, Code,
} from "lucide-react";

// ── File content data ──
const FILES: Record<string, { language: string; icon: React.ReactNode; content: string }> = {
    "personal.ts": {
        language: "typescript",
        icon: <FileCode2 size={14} className="text-blue-400" />,
        content: `interface Engineer {
  name: string;
  location: string;
  education: string;
  stack: string[];
  interests: string[];
}

const manjeet: Engineer = {
  name: "Manjeet Singh",
  location: "Jalandhar, Punjab, India",
  education: "B.E. @ Lovely Professional University",
  stack: [
    "Java", "Spring Boot", "React",
    "TypeScript", "PostgreSQL", "Docker"
  ],
  interests: [
    "System Design",
    "Backend Architecture",
    "Open Source",
  ],
};

export default manjeet;`,
    },
    "philosophy.md": {
        language: "markdown",
        icon: <FileText size={14} className="text-zinc-400" />,
        content: `# Engineering Philosophy

## Build with intention
Every line of code should serve a purpose.
No over-engineering. No premature abstraction.
Ship fast, iterate, refine.

## Performance is not optional
If it's slow, it's broken.
Measure first, optimize second.

## Code is communication
Write for the next engineer.
Clear naming > clever tricks.
Documentation is a feature.

## Ship or it doesn't exist
A perfect design in your head
is worth less than a working MVP
in production.`,
    },
    "currently.json": {
        language: "json",
        icon: <FileJson size={14} className="text-yellow-400" />,
        content: `{
  "status": "available",
  "building": [
    "Full-stack web applications",
    "REST APIs with Spring Boot",
    "React frontends with Next.js"
  ],
  "learning": [
    "AWS Cloud Architecture",
    "System Design Patterns",
    "Kubernetes & Container Orchestration"
  ],
  "tools": {
    "editor": "IntelliJ IDEA + VS Code",
    "terminal": "Windows Terminal + Git Bash",
    "design": "Figma"
  },
  "open_to": [
    "Full-time roles",
    "Freelance projects",
    "Open source collaboration"
  ]
}`,
    },
};

const FILE_NAMES = Object.keys(FILES);

// ── Syntax coloring ──
function SyntaxLine({ line, language }: { line: string; language: string }) {
    if (language === "json") {
        return <JsonLine line={line} />;
    }
    if (language === "markdown") {
        return <MarkdownLine line={line} />;
    }
    return <TypeScriptLine line={line} />;
}

function TypeScriptLine({ line }: { line: string }) {
    if (line.trimStart().startsWith("//")) {
        return <span className="text-zinc-600 italic">{line}</span>;
    }

    const tokens: React.ReactNode[] = [];
    const regex = /("(?:[^"\\]|\\.)*")|(\b(?:interface|const|export|default|import|from|string|number|boolean|let|var|function|return|type)\b)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(line)) !== null) {
        // Push text before this match
        if (match.index > lastIndex) {
            tokens.push(<span key={key++} className="text-zinc-300">{line.slice(lastIndex, match.index)}</span>);
        }
        if (match[1]) {
            // String literal
            tokens.push(<span key={key++} className="text-emerald-400">{match[0]}</span>);
        } else if (match[2]) {
            // Keyword
            tokens.push(<span key={key++} className="text-purple-400">{match[0]}</span>);
        }
        lastIndex = regex.lastIndex;
    }
    // Remaining text
    if (lastIndex < line.length) {
        tokens.push(<span key={key++} className="text-zinc-300">{line.slice(lastIndex)}</span>);
    }
    if (tokens.length === 0) {
        tokens.push(<span key={0} className="text-zinc-300">{line}</span>);
    }

    return <>{tokens}</>;
}

function JsonLine({ line }: { line: string }) {
    const tokens: React.ReactNode[] = [];
    // Match JSON keys (followed by :) and string values separately
    const regex = /("(?:[^"\\]|\\.)*")(\s*:)?/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
            tokens.push(<span key={key++} className="text-zinc-300">{line.slice(lastIndex, match.index)}</span>);
        }
        if (match[2]) {
            // Key (followed by colon)
            tokens.push(<span key={key++} className="text-blue-400">{match[1]}</span>);
            tokens.push(<span key={key++} className="text-zinc-500">{match[2]}</span>);
        } else {
            // String value
            tokens.push(<span key={key++} className="text-emerald-400">{match[1]}</span>);
        }
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < line.length) {
        tokens.push(<span key={key++} className="text-zinc-300">{line.slice(lastIndex)}</span>);
    }
    if (tokens.length === 0) {
        tokens.push(<span key={0} className="text-zinc-300">{line}</span>);
    }
    return <>{tokens}</>;
}

function MarkdownLine({ line }: { line: string }) {
    if (line.startsWith("# ")) {
        return <span className="text-emerald-400 font-bold">{line}</span>;
    }
    if (line.startsWith("## ")) {
        return <span className="text-blue-400 font-semibold">{line}</span>;
    }
    return <span className="text-zinc-400">{line}</span>;
}

// ── File tree ──
const TREE = [
    {
        type: "folder", name: "src", children: [
            {
                type: "folder", name: "data", children: [
                    { type: "file", name: "personal.ts" },
                    { type: "file", name: "philosophy.md" },
                    { type: "file", name: "currently.json" },
                ]
            },
            { type: "folder", name: "components", children: [] },
            { type: "folder", name: "styles", children: [] },
        ]
    },
];

function FileTree({ activeFile, onSelect }: { activeFile: string; onSelect: (f: string) => void }) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({ src: true, "src/data": true });

    const toggle = (path: string) => setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));

    const renderNode = (node: any, path: string = "", depth: number = 0) => {
        const fullPath = path ? `${path}/${node.name}` : node.name;
        const isOpen = expanded[fullPath];
        const isFile = node.type === "file";
        const isActive = isFile && node.name === activeFile;

        return (
            <div key={fullPath}>
                <button
                    onClick={() => {
                        if (isFile) onSelect(node.name);
                        else toggle(fullPath);
                    }}
                    className={`w-full flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono hover:bg-white/5 rounded transition-colors ${isActive ? "bg-accent/10 text-accent" : "text-zinc-500"
                        }`}
                    style={{ paddingLeft: `${depth * 12 + 8}px` }}
                    data-cursor="button"
                >
                    {!isFile && (isOpen ? <ChevronDown size={10} /> : <ChevronRight size={10} />)}
                    {!isFile && (isOpen ? <FolderOpen size={12} className="text-zinc-500" /> : <Folder size={12} className="text-zinc-500" />)}
                    {isFile && FILES[node.name]?.icon}
                    {node.name}
                </button>
                {!isFile && isOpen && node.children?.map((child: any) => renderNode(child, fullPath, depth + 1))}
            </div>
        );
    };

    return <div className="py-2">{TREE.map((node) => renderNode(node))}</div>;
}

export default function AboutSection() {
    const [activeFile, setActiveFile] = useState("personal.ts");
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const file = FILES[activeFile];
    const lines = file.content.split("\n");

    return (
        <section id="about" className="section-pad">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <span className="font-mono text-xs text-accent tracking-widest uppercase">About</span>
                    <h2 className="mt-2 text-3xl md:text-5xl font-geist font-bold">
                        About <span className="text-stroke">Me</span>
                    </h2>
                </motion.div>

                {/* IDE Window */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-xl border border-border overflow-hidden bg-bg-surface shadow-2xl shadow-black/50"
                >
                    {/* Tab bar */}
                    <div className="flex items-center border-b border-border bg-bg">
                        {FILE_NAMES.map((name) => (
                            <button
                                key={name}
                                onClick={() => setActiveFile(name)}
                                className={`relative flex items-center gap-1.5 px-4 py-2.5 text-[11px] font-mono border-r border-border transition-colors ${activeFile === name
                                    ? "bg-bg-surface text-zinc-200"
                                    : "text-zinc-600 hover:text-zinc-400 hover:bg-bg-surface/50"
                                    }`}
                                data-cursor="button"
                            >
                                {activeFile === name && (
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />
                                )}
                                {FILES[name].icon}
                                {name}
                            </button>
                        ))}
                        <div className="flex-1" />
                    </div>

                    <div className="flex min-h-[420px]">
                        {/* File explorer sidebar */}
                        <div className="hidden md:block w-48 border-r border-border bg-bg shrink-0">
                            <div className="px-3 py-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                                Explorer
                            </div>
                            <FileTree activeFile={activeFile} onSelect={setActiveFile} />
                        </div>

                        {/* Editor area */}
                        <div className="flex-1 overflow-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFile}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-4"
                                >
                                    <pre className="font-mono text-[12px] md:text-[13px] leading-relaxed">
                                        {lines.map((line, i) => (
                                            <div key={i} className="flex">
                                                <span className="w-8 text-right pr-4 text-zinc-700 select-none shrink-0 text-[11px]">
                                                    {i + 1}
                                                </span>
                                                <SyntaxLine line={line} language={file.language} />
                                            </div>
                                        ))}
                                        {/* Blinking cursor on last line */}
                                        <div className="flex">
                                            <span className="w-8 text-right pr-4 text-zinc-700 select-none shrink-0 text-[11px]">
                                                {lines.length + 1}
                                            </span>
                                            <span className="animate-blink text-accent">|</span>
                                        </div>
                                    </pre>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="flex items-center justify-between px-4 py-1 border-t border-border bg-bg text-[10px] font-mono text-zinc-600">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <GitBranch size={10} /> main
                            </span>
                            <span className="flex items-center gap-1">
                                <AlertCircle size={10} /> 0 errors
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>{file.language === "typescript" ? "TypeScript" : file.language === "json" ? "JSON" : "Markdown"}</span>
                            <span>UTF-8</span>
                            <span>LF</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
