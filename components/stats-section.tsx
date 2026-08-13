"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "./language-provider";
import { stats as statsCopy, type Language } from "@/lib/i18n";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  startCounting,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  startCounting: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [startCounting, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const { lang } = useLanguage();
  const t = statsCopy[lang];

  return (
    <section ref={ref} className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {t.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-zinc-200/80 bg-white/60 p-6 text-center backdrop-blur-sm transition-colors hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-900"
            >
              <div className="font-display text-3xl font-bold tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-4xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  startCounting={isInView}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
