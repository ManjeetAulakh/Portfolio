"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });
    const [cursorState, setCursorState] = useState<"default" | "button" | "text" | "canvas">("default");
    const [visible, setVisible] = useState(false);

    const onMouseMove = useCallback((e: MouseEvent) => {
        mouse.current = { x: e.clientX, y: e.clientY };
        if (!visible) setVisible(true);
    }, [visible]);

    useEffect(() => {
        // Detect touch device
        if ("ontouchstart" in window) return;

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", () => setVisible(false));
        window.addEventListener("mouseenter", () => setVisible(true));

        let raf: number;
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const animate = () => {
            pos.current.x = lerp(pos.current.x, mouse.current.x, 0.15);
            pos.current.y = lerp(pos.current.y, mouse.current.y, 0.15);

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
            }
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
            }
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        // Hover state detection
        const detectHover = () => {
            const interactiveSelector = "a, button, [role='button'], input, textarea, select, [data-cursor='button']";
            const textSelector = "p, h1, h2, h3, h4, h5, h6, span, li, [data-cursor='text']";
            const canvasSelector = "canvas, [data-cursor='canvas']";

            document.addEventListener("mouseover", (e) => {
                const target = e.target as HTMLElement;
                if (target.closest(canvasSelector)) setCursorState("canvas");
                else if (target.closest(interactiveSelector)) setCursorState("button");
                else if (target.closest(textSelector)) setCursorState("text");
                else setCursorState("default");
            });
        };
        detectHover();

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(raf);
        };
    }, [onMouseMove]);

    const ringSize = cursorState === "button" ? 48 : cursorState === "text" ? 8 : 40;
    const ringBg =
        cursorState === "button"
            ? "rgba(16,185,129,0.15)"
            : "transparent";
    const ringBorder =
        cursorState === "button"
            ? "1.5px solid rgba(16,185,129,0.5)"
            : cursorState === "text"
                ? "1.5px solid rgba(16,185,129,0.3)"
                : "1.5px solid rgba(255,255,255,0.15)";

    return (
        <>
            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#10b981",
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.2s",
                }}
            />
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: ringSize,
                    height: ringSize,
                    borderRadius: cursorState === "text" ? "2px" : "50%",
                    border: ringBorder,
                    background: ringBg,
                    opacity: visible ? 1 : 0,
                    transition: "width 0.25s, height 0.25s, border-radius 0.25s, background 0.25s, border 0.25s, opacity 0.2s",
                    marginLeft: cursorState === "text" ? 16 : 0,
                    marginTop: cursorState === "text" ? 12 : 0,
                }}
            />
        </>
    );
}
