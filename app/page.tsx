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
    name: "Avelia",
    type: "UI Showcase",
    href: "https://avelia.vercel.app/",
    label: "polish heavy",
    vibe: "Sleek, responsive, and very locked-in on visual feel.",
    line: "Built a sleek frontend with strong UI polish, clean hierarchy, and smooth interactions that feel premium instead of template-made.",
    stack: ["Next.js", "Tailwind CSS", "Responsive UI"],
    accent:
      "from-rose-500/18 via-orange-500/10 to-pink-500/20 dark:from-rose-400/16 dark:via-orange-400/10 dark:to-pink-400/18",
  },
  {
    name: "Forgee",
    type: "Component System",
    href: "https://forgee-taupe.vercel.app/",
    label: "system clean",
    vibe: "Reusable pieces, modern layout rhythm, smooth on every screen.",
    line: "Developed a modern UI platform with reusable components, responsive structure, and performance-minded interactions across devices.",
    stack: ["Next.js", "Tailwind CSS", "Component Design"],
    accent:
      "from-zinc-500/20 via-stone-500/10 to-orange-500/16 dark:from-zinc-400/18 dark:via-stone-400/10 dark:to-orange-400/14",
  },
  {
    name: "Arche",
    type: "Minimal Product",
    href: "https://arche-tau.vercel.app/",
    label: "quiet flex",
    vibe: "Minimal on purpose, with a scalable structure under the hood.",
    line: "Built a design-focused web app with a minimal look, scalable component structure, and optimized responsiveness and performance.",
    stack: ["Next.js", "TypeScript", "Minimal UI"],
    accent:
      "from-cyan-500/16 via-slate-500/8 to-blue-500/20 dark:from-cyan-400/14 dark:via-slate-400/8 dark:to-blue-400/18",
  },
];

