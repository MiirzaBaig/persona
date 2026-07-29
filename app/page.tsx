"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import HeroThree from "@/components/hero-three";
import {
  ArrowUpRight,
  Github,
  Globe2,
  Linkedin,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const profile = {
  name: "Mirza Baig",
  email: "mirza.devs@gmail.com",
  github: "https://github.com/MiirzaBaig",
  linkedin: "https://www.linkedin.com/in/mirza-baig-590b1826b/",
  saas: "https://aithesiswriter.io",
};

const headlines = [
  "Shipping mode, always.",
  "50 agents running. One human reviewing.",
  "Backend brain. Frontend taste.",
  "Web3 dashboards without the chaos.",
  "Fast builds. Clean commits.",
  "Less yap. More deploys.",
];

const projects = [
  {
    name: "Revise",
    type: "AI Document Editor",
    status: "In progress",
    href: "https://revise.example.com",
    label: "retrieval core",
    vibe: "Every edit deserves your approval — nothing moves without it.",
    line: "AI document platform for retrieval-heavy workflows — reads long documents, discusses them in context, and proposes changes as tracked, reviewable edits with full revision history.",
    stack: ["Next.js", "TypeScript", "RAG", "Vector DB"],
    accent:
      "from-indigo-500/20 via-blue-500/10 to-slate-500/18 dark:from-indigo-400/18 dark:via-blue-400/10 dark:to-slate-400/16",
  },
  {
    name: "aithesiswriter.io",
    type: "Live SaaS",
    href: "https://aithesiswriter.io",
    previewImage: "/previews/aithesiswriter.png",
    label: "revenue flow",
    vibe: "Built to convert, retain, and export without friction.",
    line: "Academic writing product with billing, exports, citations, and multilingual document generation.",
    stack: ["Next.js", "TypeScript", "Stripe", "Supabase"],
    accent:
      "from-sky-500/20 via-blue-500/10 to-cyan-500/20 dark:from-sky-400/18 dark:via-blue-400/10 dark:to-cyan-400/18",
  },
  {
    name: "Tokamak Chain Monitor",
    type: "Observability",
    href: "https://tokamak-chain-monitor.vercel.app/chains",
    label: "ops core",
    vibe: "Dense data, fast scanning, zero dashboard soup.",
    line: "L2 monitoring dashboard with live chain health, fee trends, fallback RPCs, and PDF reporting.",
    stack: ["Next.js 15", "Viem", "TanStack Query", "Tailwind"],
    accent:
      "from-emerald-500/18 via-teal-500/8 to-cyan-500/18 dark:from-emerald-400/16 dark:via-teal-400/8 dark:to-cyan-400/16",
  },
  {
    name: "Computer Use Agent",
    type: "Automation",
    href: "https://ai-sdk-computer-use-theta-dun.vercel.app",
    previewImage: "/previews/computer-use-agent.png",
    label: "agent loop",
    vibe: "Experimental UI, but the control surface stays readable.",
    line: "Browser-control experiment with action streaming, screenshot loops, and human checkpoints.",
    stack: ["Next.js", "TypeScript", "Vercel"],
    accent:
      "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20 dark:from-fuchsia-400/18 dark:via-pink-400/10 dark:to-rose-400/18",
  },
  {
    name: "SolTerminal",
    type: "DeFi",
    href: "https://sol-terminal-six.vercel.app/",
    label: "power user",
    vibe: "High-signal trading UI without looking like a casino.",
    line: "Trading terminal with wallet flows, market data, pre-trade analytics, and portfolio views.",
    stack: ["Next.js", "Solana", "Tailwind"],
    accent:
      "from-violet-500/20 via-indigo-500/10 to-sky-500/16 dark:from-violet-400/18 dark:via-indigo-400/10 dark:to-sky-400/16",
  },
  {
    name: "Mathly",
    type: "Education",
    href: "https://mathbuddy.ai/",
    label: "student-first",
    vibe: "Calm UX, clear paths, no clutter tax on learners.",
    line: "Math practice platform with adaptive problems, progress tracking, and a clean student UI.",
    stack: ["Next.js", "TypeScript", "React"],
    accent:
      "from-amber-500/18 via-orange-500/10 to-yellow-500/20 dark:from-amber-400/16 dark:via-orange-400/10 dark:to-yellow-400/18",
  },
  {
    name: "AI Comic Creator",
    type: "AI Creative",
    href: "https://ai-comic-nextjs.vercel.app/",
    label: "visual gen",
    vibe: "Story in, comic out — consistent characters across every panel.",
    line: "AI-powered comic generation platform that transforms prompts into publication-ready panels with character consistency, panel-level editing, and multiple export formats.",
    stack: ["Next.js", "TypeScript", "AI", "Vercel"],
    accent:
      "from-purple-500/20 via-indigo-500/10 to-violet-500/18 dark:from-purple-400/18 dark:via-indigo-400/10 dark:to-violet-400/16",
  },
  {
    name: "AI Course Creator",
    type: "EdTech SaaS",
    href: "https://aicoursecreator.com/",
    label: "curriculum engine",
    vibe: "Conversational course design that keeps the whole curriculum in sync.",
    line: "AI-driven curriculum builder with guided workflows, coherent module networks, real-time editing, and source material uploads for educators.",
    stack: ["React", "TypeScript", "Node.js", "AI"],
    accent:
      "from-teal-500/20 via-emerald-500/10 to-green-500/18 dark:from-teal-400/18 dark:via-emerald-400/10 dark:to-green-400/16",
  },
];

const otherWork = [
  {
    name: "Avelia",
    type: "UI Experiment",
    href: "https://avelia.vercel.app/",
    label: "interface lab",
    vibe: "Layout and motion studies with a focus on clean hierarchy.",
    line: "Interface exploration with refined typography, spacing, and subtle interaction patterns.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    accent:
      "from-rose-500/18 via-orange-500/8 to-amber-500/16 dark:from-rose-400/16 dark:via-orange-400/8 dark:to-amber-400/16",
  },
  {
    name: "Forgee",
    type: "UI Experiment",
    href: "https://forgee-taupe.vercel.app/",
    label: "component craft",
    vibe: "Component-first UI with warm tones and deliberate restraint.",
    line: "Design-forward experiment exploring form layouts, cards, and responsive component systems.",
    stack: ["Next.js", "React", "Tailwind"],
    accent:
      "from-stone-500/18 via-amber-500/8 to-orange-500/14 dark:from-stone-400/16 dark:via-amber-400/8 dark:to-orange-400/14",
  },
  {
    name: "Arche",
    type: "UI Experiment",
    href: "https://arche-tau.vercel.app/",
    label: "visual system",
    vibe: "Minimal structure, strong type, and calm visual rhythm.",
    line: "UI prototype built around grid systems, editorial layouts, and polished micro-interactions.",
    stack: ["Next.js", "TypeScript", "CSS"],
    accent:
      "from-slate-500/18 via-zinc-500/8 to-neutral-500/14 dark:from-slate-400/16 dark:via-zinc-400/8 dark:to-neutral-400/14",
  },
] as const;

const experience = [
  {
    company: "PureSoft Labs OÜ",
    role: "Software Engineer",
    type: "",
    period: "Apr 2026 - Present",
    place: "Remote, Estonia",
    line: "Driving full-stack delivery on the core product end to end — shipped a ground-up auth overhaul, cut API response times, and built internal tooling that made deploys faster and way less painful for the whole team.",
    stack: ["TypeScript", "Node.js", "React", "AWS"],
  },
  {
    company: "Cardinal Web 3",
    role: "Founding Engineer",
    type: "",
    period: "May 2026 - Present",
    place: "Remote, UAE",
    line: "Founding engineer building the security layer and smart-contract infra from zero — designed the on-chain monitoring pipeline, wallet integration flows, and a real-time alerting system that catches threats before they hit users.",
    stack: ["Web3", "Solidity", "TypeScript", "Blockchain"],
  },
  {
    company: "exzyt",
    role: "Software Engineer",
    type: "",
    period: "Oct 2025 - Jun 2026",
    place: "Remote, UAE",
    line: "Shipped an M&A deal-room platform end to end — document workflows, granular role-based access, real-time collaboration, and locked-down file sharing that active deal teams now run their live transactions on.",
    stack: ["Next.js", "TypeScript", "Tailwind", "AWS"],
  },
  {
    company: "Stealth Startup",
    role: "Software Engineer",
    type: "",
    period: "Nov 2025 - May 2026",
    place: "Remote, South Korea",
    line: "Owned the commerce engine solo — rebuilt transaction flows to run 3× faster and hunted down the payment-reliability bugs that were silently dropping revenue in production.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    company: "McKinsey & Company",
    role: "Forward Program Fellow",
    type: "",
    period: "Mar 2025 - Sep 2025",
    place: "Remote",
    line: "Handpicked for McKinsey's highly selective Forward Program — sharpened structured problem-solving and executive-level communication, then applied both to real business cases alongside a global cohort.",
    stack: ["Strategy", "Leadership", "Problem Solving"],
  },
  {
    company: "Minimalisticlearning",
    role: "UI/UX Developer",
    type: "",
    period: "Jan 2025 - Jun 2025",
    place: "Remote, UK",
    line: "Rebuilt the student-facing experience from the ground up — shipped a reusable component library, nailed mobile responsiveness, and trimmed page load times to keep learners focused instead of waiting.",
    stack: ["React", "TypeScript", "Redux", "REST"],
  },
  {
    company: "Datapoint",
    role: "Back End Developer",
    type: "",
    period: "Aug 2024 - Dec 2024",
    place: "Remote, India",
    line: "Kept the backend humming — extended Node.js APIs powering auth, partner integrations, and data pipelines, shipped the webhook infrastructure, and tuned queries so the whole system stayed fast under real load.",
    stack: ["Node.js", "Express", "REST", "Databases"],
  },
];

type StackItem = {
  name: string;
  icon?: string;
  fallback?: string;
  invertOnDark?: boolean;
};

type StackGroup = {
  category: string;
  items: StackItem[];
};

const stack: StackGroup[] = [
  {
    category: "Frontend",
    items: [
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        invertOnDark: true,
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      { name: "Zustand", fallback: "Z" },
      {
        name: "Redux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      },
    ],
  },
  {
    category: "Backend",
    items: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        invertOnDark: true,
      },
      { name: "REST", fallback: "REST" },
      {
        name: "GraphQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
      },
      { name: "Webhooks", fallback: "{}" },
      { name: "Auth", fallback: "ID" },
    ],
  },
  {
    category: "Data",
    items: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "Supabase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      },
      {
        name: "Prisma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
        invertOnDark: true,
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
      },
      {
        name: "SQLite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
      },
      { name: "RLS", fallback: "RLS" },
    ],
  },
  {
    category: "Web3",
    items: [
      {
        name: "Solidity",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg",
      },
      {
        name: "Viem",
        fallback: "VM",
      },
      {
        name: "Wagmi",
        fallback: "WG",
      },
      {
        name: "Ethers",
        fallback: "ETH",
      },
      {
        name: "Solana",
        icon: "https://cdn.simpleicons.org/solana/14F195",
      },
      {
        name: "Wallet UX",
        fallback: "W3",
      },
    ],
  },
  {
    category: "Shipping",
    items: [
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        invertOnDark: true,
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "GitHub Actions",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
      },
      {
        name: "Stripe",
        icon: "https://cdn.simpleicons.org/stripe/635BFF",
      },
      {
        name: "AWS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        invertOnDark: true,
      },
      {
        name: "Playwright",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg",
      },
    ],
  },
];

