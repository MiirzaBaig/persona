"use client";

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
    line: "Academic writing product with billing, exports, citations, and multilingual document generation.",
    stack: ["Next.js", "TypeScript", "Stripe", "Supabase"],
  },
  {
    name: "Tokamak Chain Monitor",
    type: "Observability",
    href: "https://chain-monitor.vercel.app",
    line: "L2 monitoring dashboard with live chain health, fee trends, fallback RPCs, and PDF reporting.",
    stack: ["Next.js 15", "Viem", "TanStack Query", "Tailwind"],
  },
  {
    name: "Computer Use Agent",
    type: "Automation",
    href: "https://ai-sdk-computer-use-theta-dun.vercel.app",
    line: "Browser-control experiment with action streaming, screenshot loops, and human checkpoints.",
    stack: ["Next.js", "TypeScript", "Vercel"],
  },
  {
    name: "SolTerminal",
    type: "DeFi",
    href: "https://solterminal.vercel.app",
    line: "Trading terminal with wallet flows, market data, pre-trade analytics, and portfolio views.",
    stack: ["Next.js", "Solana", "Tailwind"],
  },
  {
    name: "Mathly",
    type: "Education",
    href: "https://github.com/MiirzaBaig/mathly",
    line: "Math practice platform with adaptive problems, progress tracking, and a clean student UI.",
    stack: ["Next.js", "TypeScript", "React"],
  },
];

const experience = [
  {
    company: "Sherry.gg",
    role: "Full Stack Engineer",
    period: "Nov 2025 - Mar 2026",
    place: "Remote, South Korea",
    line: "Owned commerce and transaction flows, improved processing speed, and fixed production reliability issues.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    company: "Exzyt.com",
    role: "Founding Engineer",
    period: "May 2025 - Jan 2026",
    place: "Remote, UAE",
    line: "Built a real estate platform with deal rooms, document workflows, collaboration, and AWS delivery.",
    stack: ["Next.js", "TypeScript", "Tailwind", "AWS"],
  },
  {
    company: "Minimalisticlearning",
    role: "Frontend Developer",
    period: "Jan 2025 - Jun 2025",
    place: "Remote, UK",
    line: "Built reusable React interfaces and improved responsive performance across education workflows.",
    stack: ["React", "TypeScript", "Redux", "REST"],
  },
  {
    company: "Datapoint IT Tech Pvt Ltd",
    role: "Software Engineer",
    period: "Aug 2024 - Dec 2024",
    place: "Remote",
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
      <h2 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.035em] text-zinc-950 dark:text-white md:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400 md:text-lg">
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
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.45 }}
      transition={{
        duration: 0.48,
        delay: index * 0.018,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group inline-flex items-center gap-3 rounded-full border border-zinc-200 bg-white/82 px-3.5 py-2.5 shadow-[0_16px_50px_rgba(15,23,42,0.05)] backdrop-blur transition-colors hover:border-zinc-300 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/82 dark:hover:border-zinc-700"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-bold tracking-[-0.02em] text-zinc-700 transition group-hover:bg-blue-50 group-hover:text-blue-700 dark:bg-zinc-900 dark:text-zinc-300 dark:group-hover:bg-blue-950/50 dark:group-hover:text-blue-300">
        {item.icon ? (
          <img
            src={item.icon}
            alt=""
            className={`size-5 object-contain ${item.invertOnDark ? "dark:invert" : ""}`}
            loading="lazy"
          />
        ) : (
          item.fallback ?? item.name.slice(0, 2)
        )}
      </span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-[-0.01em] text-zinc-800 dark:text-zinc-200">
        {item.name}
      </span>
    </motion.div>
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
          className="relative z-10 mx-auto flex w-full max-w-6xl px-6 pb-16 pt-8"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <span className="rounded-full bg-zinc-950 px-3 py-1.5 text-white dark:bg-white dark:text-zinc-950">
                open to the right team
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 dark:border-zinc-800 dark:bg-zinc-950">
                remote-friendly
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.26em] text-blue-600 dark:text-blue-400"
            >
              agentic engineer · web3 builder · product systems
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.065em] text-zinc-950 dark:text-white md:text-8xl lg:text-9xl"
            >
              Mirza builds
              <span className="block text-zinc-400 dark:text-zinc-600">what ships.</span>
            </motion.h1>

            <div className="mt-7 h-10 overflow-hidden md:h-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={headline}
                  initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="text-2xl font-semibold tracking-[-0.04em] text-zinc-800 dark:text-zinc-200 md:text-4xl"
                >
                  {headline}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-7 max-w-2xl text-pretty text-base leading-8 text-zinc-600 dark:text-zinc-400 md:text-lg"
            >
              I build the product layer, the backend layer, and the messy middle. Agents help me move fast; taste and review keep it clean.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <Mail size={17} />
                Let&apos;s talk
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:-translate-y-0.5 hover:border-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:border-zinc-500"
              >
                See the work
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="projects" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="selected work"
            title="Live, useful, shipped."
            copy="No fake redesigns. No empty Dribbble shots. These are products and tools with real flows, data, users, or edge cases."
          />

          <div className="space-y-3">
            {projects.map((project, index) => (
              <FadeIn key={project.name} delay={index * 0.03}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-5 rounded-[1.75rem] border border-zinc-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600 md:grid-cols-[0.34fr_0.66fr]"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">
                      {project.type}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                      {project.name}
                    </h3>
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        {project.line}
                      </p>
                      <ArrowUpRight
                        size={20}
                        className="shrink-0 text-zinc-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-zinc-950 dark:group-hover:text-white"
                      />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <Pill key={item}>{item}</Pill>
                      ))}
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="border-y border-zinc-200 bg-white px-6 py-20 dark:border-zinc-900 dark:bg-[#0b0d12] md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="timeline"
            title="Where I have shipped."
            copy="Dates cleaned up from the CV and written like a real work story instead of a keyword dump."
          />

          <div className="mx-auto max-w-4xl">
            {experience.map((job, index) => (
              <FadeIn key={`${job.company}-${job.period}`} delay={index * 0.04}>
                <article className="relative border-l border-zinc-200 pb-10 pl-7 last:pb-0 dark:border-zinc-800">
                  <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-zinc-950 ring-4 ring-white dark:bg-white dark:ring-[#0b0d12]" />
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white">
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
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="stack" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            label="toolbox"
            title="Modern stack. Simple taste."
            copy="The tools are current, but the goal is boring reliability: fast pages, clean contracts, sensible schemas, and smooth handoff to production."
          />

          <div className="space-y-8">
            {stack.map((group, groupIndex) => (
              <FadeIn key={group.category} delay={groupIndex * 0.04}>
                <div className="flex flex-col gap-4 rounded-[2rem] border border-zinc-200 bg-white/64 p-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/56 md:flex-row md:items-center">
                  <div className="flex min-w-32 items-center gap-3 md:w-36">
                    <span className="h-px w-8 bg-blue-600 dark:bg-blue-400" />
                    <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-500">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-1 flex-wrap items-center gap-2.5">
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

      <section className="px-6 pb-10 md:pb-14">
        <FadeIn>
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-zinc-950 p-7 text-white dark:bg-white dark:text-zinc-950 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300 dark:text-blue-700">
                  available for the right team
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
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
