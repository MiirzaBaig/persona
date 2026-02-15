"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

const COUNTAPI_NAMESPACE = "persona-site";
const COUNTAPI_KEY = "views";
const SESSION_KEY = "viewCounterHit";
const COUNT_UP_DURATION_MS = 1200;
const DUMMY_COUNT = 1400;

function formatCount(value: number): string {
  if (value >= 1_000_000) {
    const n = value / 1_000_000;
    const s = n % 1 === 0 ? String(Math.floor(n)) : n.toFixed(1).replace(".", ",");
    return s + "M";
  }
  if (value >= 1_000) {
    const n = value / 1_000;
    const s = n % 1 === 0 ? String(Math.floor(n)) : n.toFixed(1).replace(".", ",");
    return s + "k";
  }
  return value.toLocaleString();
}

export default function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(DUMMY_COUNT);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const hitAlready = typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_KEY);
        if (!hitAlready) {
          const hitRes = await fetch(
            `https://api.countapi.xyz/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`
          );
          if (!hitRes.ok) return;
          const hitData = (await hitRes.json()) as { value?: number };
          if (typeof sessionStorage !== "undefined") {
            sessionStorage.setItem(SESSION_KEY, "1");
          }
          if (!cancelled && typeof hitData.value === "number") {
            setCount(hitData.value);
            return;
          }
        }

        const getRes = await fetch(
          `https://api.countapi.xyz/get/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`
        );
        if (!getRes.ok) return;
        const getData = (await getRes.json()) as { value?: number };
        if (!cancelled && typeof getData.value === "number") {
          setCount(getData.value);
        }
      } catch {
        // ignore network errors
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (count === null) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / COUNT_UP_DURATION_MS, 1);
      const eased = 1 - (1 - t) * (1 - t);
      setDisplayCount(Math.round(DUMMY_COUNT + eased * (count - DUMMY_COUNT)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [count]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-40 pointer-events-none"
      aria-label={`Total site visits: ${displayCount}`}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-whiteout border border-blackout/10 text-blackout/70 text-sm font-mono shadow-sm">
        <Eye className="w-3.5 h-3.5 text-blackout/50" strokeWidth={2} aria-hidden />
        <span className="tabular-nums">
          {formatCount(displayCount)}
        </span>
        <span className="text-blackout/50 text-xs">visits</span>
      </div>
    </motion.div>
  );
}
