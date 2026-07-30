import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        whiteout: "#F7F7F7",
        blackout: "#080808",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)"],
        display: ["var(--font-space-grotesk)"],
        mono: ["var(--font-geist-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "minimal-pulse": {
          "0%, 100%": { opacity: "1", scale: "1.01" },
          "50%": { opacity: "0.9", scale: "1" },
        },
        "icon-lift": {
          "0%": { transform: "translateY(0) rotate(0deg)" },
          "55%": { transform: "translateY(-4px) rotate(-9deg)" },
          "100%": { transform: "translateY(-1.5px) rotate(-5deg)" },
        },
        "icon-arrow": {
          "0%": { transform: "translate(0, 0)" },
          "55%": { transform: "translate(4px, -4px)" },
          "100%": { transform: "translate(2px, -2px)" },
        },
        "icon-download": {
          "0%": { transform: "translateY(0)" },
          "55%": { transform: "translateY(4px)" },
          "100%": { transform: "translateY(1.5px)" },
        },
        "icon-pop": {
          "0%": { transform: "translateY(0) scale(1)" },
          "55%": { transform: "translateY(-4px) scale(1.14)" },
          "100%": { transform: "translateY(-2px) scale(1.08)" },
        },
        "icon-send": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "55%": { transform: "translate(5px, -5px) rotate(12deg)" },
          "100%": { transform: "translate(2px, -2px) rotate(6deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "minimal-pulse": "minimal-pulse 2s ease-in-out infinite",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-out",
        "icon-lift": "icon-lift 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "icon-arrow": "icon-arrow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "icon-download":
          "icon-download 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "icon-pop": "icon-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "icon-send": "icon-send 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      },
      boxShadow: {
        neobrutalism: "4px 4px 0px 0px rgba(0,0,0,1)",
        "neobrutalism-dark": "4px 4px 0px 0px rgba(255,255,255,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
