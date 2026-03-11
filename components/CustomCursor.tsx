"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let raf: number;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        };

        const loop = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
            raf = requestAnimationFrame(loop);
        };

        const onMouseEnterInteractive = () => {
            ring.style.width = "52px";
            ring.style.height = "52px";
            ring.style.borderColor = "rgba(168,85,247,0.8)";
            ring.style.background = "rgba(124,58,237,0.1)";
        };

        const onMouseLeaveInteractive = () => {
            ring.style.width = "40px";
            ring.style.height = "40px";
            ring.style.borderColor = "rgba(124,58,237,0.6)";
            ring.style.background = "transparent";
        };

        const addListeners = () => {
            const interactives = document.querySelectorAll("a, button, [data-cursor]");
            interactives.forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnterInteractive);
                el.addEventListener("mouseleave", onMouseLeaveInteractive);
            });
        };

        document.addEventListener("mousemove", onMouseMove);
        addListeners();
        raf = requestAnimationFrame(loop);

        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(raf);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-violet-500 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-none"
                style={{ willChange: "transform" }}
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998] border border-violet-500/60"
                style={{
                    willChange: "transform",
                    transition: "width 0.2s, height 0.2s, border-color 0.2s, background 0.2s",
                }}
            />
        </>
    );
}
