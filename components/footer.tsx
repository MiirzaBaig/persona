"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "./language-provider";
import { footer as footerCopy } from "@/lib/i18n";

const VISIT_KEY = "mb-visit-count";

// English ordinal suffix: 1st, 2nd, 3rd, 4th, 11th, 21st...
const ordinal = (n: number) => {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};

const socialLinks = [
  { href: "https://github.com/MiirzaBaig", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/mirza-baig-590b1826b/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  { href: "https://x.com/Miirzabaig", label: "X", icon: Twitter },
  { href: "mailto:mirza.devs@gmail.com", label: "Email", icon: Mail },
];

const Footer = () => {
  const { lang } = useLanguage();
  // null until we've read localStorage (avoids SSR/hydration flash)
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let next = 1;
    try {
      const prev = Number(window.localStorage.getItem(VISIT_KEY)) || 0;
      next = prev + 1;
      window.localStorage.setItem(VISIT_KEY, String(next));
    } catch {
      // storage blocked (private mode, etc.) — just show first visit
    }
    setVisits(next);
  }, []);

  // Split the copy around {count} so the number can animate on its own.
  const isReturn = visits !== null && visits > 1;
  const count = visits === null ? "" : lang === "ar" ? String(visits) : ordinal(visits);
  const [labelBefore, labelAfter] = isReturn
    ? footerCopy[lang].visitReturn.split("{count}")
    : [footerCopy[lang].visitFirst, ""];
  const hasLabel = visits !== null;

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-display text-sm font-medium tracking-[-0.03em] text-zinc-500 dark:text-zinc-400">
              {footerCopy[lang].tagline}
            </span>
            <motion.span
              className="group inline-flex w-fit cursor-default items-center gap-1.5 font-mono text-xs tracking-tight text-zinc-500 dark:text-zinc-400"
              initial={{ opacity: 0, y: 6 }}
              animate={hasLabel ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              whileHover={{ y: -1 }}
              suppressHydrationWarning
            >
              <motion.span
                className="relative flex size-1.5"
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 600, damping: 15 }}
              >
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </motion.span>
              <span suppressHydrationWarning>
                {labelBefore}
                {isReturn && (
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={count}
                      className="inline-block font-semibold text-emerald-600 dark:text-emerald-400"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 600, damping: 24 }}
                    >
                      {count}
                    </motion.span>
                  </AnimatePresence>
                )}
                {labelAfter}
              </span>
            </motion.span>
          </div>

          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group inline-flex size-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
              >
                <link.icon
                  size={16}
                  className="group-hover:animate-icon-pop"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
