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
        sans: ["var(--font-geist-sans)"],
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "minimal-pulse": "minimal-pulse 2s ease-in-out infinite",
        "slide-in-from-top": "slide-in-from-top 0.2s ease-out",
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
