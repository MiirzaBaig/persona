"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Language } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: "ltr" | "rtl";
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
  dir: "ltr",
  mounted: false,
});

const dirFor = (lang: Language): "ltr" | "rtl" => (lang === "ar" ? "rtl" : "ltr");

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  const apply = (next: Language) => {
    const root = document.documentElement;
    root.setAttribute("lang", next);
    root.setAttribute("dir", dirFor(next));
  };

  useEffect(() => {
    setMounted(true);
    // English is the default for first-time visitors; only a stored choice
    // overrides it.
    const stored = localStorage.getItem("lang") as Language | null;
    const initial: Language = stored === "ar" ? "ar" : "en";
    setLangState(initial);
    apply(initial);
  }, []);

  const setLang = (next: Language) => {
    if (next === lang) return;
    localStorage.setItem("lang", next);

    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setLangState(next);
      apply(next);
      return;
    }

    // Fade content out, swap language + direction at the trough, then fade
    // back in — a smooth cross-fade with no remounting (see globals.css).
    root.classList.add("lang-fading");
    window.setTimeout(() => {
      setLangState(next);
      apply(next);
      // Next frame, drop the fading class so it eases back to full opacity.
      requestAnimationFrame(() => root.classList.remove("lang-fading"));
    }, 200);
  };

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, toggleLang, dir: dirFor(lang), mounted }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
