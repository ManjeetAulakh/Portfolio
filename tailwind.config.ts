import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                geist: ["var(--font-geist-sans)"],
                mono: ["var(--font-geist-mono)"],
                inter: ["var(--font-inter)"],
            },
            colors: {
                bg: {
                    DEFAULT: "#09090b",
                    surface: "#111113",
                    elevated: "#18181b",
                    hover: "#1f1f23",
                },
                accent: {
                    DEFAULT: "#10b981",
                    light: "#34d399",
                    dark: "#059669",
                    muted: "rgba(16,185,129,0.12)",
                },
                border: {
                    DEFAULT: "rgba(255,255,255,0.06)",
                    hover: "rgba(255,255,255,0.12)",
                    accent: "rgba(16,185,129,0.3)",
                },
            },
            keyframes: {
                "glitch": {
                    "0%, 100%": { transform: "translateX(0)" },
                    "20%": { transform: "translateX(-2px)" },
                    "40%": { transform: "translateX(2px)" },
                    "60%": { transform: "translateX(-1px)" },
                    "80%": { transform: "translateX(1px)" },
                },
                "flip-in": {
                    "0%": { transform: "rotateX(90deg)", opacity: "0" },
                    "100%": { transform: "rotateX(0deg)", opacity: "1" },
                },
                "flip-out": {
                    "0%": { transform: "rotateX(0deg)", opacity: "1" },
                    "100%": { transform: "rotateX(-90deg)", opacity: "0" },
                },
                "blink": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                "marquee": {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                "sweep": {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                "float": {
                    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
                    "50%": { transform: "translateY(-10px) rotate(3deg)" },
                },
            },
            animation: {
                "glitch": "glitch 0.3s ease-in-out",
                "flip-in": "flip-in 0.4s ease-out forwards",
                "flip-out": "flip-out 0.3s ease-in forwards",
                "blink": "blink 1s step-end infinite",
                "marquee": "marquee var(--marquee-duration, 30s) linear infinite",
                "marquee-reverse": "marquee-reverse var(--marquee-duration, 30s) linear infinite",
                "sweep": "sweep 0.6s ease forwards",
                "float": "float 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;