function useRotatingText(items: string[]) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [items.length]);

  return items[index];
}

// Derive a compact monogram (max 2 chars) from a company name.
function monogram(company: string) {
  const words = company
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean);
  if (words.length === 0) return "•";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Local SVG logos dropped into /public/logos — highest priority. Add a company
// here (name -> path) to use its real logo instead of the favicon/monogram.
const COMPANY_LOGOS: Record<string, string> = {
  exzyt: "/logos/exzyt.svg",
  "Cardinal Web 3": "/logos/cardinal.svg",
  "Stealth Startup": "/logos/stealth-startup.svg",
  "McKinsey & Company": "/logos/mckinsey.svg",
  Datapoint: "/logos/datapoint.svg",
  Minimalisticlearning: "/logos/minimalisticlearning.svg",
};

// Logos that carry their own background and should fill the badge edge-to-edge
// (cover) rather than sit padded inside it (contain).
const FULL_BLEED_LOGOS = new Set<string>([
  "McKinsey & Company",
  "Minimalisticlearning",
]);

// Wide wordmark logos — the badge widens to a pill so the full mark stays legible.
const WORDMARK_LOGOS = new Set<string>(["Datapoint"]);

// Icon marks that should fill the badge edge-to-edge over a light surface
// (so transparent areas read as white, not the page background).
const FILL_CONTAIN_LOGOS = new Set<string>([
  "Cardinal Web 3",
  "Stealth Startup",
  "PureSoft Labs OÜ",
]);

