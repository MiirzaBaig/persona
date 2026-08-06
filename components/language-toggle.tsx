"use client";

import { motion } from "framer-motion";
import { useLanguage } from "./language-provider";
import { nav as navCopy, LANGUAGES } from "@/lib/i18n";

interface LanguageToggleProps {
  /** Larger pill for the mobile menu; compact for the desktop bar. */
  size?: "sm" | "lg";
  className?: string;
}

// A two-segment EN / ع pill. A SINGLE persistent highlight sits behind both
// labels and slides to the active side — always rendered, so the active label
// never ends up as white text on a white background.
export default function LanguageToggle({ size = "sm", className = "" }: LanguageToggleProps) {
  const { lang, setLang, mounted } = useLanguage();
  const t = navCopy[lang];

  // Before mount, assume English so SSR and first paint agree.
  const activeCode = mounted ? lang : "en";
  const activeIndex = LANGUAGES.findIndex((l) => l.code === activeCode);

  const pad = size === "lg" ? "p-1" : "p-0.5";
  const cell = size === "lg" ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-xs";

  return (
    <div
      role="group"
      aria-label={t.toggleLanguage}
      dir="ltr"
      className={`relative inline-flex items-center rounded-full border border-zinc-200 bg-white/70 ${pad} backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 ${className}`}
    >
      {/* Persistent sliding highlight — one element covering half the track,
          slid to the active segment with a GPU transform (no layout thrash).
          `translateX(activeIndex * 100%)` moves it exactly one segment over. */}
      <div className="pointer-events-none absolute inset-y-[3px] left-[3px] right-[3px] z-0">
        <motion.span
          className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-zinc-950 dark:bg-white"
          initial={false}
          animate={{ x: `${activeIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.8 }}
        />
      </div>

      {LANGUAGES.map((option) => {
        const active = activeCode === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={option.label}
            className={`relative z-10 flex-1 rounded-full text-center font-display font-semibold leading-none tracking-[-0.02em] transition-colors duration-300 ${cell} ${
              active
                ? "text-white dark:text-zinc-950"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            {option.native}
          </button>
        );
      })}
    </div>
  );
}
