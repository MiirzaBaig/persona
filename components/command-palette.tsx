"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User,
  Briefcase,
  Clock,
  Wrench,
  Mail,
  Download,
  Moon,
  Sun,
  Globe2,
  Command,
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { useLanguage } from "./language-provider";
import { commandPalette as cmdCopy } from "@/lib/i18n";

type CmdItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme, mounted } = useTheme();
  const { lang, setLang } = useLanguage();
  const t = cmdCopy[lang];

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const items: CmdItem[] = useMemo(
    () => [
      {
        id: "about",
        label: t.about,
        icon: User,
        action: () => scrollTo("about"),
        keywords: "about bio",
      },
      {
        id: "projects",
        label: t.projects,
        icon: Briefcase,
        action: () => scrollTo("projects"),
        keywords: "work portfolio",
      },
      {
        id: "experience",
        label: t.experience,
        icon: Clock,
        action: () => scrollTo("experience"),
        keywords: "timeline jobs career",
      },
      {
        id: "stack",
        label: t.stack,
        icon: Wrench,
        action: () => scrollTo("stack"),
        keywords: "tools tech",
      },
      {
        id: "contact",
        label: t.contact,
        icon: Mail,
        action: () => scrollTo("contact"),
        keywords: "email hire",
      },
      {
        id: "cv",
        label: t.downloadCv,
        icon: Download,
        action: () => {
          setOpen(false);
          window.open("/Mirza-Ismail-Baig-CV.pdf", "_blank");
        },
        keywords: "resume cv download",
      },
      {
        id: "theme",
        label:
          mounted && theme === "dark" ? t.lightMode : t.darkMode,
        icon: mounted && theme === "dark" ? Sun : Moon,
        action: () => {
          toggleTheme();
          setOpen(false);
        },
        keywords: "dark light mode theme",
      },
      {
        id: "language",
        label: lang === "en" ? t.switchLang : t.switchLang,
        icon: Globe2,
        action: () => {
          setLang(lang === "en" ? "ar" : "en");
          setOpen(false);
        },
        keywords: "language arabic english",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, theme, mounted, lang],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.keywords && item.keywords.toLowerCase().includes(q)),
    );
  }, [items, query]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset active index when filtered results change
  useEffect(() => {
    setActiveIndex(0);
  }, [filtered.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      filtered[activeIndex].action();
    }
  };

  return (
    <>
      {/* Trigger hint — hidden on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 start-6 z-50 hidden items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3 py-2 text-xs font-medium text-zinc-500 shadow-md backdrop-blur-md transition-all hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200 sm:inline-flex"
        aria-label="Open command palette"
      >
        <Command size={13} />
        <span className="font-mono">⌘K</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
              }}
              className="fixed inset-x-4 top-[15vh] z-[80] mx-auto max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-700">
                <Search
                  size={18}
                  className="shrink-0 text-zinc-400 dark:text-zinc-500"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.placeholder}
                  className="h-14 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-zinc-500"
                />
                <kbd className="hidden shrink-0 rounded-md border border-zinc-200 bg-zinc-100 px-2 py-1 font-mono text-[10px] font-medium text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 sm:inline-block">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-zinc-400 dark:text-zinc-500">
                    {t.noResults}
                  </p>
                ) : (
                  filtered.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-start text-sm transition-colors ${
                        i === activeIndex
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                          : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <item.icon size={17} className="shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-2.5 dark:border-zinc-700">
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
                  <span>↑↓ {t.navigate}</span>
                  <span>↵ {t.select}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
