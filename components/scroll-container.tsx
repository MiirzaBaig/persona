"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ContentBox from "./content-box";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import useFaviconAnimation from "@/lib/use-favicon-animation";
import { ExternalLink } from "lucide-react";

interface ScrollContainerProps { }

const WORDS = ["aware", "cutting-edge", "proficient", "daring"];

interface Experience {
  title: string;
  company: string;
  location: string;
  dateRange: string;
  points: string[];
}

const EXPERIENCE: Experience[] = [
  {
    title: "Full Stack Engineer (contract)",
    company: "Sherry.gg",
    location: "Remote (South Korea)",
    dateRange: "Nov 2025 – Jan 2026",
    points: [
      "Led end-to-end development of core commerce and transactional systems for a production-scale platform, optimizing inventory pipelines and multi-participant workflows to reduce transaction processing time by 30%.",
      "Architected advanced client-side systems using Next.js and TypeScript, improving state orchestration, interaction design, and UI responsiveness, resulting in a 25% increase in user engagement.",
      "Designed and integrated scalable backend services with Node.js and PostgreSQL, enhancing booth-specific data retrieval and improving operational efficiency by 15%.",
      "Diagnosed and resolved critical production issues related to state desynchronization, validation mismatches, and frontend–backend data inconsistency, increasing platform reliability and reducing customer-reported issues by 40%.",
      "Led remediation of high-impact production bugs, including revenue allocation errors, browser-specific rendering issues, and edge-case state reset scenarios, significantly improving transactional accuracy and system stability.",
    ],
  },
  {
    title: "Founding Engineer",
    company: "Exzyt.com",
    location: "Remote (UAE)",
    dateRange: "May 2025 – Nov 2025",
    points: [
      "Architected and launched a full-scale real estate platform from the ground up using Next.js, TypeScript, and Tailwind CSS.",
      "Engineered advanced frontend workflows for document management, deal rooms, and live collaboration with a strong focus on performance and UX.",
      "Integrated AWS services including S3 and CloudFront to ensure scalable asset delivery and global performance.",
      "Worked directly with stakeholders to refine UI/UX and deliver production-ready features via automated CI/CD pipelines.",
    ],
  },
  {
    title: "Frontend Developer Intern",
    company: "Minimalisticlearning",
    location: "Remote",
    dateRange: "Jan 2025 – Apr 2025",
    points: [
      "Developed and maintained reusable, high-quality user-facing components using React and TypeScript.",
      "Optimized layouts and component performance to ensure responsiveness across devices and browsers.",
      "Participated in code reviews and implemented performance improvements that enhanced overall usability.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Datapoint IT Tech Pvt Ltd",
    location: "Remote",
    dateRange: "Aug 2024 – Nov 2024",
    points: [
      "Developed and maintained RESTful APIs using Node.js to support frontend integrations.",
      "Optimized server-side logic and database queries, reducing API response times and improving system performance.",
      "Implemented secure authentication and authorization mechanisms for scalable backend services.",
    ],
  },
];

const PROJECTS = [
  {
    name: "GitHub Issue Analyzer (BugBuster)",
    stack: "TypeScript, Node.js, Express, SQLite, Anthropic Claude, Next.js",
    date: "2025",
    link: "https://github-issue-analyzer-one.vercel.app/",
    points: [
      "Built a production-grade backend service to fetch, cache, and analyze GitHub issues using a clean service-oriented architecture.",
      "Implemented durable local caching with SQLite to persist issue data across restarts, enabling fast re-analysis without repeated API calls.",
      "Integrated Anthropic Claude to perform natural-language analysis over cached issues, including chunked processing and result synthesis.",
      "Designed robust REST APIs with validation, pagination, structured error handling, and health checks for reliability.",
    ],
  },
  {
    name: "AI Computer Use Agent",
    stack: "Next.js, TypeScript, AI SDK, Anthropic Claude, e2b Desktop, Vercel",
    date: "2025",
    link: "https://ai-sdk-computer-use-theta-dun.vercel.app/",
    points: [
      "Built an end-to-end AI computer-use agent that controls a virtual desktop via LLM-driven planning and real UI interactions.",
      "Integrated human-in-the-loop checkpoints and sandboxed execution to ensure safety, observability, and repeatability.",
    ],
  },
];

const SKILLS = {
  languages: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "Solidity"],
  frontend: ["React.js", "Next.js", "Tailwind CSS", "Redux"],
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "MongoDB",
    "PostgreSQL",
    "Web3.js",
    "Ethers.js",
  ],
  blockchain: ["Ethereum", "Solana", "Smart Contracts", "Wallet Integration"],
  tools: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Postman"],
};

