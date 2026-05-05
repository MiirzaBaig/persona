"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

const navLinks = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Timeline" },
  { href: "#stack", label: "Stack" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 px-4"
      >
        <div
          className={`mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border px-3 pl-5 transition-all duration-300 ${
            scrolled
              ? "border-zinc-200 bg-white/82 shadow-[0_18px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl dark:border-zinc-800 dark:bg-zinc-950/78"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 rounded-full pr-2 text-zinc-950 transition dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-full bg-zinc-950 text-[11px] font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.14)] transition group-hover:-rotate-6 group-hover:scale-105 dark:bg-white dark:text-zinc-950">
              <motion.span
                initial={{ y: 0 }}
                whileHover={{ y: -18 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span>MB</span>
                <span>~/</span>
              </motion.span>
            </span>
            <span className="relative h-5 overflow-hidden font-mono text-sm font-semibold tracking-[-0.04em]">
              <motion.span
                initial={false}
                whileHover={{ y: -20 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col"
              >
                <span className="inline-flex items-center gap-0.5">
                  <span className="text-blue-600 dark:text-blue-400">$</span>
                  mirza
                  <span className="ml-0.5 inline-block h-4 w-[6px] animate-pulse rounded-[1px] bg-blue-600 dark:bg-blue-400" />
                </span>
                <span className="inline-flex items-center gap-0.5 text-blue-600 dark:text-blue-400">
                  ./ship
                  <span className="ml-0.5 inline-block h-4 w-[6px] animate-pulse rounded-[1px] bg-zinc-950 dark:bg-white" />
                </span>
              </motion.span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={toggleTheme}
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="mailto:mirza.devs@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              <Mail size={15} />
              Hire me
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(12px)" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/94 px-6 pt-28 backdrop-blur-2xl dark:bg-zinc-950/94 md:hidden"
          >
            <div className="mx-auto max-w-sm">
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="block rounded-3xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-2xl font-semibold tracking-tight text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="mailto:mirza.devs@gmail.com"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-zinc-950 px-5 py-4 text-sm font-semibold text-white dark:bg-white dark:text-zinc-950"
              >
                <Mail size={17} />
                Let&apos;s talk
              </motion.a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Nav;
