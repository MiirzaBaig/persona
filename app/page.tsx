"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
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
    name: "aithesiswriter.io",
    type: "Live SaaS",
    href: "https://aithesiswriter.io",
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
    href: "https://mathy-sigma.vercel.app/",
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
  { name: "Avelia", href: "https://avelia.vercel.app/" },
  { name: "Forgee", href: "https://forgee-taupe.vercel.app/" },
  { name: "Arche", href: "https://arche-tau.vercel.app/" },
];

const experience = [
  {
    company: "PureSoft Labs OÜ",
    role: "Software Engineer",
    type: "",
    period: "Apr 2026 - Present",
    place: "Remote, Estonia",
    line: "Owning full-stack feature delivery across the core product — shipped auth overhaul, optimized API response times, and built internal tooling that cut deploy cycles.",
    stack: ["TypeScript", "Node.js", "React", "AWS"],
  },
  {
    company: "Cardinal Web 3",
    role: "Founding Engineer",
    type: "",
    period: "May 2026 - Present",
    place: "Remote, UAE",
    line: "Architecting the security layer and smart contract infrastructure from scratch — built the monitoring pipeline, wallet integration flows, and on-chain alerting system.",
    stack: ["Web3", "Solidity", "TypeScript", "Blockchain"],
  },
  {
    company: "exzyt",
    role: "Software Engineer",
    type: "",
    period: "Oct 2025 - Jun 2026",
    place: "Remote, UAE",
    line: "Built the M&A deal room platform end-to-end — document workflows, role-based access, real-time collaboration, and secure file sharing used by active deal teams.",
    stack: ["Next.js", "TypeScript", "Tailwind", "AWS"],
  },
  {
    company: "Stealth Startup",
    role: "Software Engineer",
    type: "",
    period: "Nov 2025 - May 2026",
    place: "Remote, South Korea",
    line: "Owned the commerce engine — rebuilt transaction flows that cut processing time by 3x, resolved critical payment reliability issues in production.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    company: "McKinsey & Company",
    role: "Forward Program Fellow",
    type: "",
    period: "Mar 2025 - Sep 2025",
    place: "Remote",
    line: "Selected for McKinsey's competitive Forward Program — developed structured problem-solving and stakeholder communication skills applied to real business cases.",
    stack: ["Strategy", "Leadership", "Problem Solving"],
  },
  {
    company: "Minimalisticlearning",
    role: "UI/UX Developer",
    type: "",
    period: "Jan 2025 - Jun 2025",
    place: "Remote, UK",
    line: "Redesigned the student-facing interface — built a reusable component library, improved mobile responsiveness, and reduced page load times across education workflows.",
    stack: ["React", "TypeScript", "Redux", "REST"],
  },
  {
    company: "Datapoint",
    role: "Back End Developer",
    type: "",
    period: "Aug 2024 - Dec 2024",
    place: "Remote, India",
    line: "Maintained and extended Node.js APIs handling auth, partner integrations, and data pipelines — shipped webhook infrastructure and improved query performance.",
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

  return (
    <div ref={timelineRef} className="relative mx-auto max-w-4xl">
      {/* Background track line */}
      <div className="absolute left-0 top-0 h-full w-px bg-zinc-200 dark:bg-zinc-800" />
      {/* Animated progress line */}
      <motion.div
        className="absolute left-0 top-0 w-px origin-top bg-blue-500 dark:bg-blue-400"
        style={{ height: "100%", scaleY: scrollYProgress }}
      />

      {experience.map((job, index) => (
        <TimelineItem key={`${job.company}-${job.period}`} job={job} index={index} />
      ))}
    </div>
  );
}

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
  const contentY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div ref={itemRef} className="relative pb-14 pl-7 last:pb-0">
      {/* Animated dot */}
      <motion.span
        className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:bg-blue-400 dark:ring-[#0b0d12]"
        style={{ scale: dotScale, opacity: dotOpacity }}
      />
      <motion.div style={{ y: contentY, opacity: contentOpacity }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
              {job.role}
            </h3>
            <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
              {job.company} · {job.place}
            </p>
          </div>
          <p className="font-mono text-sm text-zinc-500">{job.period}</p>
        </div>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {job.line}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.stack.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </motion.div>
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
        className="relative flex min-h-screen items-center border-b border-zinc-200 bg-white pt-24 dark:border-zinc-900 dark:bg-[#08090b]"
      >
        <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(37,99,235,0.09),transparent)] dark:bg-[linear-gradient(180deg,rgba(96,165,250,0.12),transparent)]" />
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
              className="mt-7 h-10 overflow-hidden sm:mt-9 sm:h-12 md:h-14"
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
              className="mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
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

      <section id="about" className="border-b border-zinc-200 bg-white px-4 py-14 dark:border-zinc-900 dark:bg-[#0b0d12] sm:px-6 md:py-24">
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
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-colors duration-150 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none dark:hover:bg-zinc-900/80 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                        {project.type}
                      </span>
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
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-8 text-center">
            <p className="mb-3 text-sm font-medium text-zinc-400 dark:text-zinc-500">
              Other experiments &amp; UI work
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {otherWork.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-white"
                >
                  {item.name}
                  <ArrowUpRight size={13} className="text-zinc-400 transition group-hover:text-zinc-950 dark:group-hover:text-white" />
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section id="experience" className="border-y border-zinc-200 bg-white px-4 py-14 dark:border-zinc-900 dark:bg-[#0b0d12] sm:px-6 md:py-28">
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