const experience = [
  {
    company: "PureSoft Labs OÜ",
    role: "Software Engineer",
    period: "Apr 2026 - Present",
    place: "Remote, Estonia",
    line: "Building and shipping software at PureSoft Labs, contributing to core engineering efforts.",
    stack: ["TypeScript", "Node.js", "React", "AWS"],
  },
  {
    company: "Cardinal Web 3",
    role: "Founding Engineer",
    period: "May 2026 - Present",
    place: "Remote, UAE",
    line: "Leading Web3 security and blockchain protection initiatives from the ground up.",
    stack: ["Web3", "Solidity", "TypeScript", "Blockchain"],
  },
  {
    company: "exzyt",
    role: "Software Engineer",
    period: "Oct 2025 - Present",
    place: "Remote, UAE",
    line: "Building the marketplace for modern M&A with deal rooms, document workflows, and collaboration tools.",
    stack: ["Next.js", "TypeScript", "Tailwind", "AWS"],
  },
  {
    company: "Stealth Startup",
    role: "Software Engineer",
    period: "Nov 2025 - May 2026",
    place: "Remote, South Korea",
    line: "Owned commerce and transaction flows, improved processing speed, and fixed production reliability issues.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    company: "McKinsey & Company",
    role: "Forward Program Fellow",
    period: "Mar 2025 - Sep 2025",
    place: "Remote",
    line: "Selected for McKinsey's Forward Program, developing leadership and problem-solving capabilities.",
    stack: ["Strategy", "Leadership", "Problem Solving"],
  },
  {
    company: "Minimalisticlearning",
    role: "UI/UX Developer",
    period: "Jan 2025 - Jun 2025",
    place: "Remote, UK",
    line: "Built reusable React interfaces and improved responsive performance across education workflows.",
    stack: ["React", "TypeScript", "Redux", "REST"],
  },
  {
    company: "Datapoint",
    role: "Back End Developer",
    period: "Aug 2024 - Dec 2024",
    place: "Remote, India",
    line: "Maintained Node.js APIs, auth flows, partner integrations, and database-backed services.",
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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <span className="font-display rounded-full bg-zinc-950 px-3 py-1.5 text-[0.92rem] font-medium tracking-[-0.03em] text-white dark:bg-white dark:text-zinc-950">
                open to the right team
              </span>
              <span className="font-display rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[0.92rem] font-medium tracking-[-0.03em] dark:border-zinc-800 dark:bg-zinc-950">
                remote-friendly
              </span>
            </motion.div>

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

            <div className="mt-5 h-8 overflow-hidden sm:mt-7 sm:h-10 md:h-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={headline}
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="font-display text-lg font-medium tracking-[-0.05em] text-zinc-800 dark:text-zinc-200 sm:text-2xl md:text-[2.35rem]"
                >
                  {headline}
                </motion.p>
              </AnimatePresence>
            </div>

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
              className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"
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
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="px-4 py-14 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="selected work"
            title="Live, polished, different."
            copy="Not cloned landing pages. Not fake case studies. Each one has its own lane, its own energy, and a UI direction that actually fits the product."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={index * 0.03}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-zinc-200/90 bg-white/95 p-5 shadow-[0_18px_70px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1.5 hover:border-zinc-300 hover:shadow-[0_32px_100px_rgba(15,23,42,0.12)] dark:border-zinc-800 dark:bg-zinc-950/95 dark:hover:border-zinc-700 sm:rounded-[1.9rem] sm:p-6"
                >
                  <div
                    className={`absolute inset-x-6 top-0 h-28 rounded-full bg-gradient-to-r ${project.accent} opacity-100 blur-3xl transition duration-300 group-hover:scale-105`}
                  />
                  <div
                    className={`absolute -right-12 top-10 size-36 rounded-full bg-gradient-to-br ${project.accent} opacity-70 blur-3xl transition duration-300 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.92)_38%,rgba(255,255,255,1))] dark:bg-[linear-gradient(180deg,rgba(9,9,11,0.35),rgba(9,9,11,0.82)_38%,rgba(9,9,11,0.96))]" />
                  <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] border border-white/70 dark:border-white/5 sm:rounded-[calc(1.9rem-1px)]" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-blue-200/80 bg-blue-50/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-700 backdrop-blur dark:border-blue-900/70 dark:bg-blue-950/60 dark:text-blue-300">
                            {project.type}
                          </span>
                          <span className="rounded-full border border-zinc-200/80 bg-white/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400">
                            {project.label}
                          </span>
                        </div>
                        <h3 className="font-display mt-4 max-w-[12ch] text-[1.75rem] font-semibold leading-[0.92] tracking-[-0.06em] text-zinc-950 dark:text-white sm:text-[2rem] md:text-[2.15rem]">
                          {project.name}
                        </h3>
                      </div>
                      <ArrowUpRight
                        size={22}
                        className="mt-1 shrink-0 text-zinc-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-950 dark:group-hover:text-white"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
                        {project.vibe}
                      </p>

                      <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
                        {project.line}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <Pill key={item}>{item}</Pill>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex justify-center pt-7">
                      <span className="inline-flex items-center justify-center rounded-full border border-zinc-200/80 bg-white/75 px-4 py-2 text-sm font-medium text-zinc-800 backdrop-blur transition group-hover:border-blue-200 group-hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900/75 dark:text-zinc-200 dark:group-hover:border-blue-900/70 dark:group-hover:text-blue-400">
                        Open live demo
                      </span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
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
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="toolbox"
            title="Modern stack. Simple taste."
            copy="Built for product work, backend systems, and web3 flows without turning the whole stack into chain-bro chaos."
          />

          <div className="space-y-2">
            {stack.map((group, groupIndex) => (
              <FadeIn key={group.category} delay={groupIndex * 0.04}>
                <div className="rounded-xl border border-zinc-200 bg-white/64 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/56 sm:rounded-2xl sm:px-5 sm:py-4">
                  <div className="mb-2.5 flex items-center gap-2.5 sm:mb-3">
                    <span className="h-px w-5 bg-blue-600 dark:bg-blue-400" />
                    <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500 sm:text-[11px]">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {group.items.map((item, itemIndex) => (
                      <SkillToken
                        key={item.name}
                        item={item}
                        index={groupIndex * 6 + itemIndex}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 md:pb-14">
        <FadeIn>
          <div className="mx-auto max-w-6xl rounded-[1.25rem] bg-zinc-950 p-5 text-white dark:bg-white dark:text-zinc-950 sm:rounded-[2rem] sm:p-7 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300 dark:text-blue-700">
                  available for the right team
                </p>
                <h2 className="mt-4 max-w-3xl text-2xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
                  Need someone who can build and care?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 dark:text-zinc-700">
                  I am best with small teams, product speed, messy requirements, and features that need both taste and implementation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 dark:bg-zinc-950 dark:text-white"
                >
                  <Mail size={17} />
                  Email me
                </a>
                <div className="flex gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-white/60 dark:border-zinc-300 dark:text-zinc-950 dark:hover:border-zinc-900"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-white/60 dark:border-zinc-300 dark:text-zinc-950 dark:hover:border-zinc-900"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={profile.saas}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Current product"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-white/60 dark:border-zinc-300 dark:text-zinc-950 dark:hover:border-zinc-900"
                  >
                    <Globe2 size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