// Real brand icons via Google's favicon CDN (token-free) for companies with a
// public site; anything without a local SVG or domain falls back to a monogram.
const COMPANY_DOMAINS: Record<string, string> = {
  "PureSoft Labs OÜ": "plou.eu",
};

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

// A single logo badge — local SVG first, then favicon CDN, then a monogram.
function CompanyLogo({ company }: { company: string }) {
  const localSvg = COMPANY_LOGOS[company];
  const domain = COMPANY_DOMAINS[company];
  const [imgOk, setImgOk] = useState(true);

  const src = localSvg ?? (domain ? faviconUrl(domain) : null);
  const fullBleed = FULL_BLEED_LOGOS.has(company);
  const wordmark = WORDMARK_LOGOS.has(company);

  if (src && imgOk) {
    let className = "size-7 rounded-md object-contain";
    if (fullBleed) className = "size-full object-cover";
    else if (wordmark) className = "h-6 w-full object-contain";
    else if (FILL_CONTAIN_LOGOS.has(company))
      className = `size-full object-contain ${
        company === "Stealth Startup" ? "scale-100" : "scale-[1.18]"
      }`;

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${company} logo`}
        loading="lazy"
        onError={() => setImgOk(false)}
        className={className}
      />
    );
  }

  return (
    <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 font-mono text-[10px] font-bold tracking-tight text-white dark:from-blue-400 dark:to-indigo-400">
      {monogram(company)}
    </span>
  );
}

function TimelineExperience({
  experience,
}: {
  experience: {
    company: string;
    role: string;
    type: string;
    period: string;
    place: string;
    line: string;
    stack: string[];
  }[];
}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  // Map scroll progress -> which company we're currently on, so the badge that
  // rides the progress point can swap to that company's logo as we scroll.
  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(
      experience.length - 1,
      Math.max(0, Math.floor(p * experience.length)),
    );
    setActiveIndex(next);
  });

  const activeCompany = experience[activeIndex]?.company ?? experience[0].company;
  const badgeTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={timelineRef} className="relative mx-auto max-w-4xl">
      {/* Single clean track line with a blue fill that grows on scroll. */}
      <div className="absolute left-0 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          className="absolute inset-x-0 top-0 w-px origin-top bg-blue-500 dark:bg-blue-400"
          style={{ height: "100%", scaleY: scrollYProgress }}
        />
      </div>

      {/* Logo slider — a badge pinned to the moving progress point whose logo
          cross-fades to the current company as the timeline scrolls. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 z-20 flex justify-center"
        style={{ top: badgeTop, x: "-50%" }}
      >
        {/* Soft glow halo so the badge reads as a deliberate focal point. */}
        <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-lg dark:bg-blue-400/20" />
        <div
          className={`relative flex h-10 items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/5 shadow-[0_6px_20px_rgba(37,99,235,0.18)] transition-[width] duration-300 dark:ring-white/10 dark:shadow-[0_6px_22px_rgba(37,99,235,0.35)] ${
            WORDMARK_LOGOS.has(activeCompany) ? "w-28" : "w-10"
          } ${
            FULL_BLEED_LOGOS.has(activeCompany)
              ? ""
              : FILL_CONTAIN_LOGOS.has(activeCompany)
                ? "border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                : "border border-zinc-200 bg-white px-1.5 dark:border-zinc-700 dark:bg-zinc-900"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCompany}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex size-full items-center justify-center"
            >
              <CompanyLogo company={activeCompany} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {experience.map((job, index) => (
        <TimelineItem key={`${job.company}-${job.period}`} job={job} index={index} />
      ))}
    </div>
  );
}

// Shared pop-in variants for a timeline card's sequenced children.
const timelineChildVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
} as const;

const timelinePillVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
} as const;

function TimelineItem({
  job,
  index,
}: {
  job: {
    company: string;
    role: string;
    type: string;
    period: string;
    place: string;
    line: string;
    stack: string[];
  };
  index: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 80%", "end 80%"],
  });
  const dotScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={itemRef} className="relative pb-20 pl-8 last:pb-0 sm:pb-24">
      {/* Animated dot */}
      <motion.span
        className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:bg-blue-400 dark:ring-[#0b0d12]"
        style={{ scale: dotScale, opacity: dotOpacity }}
      />
      {/* Contents pop in once, sequenced: header -> description -> pills. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
      >
        <motion.div
          variants={timelineChildVariants}
          className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"
        >
          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
              {job.role}
            </h3>
            <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
              {job.company} · {job.place}
            </p>
          </div>
          <p className="font-mono text-sm text-zinc-500">{job.period}</p>
        </motion.div>
        <motion.p
          variants={timelineChildVariants}
          className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400"
        >
          {job.line}
        </motion.p>
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05 } },
          }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {job.stack.map((item) => (
            <motion.div key={item} variants={timelinePillVariants}>
              <Pill>{item}</Pill>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

type Project = (typeof projects)[number] | (typeof otherWork)[number];

const PREVIEW_WIDTH = 220;
const PREVIEW_HEIGHT = 140;
const PREVIEW_OFFSET_X = 14;
const PREVIEW_OFFSET_Y = 18;

function clampPreviewPosition(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  width: number,
  height: number,
  offsetX: number,
  offsetY: number,
) {
  const rawX = clientX - rect.left + offsetX;
  const rawY = clientY - rect.top + offsetY;
  const maxX = Math.max(0, rect.width - width);
  const maxY = Math.max(0, rect.height - height);

  return {
    x: Math.min(Math.max(0, rawX), maxX),
    y: Math.min(Math.max(0, rawY), maxY),
  };
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // Softer spring = preview lags slightly behind the cursor.
  const previewX = useSpring(pointerX, { stiffness: 220, damping: 26, mass: 0.7 });
  const previewY = useSpring(pointerY, { stiffness: 220, damping: 26, mass: 0.7 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const { x, y } = clampPreviewPosition(
      event.clientX,
      event.clientY,
      rect,
      PREVIEW_WIDTH,
      PREVIEW_HEIGHT,
      PREVIEW_OFFSET_X,
      PREVIEW_OFFSET_Y,
    );
    pointerX.set(x);
    pointerY.set(y);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      const { x, y } = clampPreviewPosition(
      event.clientX,
      event.clientY,
      rect,
      PREVIEW_WIDTH,
      PREVIEW_HEIGHT,
      PREVIEW_OFFSET_X,
      PREVIEW_OFFSET_Y,
    );
      pointerX.jump(x);
      pointerY.jump(y);
    }
    setHovered(true);
    setPreviewLoaded(true);
  };

  return (
    <div
      ref={cardRef}
      className="relative h-full overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full min-h-[260px] overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-colors duration-150 ease-out hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none dark:hover:bg-zinc-900/80 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-[#08090b] sm:min-h-[280px] sm:p-6"
      >
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100`} />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                  {project.type}
                </span>
                {"status" in project && project.status ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_0_0_1px_rgba(16,185,129,0.35),0_2px_8px_rgba(16,185,129,0.35)] dark:bg-emerald-500 dark:text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    {project.status}
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-lg font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-xl">
                {project.name}
              </h3>
            </div>
            <ArrowUpRight
              size={18}
              className="mt-1 shrink-0 text-zinc-300 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-950 dark:text-zinc-700 dark:group-hover:text-white"
            />
          </div>

          <p className="mt-3 text-[0.94rem] leading-relaxed text-zinc-500 dark:text-zinc-400">
            {project.line}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </a>

      {/* Small preview trailing slightly behind the cursor (pointer devices only).
          Stays mounted after first hover so the iframe doesn't reload every time. */}
      {previewLoaded ? (
        <div className="pointer-events-none absolute inset-0 z-30 hidden overflow-hidden [@media(hover:hover)]:block">
          <motion.div
            initial={false}
            animate={
              hovered
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: previewX,
              y: previewY,
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
            }}
            className="absolute left-0 top-0 origin-top-left overflow-hidden rounded-lg border border-zinc-200/90 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-zinc-900 dark:shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
          >
            {"previewImage" in project && project.previewImage ? (
              <Image
                src={project.previewImage}
                alt={`${project.name} preview`}
                width={PREVIEW_WIDTH}
                height={PREVIEW_HEIGHT}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <iframe
                src={project.href}
                title={`${project.name} website preview`}
                loading="lazy"
                referrerPolicy="no-referrer"
                tabIndex={-1}
                className="pointer-events-none h-[560px] w-[880px] origin-top-left scale-[0.25] border-0 bg-white"
              />
            )}
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}

function MagneticTag({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useRef(0);
  const y = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.current = (e.clientX - rect.left - rect.width / 2) * 0.45;
    y.current = (e.clientY - rect.top - rect.height / 2) * 0.45;
    el.style.transform = `translate(${x.current}px, ${y.current}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)" }}
      className="cursor-default"
    >
      {children}
    </div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
      viewport={{ once: false, amount: 0.24 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <FadeIn className="mx-auto mb-10 max-w-3xl text-center">
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
        {label}
      </p>
      <h2 className="font-display mt-3 text-balance text-3xl font-semibold tracking-[-0.05em] text-zinc-950 dark:text-white sm:text-4xl md:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
          {copy}
        </p>
      ) : null}
    </FadeIn>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
      {children}
    </span>
  );
}

function SkillToken({
  item,
  index,
}: {
  item: StackItem;
  index: number;
}) {
  return (
    <div className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/82 px-2.5 py-1.5 backdrop-blur transition-all hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/82 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/90 sm:gap-3 sm:px-3.5 sm:py-2">
      <span className="flex size-6 items-center justify-center rounded-full bg-zinc-100 text-[9px] font-bold tracking-[-0.02em] text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 sm:size-8 sm:text-[11px]">
        {item.icon ? (
          <Image
            src={item.icon}
            alt=""
            width={20}
            height={20}
            className={`size-3.5 object-contain sm:size-5 ${item.invertOnDark ? "dark:invert" : ""}`}
            loading="lazy"
          />
        ) : (
          item.fallback ?? item.name.slice(0, 2)
        )}
      </span>
      <span className="whitespace-nowrap text-[11px] font-semibold tracking-[-0.01em] text-zinc-800 dark:text-zinc-200 sm:text-sm">
        {item.name}
      </span>
    </div>
  );
}

export default function Home() {
  const headline = useRotatingText(headlines);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 96]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc] text-zinc-950 dark:bg-[#08090b] dark:text-zinc-50">
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center pt-24"
      >
        <HeroThree />
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto flex w-full max-w-6xl px-4 pb-10 pt-4 sm:px-6 sm:pb-16 sm:pt-8"
        >
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 sm:text-[11px] sm:tracking-[0.26em]"
            >
              agentic engineer · web3 builder · product systems
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 max-w-5xl text-[2.8rem] font-semibold leading-[0.88] tracking-[-0.07em] text-zinc-950 dark:text-white sm:text-6xl md:text-8xl lg:text-9xl"
            >
              Mirza builds
              <span className="block text-zinc-400 dark:text-zinc-600">what ships.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-7 h-11 overflow-hidden sm:mt-9 sm:h-14 md:h-16"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={headline}
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="font-display text-xl font-medium tracking-[-0.05em] text-zinc-800 dark:text-zinc-200 sm:text-[1.7rem] md:text-[2.5rem]"
                >
                  {headline}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-5 max-w-2xl text-pretty text-[0.98rem] leading-7 text-zinc-600 dark:text-zinc-400 sm:mt-7 sm:text-[1.05rem] sm:leading-8 md:text-lg"
            >
              I build the product layer, the backend layer, and the messy middle. Agents help me move fast; taste and review keep it clean.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4 sm:mt-10"
            >
              <a
                href={`mailto:${profile.email}`}
                className="font-display inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold tracking-[-0.03em] text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <Mail size={17} />
                Let&apos;s talk
              </a>
              <a
                href="#projects"
                className="font-display inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold tracking-[-0.03em] text-zinc-950 transition hover:-translate-y-0.5 hover:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:border-zinc-500"
              >
                See the work
                <ArrowUpRight size={16} />
              </a>
              <span className="hidden h-5 w-px bg-zinc-300 dark:bg-zinc-700 sm:block" />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
                open to work · remote
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="about" className="px-4 py-14 sm:px-6 md:py-24">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
            about
          </p>
          <h2 className="font-display mt-3 text-balance text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-3xl md:text-4xl">
            Ships fast. Breaks nothing.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
            Full-stack engineer building SaaS, Web3 tools, and AI products with remote teams across the globe. I own features end-to-end, from schema to pixel, and let agentic workflows handle the grunt work so I can focus on what actually ships.
          </p>
        </FadeIn>
      </section>

      <section id="projects" className="px-4 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="selected work"
            title="Things I've built."
            copy="Live products, real users, real code. Each with its own stack and design direction."
          />

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={index * 0.03}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10">
            <p className="mb-4 text-center text-sm font-medium text-zinc-400 dark:text-zinc-500">
              Other experiments &amp; UI work
            </p>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {otherWork.map((project, index) => (
                <FadeIn key={project.name} delay={index * 0.03}>
                  <ProjectCard project={project} />
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="experience" className="px-4 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="timeline"
            title="Where I have shipped."
          />

          <TimelineExperience experience={experience} />
        </div>
      </section>

      <section id="stack" className="px-4 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="toolbox"
            title="What I work with."
          />

          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2">
              {stack.flatMap((group) =>
                group.items.map((item) => (
                  <MagneticTag key={item.name}>
                    <span
                      className="group relative inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3.5 py-2 text-[13px] font-medium text-zinc-600 transition-all duration-200 hover:border-zinc-300 hover:text-zinc-950 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    >
                      {item.icon ? (
                        <Image
                          src={item.icon}
                          alt=""
                          width={16}
                          height={16}
                          className={`size-4 object-contain opacity-60 transition-opacity group-hover:opacity-100 ${item.invertOnDark ? "dark:invert" : ""}`}
                          loading="lazy"
                        />
                      ) : (
                        <span className="flex size-4 items-center justify-center text-[9px] font-bold text-zinc-300 transition-colors group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400">
                          {item.fallback ?? item.name.slice(0, 2)}
                        </span>
                      )}
                      {item.name}
                    </span>
                  </MagneticTag>
                ))
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 md:pb-14">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              let&apos;s work together
            </p>
            <h2 className="font-display mt-4 text-balance text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white sm:text-4xl md:text-5xl">
              Got something to build?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-zinc-500 dark:text-zinc-400">
              I work best with small teams shipping fast on messy, real-world problems. If that sounds like yours — say hi.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email me"
                className="inline-flex size-12 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