const EDUCATION = {
  institution: "Osmania University, Telangana, India",
  degree: "Bachelor of Engineering in Computer Science",
  date: "Anticipated May 2025",
  gpa: "8.7/10.0",
};

const ScrollContainer = ({ }: ScrollContainerProps) => {
  useFaviconAnimation();
  const [activeContentBoxIndex, setActiveContentBoxIndex] = useState(0);
  const debouncedActiveContentIndex = useDebounce(activeContentBoxIndex, 300);

  return (
    <div className="relative w-full md:mb-[200px] max-w-screen flex flex-col items-center">
      <div className="relative">
        <div className="sticky z-20 top-[33vh] left-0 pl-4 md:pl-0 translate-x-0 lg:translate-x-[100px] md:translate-x-[130px] max-w-[792px] w-full flex justify-center">
          <div className="flex gap-1.5 md:gap-4 relative md:-translate-x-[230px] w-full text-[22px] md:text-[32px] font-semibold items-baseline left-0 ">
            <div className="flex md:gap-4 gap-1.5 items-baseline">
              Mirza{" "}
              <span className="opacity-50 text-lg md:text-[22px]">is</span>{" "}
            </div>
            <div className="relative leading-normal h-[22px] md:h-[33px]">
              <div>
                <div className="absolute h-full flex whitespace-nowrap top-0 left-0 ">
                  <div>
                    <AnimatePresence initial={false}>
                      {WORDS.map((word, i) => {
                        if (i === activeContentBoxIndex)
                          return (
                            <motion.div
                              className="absolute left-0 top-0  rounded-lg"
                              key={word + i}
                              initial={{
                                x: -20,
                                y: -12,
                                rotate: 0,
                                opacity: 0,
                                scale: 0.95,
                              }}
                              animate={{
                                x: [-10, 6, 0],
                                y: [-6, 4, 0],
                                rotate: 0,
                                scale: 1,
                                opacity: [0, 1, 1, 1, 1],
                                transition: {
                                  ease: "easeInOut",
                                  delay: 0.24,
                                  duration: 0.2,
                                },
                              }}
                              exit={{
                                x: 20,
                                y: -20,
                                rotate: -4,
                                opacity: 0,
                                scale: 0.95,
                                transition: {
                                  ease: "easeInOut",
                                  duration: 0.2,
                                },
                              }}
                            >
                              <div className="absolute origin-center h-full z-0 backdrop-blur-[2px] w-[110%] rounded-full"></div>
                              <div className="text-[20px] md:text-[30px] relative z-10">
                                {word}
                              </div>
                            </motion.div>
                          );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex min-h-screen flex-col justify-between ">
          <section className="max-w-[792px] w-full mt-[35vh] relative">
            <div className="h-full right-0 top-0 absolute w-[12%] bg-gradient-to-l  from-whiteout to-transparent z-20" />
            <ul>
              <ContentBox
                setActiveIndex={setActiveContentBoxIndex}
                activeIndex={debouncedActiveContentIndex}
                index={0}
                artboard="AWARE"
                riveSource="/rive/main.riv"
                riveStateMachine="1"
                keywords={["leading teams", "comms", "consulting"]}
              >
                <p className="text-lg  leading-normal md:text-[22px] max-w-[420px] text-blackout/50 font-medium">
                  I can deal with{" "}
                  <span className="text-blackout">
                    hard deadlines
                  </span>{" "}
                  and even harder{" "}
                  <span className="text-blackout">
                    business requirements
                  </span>
                </p>
              </ContentBox>
              <ContentBox
                setActiveIndex={setActiveContentBoxIndex}
                activeIndex={debouncedActiveContentIndex}
                index={1}
                artboard="CUTTING EDGE"
                riveSource="/rive/main.riv"
                riveStateMachine="2"
                keywords={["rewrite", "rebrand", "improve"]}
              >
                <p className="text-lg  leading-normal md:text-[22px] max-w-[450px] text-blackout/50 font-medium">
                  <span className="text-blackout">
                    I love shiny new tech.
                  </span>{" "}
                  But I also know when it&lsquo;s better to go with
                  battle-tested solutions instead.
                </p>
              </ContentBox>
              <ContentBox
                setActiveIndex={setActiveContentBoxIndex}
                activeIndex={debouncedActiveContentIndex}
                index={2}
                artboard="PROFICIENT"
                riveSource="/rive/main.riv"
                riveStateMachine="3"
                keywords={["engineering", "design"]}
              >
                <div className="relative">
                  <p className="text-lg  leading-normal md:text-[22px] max-w-[500px] text-blackout/50 font-medium">
                    I bring ideas to life, taking products from 0 to 1 independently.{" "}
                    <span className="text-blackout whitespace-nowrap">
                      Hands-on experience
                    </span>{" "}
                    is an understatement. <br></br> I drive the entire process
                  </p>
                </div>
              </ContentBox>
              <ContentBox
                setActiveIndex={setActiveContentBoxIndex}
                activeIndex={debouncedActiveContentIndex}
                index={3}
                artboard="DARING"
                riveSource="/rive/main.riv"
                riveStateMachine="4"
                keywords={["entrepreneur", "agency"]}
              >
                <p className="text-lg  leading-normal md:text-[22px] max-w-[500px] text-blackout/50 font-medium">
                  I&lsquo;thrive in the space where{" "}
                  <span className="text-blackout whitespace-nowrap">
                    <Link
                      href="https://www.linkedin.com/in/mirza-baig-590b1826b/"
                      target="_blank"
                      className="underline inline-flex gap-1 items-center font-semibold text-blackout/100"
                    >
                      innovation meets execution
                      <ExternalLink strokeWidth={3} width={20} />
                    </Link>
                  </span>{" "}
                  taking bold ideas from 0 to 1, designing, coding, and launching them into reality.
                </p>
              </ContentBox>
            </ul>
          </section>

          {/* Experience Section */}
          <section className="max-w-[792px] w-full mt-20 md:mt-32 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-12 text-blackout">
              Experience
            </h2>
            <div className="flex flex-col gap-6">
              {EXPERIENCE.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ translate: "4px 4px", boxShadow: "0px 0px 0px 0px" }}
                  className="border-2 border-black rounded-lg p-6 md:p-8 bg-whiteout shadow-neobrutalism transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-blackout">
                        {job.title}
                      </h3>
                      <p className="text-base md:text-lg text-blackout/60">
                        {job.company}{" "}
                        <span className="text-blackout/40">
                          · {job.location}
                        </span>
                      </p>
                    </div>
                    <span className="text-sm font-mono text-blackout/50 whitespace-nowrap">
                      {job.dateRange}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    {job.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="text-sm md:text-base leading-relaxed text-blackout/70"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="max-w-[792px] w-full mt-20 md:mt-32 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-12 text-blackout">
              Projects
            </h2>
            <div className="flex flex-col gap-6">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ translate: "4px 4px", boxShadow: "0px 0px 0px 0px" }}
                  className="border-2 border-black rounded-lg p-6 md:p-8 bg-whiteout shadow-neobrutalism transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <h3 className="text-lg md:text-xl font-semibold text-blackout">
                          {project.name}
                        </h3>
                        {project.link && (
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blackout underline underline-offset-4 decoration-2 hover:decoration-pink-400 transition-colors px-2 py-1 -m-1 rounded bg-blackout/5 hover:bg-blackout/10"
                          >
                            Open live
                            <ExternalLink size={14} strokeWidth={2.5} />
                          </Link>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-blackout/60 mt-1">
                        {project.stack}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-blackout/50 whitespace-nowrap">
                      {project.date}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-5 space-y-2">
                    {project.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="text-sm md:text-base leading-relaxed text-blackout/70"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section className="max-w-[792px] w-full mt-20 md:mt-32 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-12 text-blackout">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(SKILLS).map(([category, skills], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ translate: "4px 4px", boxShadow: "0px 0px 0px 0px" }}
                  className="border-2 border-black rounded-lg p-6 bg-whiteout shadow-neobrutalism transition-all"
                >
                  <h3 className="text-lg font-semibold mb-4 capitalize text-blackout">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-blackout/5 text-blackout/80 border border-blackout/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="max-w-[792px] w-full mt-20 md:mt-32 mb-20 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 md:mb-12 text-blackout">
              Education
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4 }}
              whileHover={{ translate: "4px 4px", boxShadow: "0px 0px 0px 0px" }}
              className="border-2 border-black rounded-lg p-6 md:p-8 bg-whiteout shadow-neobrutalism transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-blackout">
                    {EDUCATION.institution}
                  </h3>
                  <p className="text-base md:text-lg text-blackout/60 mt-1">
                    {EDUCATION.degree}
                  </p>
                  <p className="text-sm text-blackout/50 mt-2">
                    GPA: {EDUCATION.gpa}
                  </p>
                </div>
                <span className="text-sm font-mono text-blackout/50 whitespace-nowrap">
                  {EDUCATION.date}
                </span>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
      <div className="">
        <div className="bg-gradient-to-t w-full h-40 from-whiteout via-whiteout to-transparent absolute left-0 bottom-0 z-30" />
      </div>
    </div>
  );
};

export default ScrollContainer;