import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
                mono: ["var(--font-jetbrains)"],
            },
            colors: {
                bg: "#0a0a0f",
                surface: "#111117",
                "surface-2": "#1a1a24",
                accent: "#7c3aed",
                "accent-2": "#06b6d4",
                muted: "#64748b",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "accent-gradient": "linear-gradient(135deg, #7c3aed, #a855f7, #06b6d4)",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-50%)" },
                    "100%": { transform: "translateX(0%)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                "pulse-ring": {
                    "0%": { transform: "scale(1)", opacity: "0.8" },
                    "100%": { transform: "scale(1.8)", opacity: "0" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                blink: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% center" },
                    "100%": { backgroundPosition: "200% center" },
                },
            },
            animation: {
                marquee: "marquee 30s linear infinite",
                "marquee-reverse": "marquee-reverse 25s linear infinite",
                float: "float 3s ease-in-out infinite",
                "float-delay-1": "float 3.5s ease-in-out 0.5s infinite",
                "float-delay-2": "float 4s ease-in-out 1s infinite",
                "float-delay-3": "float 3.2s ease-in-out 1.5s infinite",
                "float-delay-4": "float 3.8s ease-in-out 0.3s infinite",
                "pulse-ring": "pulse-ring 1.5s ease-out infinite",
                "spin-slow": "spin-slow 8s linear infinite",
                blink: "blink 1s step-end infinite",
                shimmer: "shimmer 2.5s linear infinite",
            },
        },
    },
    plugins: [],
};
export default config;
