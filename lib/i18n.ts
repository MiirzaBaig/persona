// Central bilingual dictionary (English + Modern Standard Arabic).
//
// Conventions:
//  - Brand/product names (Revise, aithesiswriter.io, Next.js, Stripe, …) and the
//    owner's name stay in Latin script — the professional norm for Arabic CVs.
//  - Only descriptive prose (types/categories, one-liners, taglines, section
//    copy, UI labels) is translated. Tech stacks stay in Latin script too.
//  - Structured items keep locale-neutral fields (href, stack, accent, images)
//    at the top level; translatable fields live under `en` / `ar`.

export type Language = "en" | "ar";

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "ar", label: "العربية", native: "ع" },
];

type Localized<T> = Record<Language, T>;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const headlines: Localized<string[]> = {
  en: [
    "Shipping mode, always.",
    "50 agents running. One human reviewing.",
    "Backend brain. Frontend taste.",
    "Web3 dashboards without the chaos.",
    "Fast builds. Clean commits.",
    "Less yap. More deploys.",
  ],
  ar: [
    "في وضع الشحن، دائمًا.",
    "٥٠ وكيلًا يعمل. وإنسان واحد يراجع.",
    "عقلٌ في الخلفية، وذوقٌ في الواجهة.",
    "لوحات Web3 دون فوضى.",
    "بناءٌ سريع، والتزاماتٌ نظيفة.",
    "كلامٌ أقل، ونشرٌ أكثر.",
  ],
};

export const hero: Localized<{
  eyebrow: string;
  titleLead: string;
  titleTail: string;
  intro: string;
  talk: string;
  seeWork: string;
  downloadCv: string;
  openToWork: string;
}> = {
  en: {
    eyebrow: "agentic engineer · web3 builder · product systems",
    titleLead: "Mirza builds",
    titleTail: "what ships.",
    intro:
      "I build the product layer, the backend layer, and the messy middle. Agents help me move fast; taste and review keep it clean.",
    talk: "Let's talk",
    seeWork: "See the work",
    downloadCv: "Download CV",
    openToWork: "open to work · remote",
  },
  ar: {
    eyebrow: "مهندس أنظمة وكيلة · باني Web3 · أنظمة منتجات",
    titleLead: "ميرزا يبني",
    titleTail: "ما يُشحَن.",
    intro:
      "أبني طبقة المنتج، وطبقة الخادم، وكل ما بينهما من تفاصيل معقّدة. الوكلاء يساعدونني على التحرّك بسرعة، والذوق والمراجعة يبقيان العمل نظيفًا.",
    talk: "لنتحدّث",
    seeWork: "شاهد الأعمال",
    downloadCv: "تحميل السيرة الذاتية",
    openToWork: "متاح للعمل · عن بُعد",
  },
};

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about: Localized<{ label: string; title: string; copy: string }> = {
  en: {
    label: "about",
    title: "Ships fast. Breaks nothing.",
    copy: "Full-stack engineer building SaaS, Web3 tools, and AI products with remote teams across the globe. I own features end-to-end, from schema to pixel, and let agentic workflows handle the grunt work so I can focus on what actually ships.",
  },
  ar: {
    label: "نبذة",
    title: "يَشحَن بسرعة. ولا يكسر شيئًا.",
    copy: "مهندس متكامل يبني منتجات SaaS وأدوات Web3 ومنتجات الذكاء الاصطناعي مع فرق عن بُعد حول العالم. أتولّى الميزات من بدايتها إلى نهايتها، من مخطّط قاعدة البيانات إلى أدقّ بكسل، وأترك سير العمل الوكيلة تتكفّل بالمهام الروتينية لأركّز على ما يُشحَن فعلًا.",
  },
};

// ---------------------------------------------------------------------------
// Section titles
// ---------------------------------------------------------------------------

export const sections: Localized<{
  projects: { label: string; title: string; copy: string };
  otherWork: string;
  experience: { label: string; title: string };
  stack: { label: string; title: string };
  contact: { label: string; title: string; copy: string; emailAria: string };
}> = {
  en: {
    projects: {
      label: "selected work",
      title: "Things I've built.",
      copy: "Live products, real users, real code. Each with its own stack and design direction.",
    },
    otherWork: "Other experiments & UI work",
    experience: { label: "timeline", title: "Where I have shipped." },
    stack: { label: "toolbox", title: "What I work with." },
    contact: {
      label: "let's work together",
      title: "Got something to build?",
      copy: "I work best with small teams shipping fast on messy, real-world problems. If that sounds like yours — say hi.",
      emailAria: "Email me",
    },
  },
  ar: {
    projects: {
      label: "أعمال مختارة",
      title: "أشياء بنيتُها.",
      copy: "منتجات حيّة، ومستخدمون حقيقيون، وشيفرة حقيقية. لكلٍّ منها تقنياته واتجاهه التصميمي الخاص.",
    },
    otherWork: "تجارب أخرى وأعمال في الواجهات",
    experience: { label: "المسيرة", title: "أين شَحَنتُ أعمالي." },
    stack: { label: "الأدوات", title: "ما أعمل به." },
    contact: {
      label: "لنعمل معًا",
      title: "لديك شيء تريد بناءه؟",
      copy: "أعمل على أفضل نحو مع الفرق الصغيرة التي تَشحَن بسرعة على مشكلات واقعية معقّدة. إن كان هذا يشبه فريقك — فمرحبًا بك.",
      emailAria: "راسِلني",
    },
  },
};

// ---------------------------------------------------------------------------
// Nav + Footer
// ---------------------------------------------------------------------------

export const nav: Localized<{
  links: { href: string; label: string }[];
  grabCv: string;
  dmMe: string;
  copied: string;
  toggleTheme: string;
  toggleNav: string;
  toggleLanguage: string;
}> = {
  en: {
    links: [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Work" },
      { href: "#experience", label: "Timeline" },
      { href: "#stack", label: "Stack" },
    ],
    grabCv: "grab my CV",
    dmMe: "dm me",
    copied: "copied!",
    toggleTheme: "Toggle theme",
    toggleNav: "Toggle navigation",
    toggleLanguage: "Switch language",
  },
  ar: {
    links: [
      { href: "#about", label: "نبذة" },
      { href: "#projects", label: "الأعمال" },
      { href: "#experience", label: "المسيرة" },
      { href: "#stack", label: "الأدوات" },
    ],
    grabCv: "حمّل سيرتي",
    dmMe: "راسِلني",
    copied: "تم النسخ!",
    toggleTheme: "تبديل السمة",
    toggleNav: "تبديل القائمة",
    toggleLanguage: "تبديل اللغة",
  },
};

export const footer: Localized<{ tagline: string }> = {
  en: { tagline: "still shipping." },
  ar: { tagline: "ما زلتُ أشحَن." },
};

// ---------------------------------------------------------------------------
// Projects — locale-neutral fields at top level, translatable under en/ar.
// ---------------------------------------------------------------------------

type ProjectContent = { type: string; label: string; vibe: string; line: string };

export type Project = {
  name: string;
  href: string;
  stack: string[];
  accent: string;
  status?: boolean; // whether to show the live "In progress" badge
  previewImage?: string;
  building?: boolean; // no live site yet — card doesn't navigate, preview shows a placeholder
} & Localized<ProjectContent>;

export const statusLabel: Localized<string> = {
  en: "In progress",
  ar: "قيد التنفيذ",
};

export const projects: Project[] = [
  {
    name: "FitCheck",
    href: "#projects",
    status: true,
    building: true,
    previewImage: "/previews/ai-outfit-generator.png",
    stack: ["Vite", "React", "SSE Streaming", "Agent API", "AI Try-on", "Tailwind"],
    accent:
      "from-rose-500/20 via-fuchsia-500/10 to-amber-500/18 dark:from-rose-400/18 dark:via-fuchsia-400/10 dark:to-amber-400/16",
    en: {
      type: "AI Stylist",
      label: "vibe-first",
      vibe: "Drop a fit. We'll cook — your closet, but it talks back.",
      line: "Chat-native AI stylist: streams outfit cards over SSE, reads your closet + reference photo, plans the week, does virtual try-on. A fashion OS, not a wardrobe spreadsheet.",
    },
    ar: {
      type: "مصمّم أزياء ذكي",
      label: "الذوق أولًا",
      vibe: "اعرض إطلالتك، وسنتكفّل بالباقي — خزانتك، لكنّها تردّ عليك.",
      line: "مصمّم أزياء ذكي يعمل بالمحادثة: يبثّ بطاقات الإطلالات عبر SSE، ويقرأ خزانتك وصورتك المرجعية، ويخطّط أسبوعك، ويجرّب الملابس افتراضيًا. نظام أزياء متكامل، لا مجرّد جدول للخزانة.",
    },
  },
  {
    name: "AI Document Editor",
    href: "https://aidocumenteditor.com/",
    stack: ["Next.js 15", "TypeScript", "AI Copilot", "Diff Engine", "Streaming", "Postgres"],
    accent:
      "from-indigo-500/20 via-blue-500/10 to-slate-500/18 dark:from-indigo-400/18 dark:via-blue-400/10 dark:to-slate-400/16",
    en: {
      type: "AI Copilot",
      label: "approval-first",
      vibe: "Every edit deserves your approval — nothing moves without it.",
      line: "Doc-aware AI copilot that ships edits as reviewable inline diffs — accept/reject each one, full version history, 9+ formats. No silent rewrites.",
    },
    ar: {
      type: "مساعد ذكي",
      label: "الموافقة أولًا",
      vibe: "كل تعديل يستحق موافقتك — لا شيء يتحرّك دونها.",
      line: "مساعد ذكي يفهم المستند ويقدّم التعديلات كفروقات مضمّنة قابلة للمراجعة — تقبل أو ترفض كلًّا منها، مع سجلّ مراجعات كامل و٩+ صيغ. لا تعديلات صامتة.",
    },
  },
  {
    name: "aithesiswriter.io",
    href: "https://aithesiswriter.io",
    previewImage: "/previews/aithesiswriter.png",
    stack: ["Next.js", "TypeScript", "Stripe", "Supabase", "OpenAI", "i18n"],
    accent:
      "from-sky-500/20 via-blue-500/10 to-cyan-500/20 dark:from-sky-400/18 dark:via-blue-400/10 dark:to-cyan-400/18",
    en: {
      type: "Live SaaS",
      label: "revenue flow",
      vibe: "Built to convert, retain, and export without friction.",
      line: "Academic writing product with billing, exports, citations, and multilingual document generation.",
    },
    ar: {
      type: "منتج SaaS حيّ",
      label: "تدفّق الإيرادات",
      vibe: "مبنيٌّ للتحويل والاحتفاظ والتصدير دون احتكاك.",
      line: "منتج كتابة أكاديمية يتضمّن الفوترة والتصدير والاقتباسات وتوليد المستندات متعدّد اللغات.",
    },
  },
  {
    name: "AI Book Writer",
    href: "https://ai-book-nextjs-xi.vercel.app/",
    stack: ["Next.js", "TypeScript", "LLM Orchestration", "Streaming", "Chapter Engine", "Tailwind"],
    accent:
      "from-teal-500/20 via-emerald-500/10 to-green-500/18 dark:from-teal-400/18 dark:via-emerald-400/10 dark:to-green-400/16",
    en: {
      type: "AI Authoring",
      label: "manuscript engine",
      vibe: "From a one-line idea to a full manuscript — chapter by chapter.",
      line: "AI book-writing studio that turns a premise into a structured outline, then drafts each chapter with streaming generation, consistent voice and characters, inline rewriting, and clean export.",
    },
    ar: {
      type: "تأليف بالذكاء الاصطناعي",
      label: "محرّك المخطوطة",
      vibe: "من فكرة بسطر واحد إلى مخطوطة كاملة — فصلًا بعد فصل.",
      line: "استوديو لتأليف الكتب بالذكاء الاصطناعي يحوّل الفكرة إلى مخطط منظّم، ثم يكتب كل فصل ببثٍّ آنيّ، مع اتساق الأسلوب والشخصيات، وتحرير مضمّن، وتصدير نظيف.",
    },
  },
  {
    name: "Computer Use Agent",
    href: "https://ai-sdk-computer-use-theta-dun.vercel.app",
    previewImage: "/previews/computer-use-agent.png",
    stack: ["Next.js", "TypeScript", "AI SDK", "Playwright", "Vercel", "Streaming"],
    accent:
      "from-fuchsia-500/20 via-pink-500/10 to-rose-500/20 dark:from-fuchsia-400/18 dark:via-pink-400/10 dark:to-rose-400/18",
    en: {
      type: "Automation",
      label: "agent loop",
      vibe: "Experimental UI, but the control surface stays readable.",
      line: "Browser-control experiment with action streaming, screenshot loops, and human checkpoints.",
    },
    ar: {
      type: "أتمتة",
      label: "حلقة الوكيل",
      vibe: "واجهةٌ تجريبية، لكنّ سطح التحكّم يبقى واضحًا.",
      line: "تجربة للتحكّم في المتصفّح مع بثّ الإجراءات، وحلقات لقطات الشاشة، ونقاط تحقّق بشرية.",
    },
  },
  {
    name: "SolTerminal",
    href: "https://sol-terminal-six.vercel.app/",
    stack: ["Next.js", "Solana", "Web3.js", "Jupiter API", "Tailwind", "WebSockets"],
    accent:
      "from-violet-500/20 via-indigo-500/10 to-sky-500/16 dark:from-violet-400/18 dark:via-indigo-400/10 dark:to-sky-400/16",
    en: {
      type: "DeFi",
      label: "power user",
      vibe: "High-signal trading UI without looking like a casino.",
      line: "Trading terminal with wallet flows, market data, pre-trade analytics, and portfolio views.",
    },
    ar: {
      type: "تمويل لامركزي",
      label: "للمستخدم المحترف",
      vibe: "واجهة تداول عالية الإشارة دون أن تبدو كصالة قمار.",
      line: "منصّة تداول مع تدفّقات المحافظ، وبيانات السوق، وتحليلات ما قبل الصفقة، وعروض المحفظة الاستثمارية.",
    },
  },
  {
    name: "Mathly",
    href: "https://mathbuddy.ai/",
    stack: ["Next.js", "TypeScript", "React", "Framer Motion", "KaTeX", "Adaptive Engine"],
    accent:
      "from-amber-500/18 via-orange-500/10 to-yellow-500/20 dark:from-amber-400/16 dark:via-orange-400/10 dark:to-yellow-400/18",
    en: {
      type: "Education",
      label: "student-first",
      vibe: "Calm UX, clear paths, no clutter tax on learners.",
      line: "Math practice platform with adaptive problems, progress tracking, and a clean student UI.",
    },
    ar: {
      type: "تعليم",
      label: "الطالب أولًا",
      vibe: "تجربة هادئة، ومسارات واضحة، دون عبء بصري على المتعلّمين.",
      line: "منصّة تدرّب على الرياضيات مع مسائل تكيّفية، وتتبّع للتقدّم، وواجهة نظيفة للطالب.",
    },
  },
  {
    name: "AI Comic Creator",
    href: "https://ai-comic-nextjs.vercel.app/",
    stack: ["Next.js", "TypeScript", "Diffusion", "Image Gen", "Vercel", "Edge Fns"],
    accent:
      "from-purple-500/20 via-indigo-500/10 to-violet-500/18 dark:from-purple-400/18 dark:via-indigo-400/10 dark:to-violet-400/16",
    en: {
      type: "AI Creative",
      label: "visual gen",
      vibe: "Story in, comic out — consistent characters across every panel.",
      line: "AI-powered comic generation platform that transforms prompts into publication-ready panels with character consistency, panel-level editing, and multiple export formats.",
    },
    ar: {
      type: "إبداع بالذكاء الاصطناعي",
      label: "توليد بصري",
      vibe: "قصّةٌ تدخل، وقصّةٌ مصوّرة تخرج — بشخصياتٍ متّسقة في كل لوحة.",
      line: "منصّة لتوليد القصص المصوّرة بالذكاء الاصطناعي تحوّل الأوامر النصّية إلى لوحات جاهزة للنشر، مع اتساق الشخصيات، والتحرير على مستوى اللوحة، وصيغ تصدير متعدّدة.",
    },
  },
  {
    name: "Tokamak Chain Monitor",
    href: "https://tokamak-chain-monitor.vercel.app/chains",
    stack: ["Next.js 15", "Viem", "TanStack Query", "Tailwind", "WebSockets", "Recharts"],
    accent:
      "from-emerald-500/18 via-teal-500/8 to-cyan-500/18 dark:from-emerald-400/16 dark:via-teal-400/8 dark:to-cyan-400/16",
    en: {
      type: "Observability",
      label: "ops core",
      vibe: "Dense data, fast scanning, zero dashboard soup.",
      line: "L2 monitoring dashboard with live chain health, fee trends, fallback RPCs, and PDF reporting.",
    },
    ar: {
      type: "مراقبة وتتبّع",
      label: "نواة التشغيل",
      vibe: "بياناتٌ كثيفة، ومسحٌ سريع، ودون فوضى في اللوحات.",
      line: "لوحة مراقبة لشبكات الطبقة الثانية مع حالة الشبكة الحيّة، واتجاهات الرسوم، وخوادم RPC احتياطية، وتقارير PDF.",
    },
  },
];

export const otherWork: Project[] = [
  {
    name: "Avelia",
    href: "https://avelia.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Radix UI"],
    accent:
      "from-rose-500/18 via-orange-500/8 to-amber-500/16 dark:from-rose-400/16 dark:via-orange-400/8 dark:to-amber-400/16",
    en: {
      type: "UI Experiment",
      label: "interface lab",
      vibe: "Layout and motion studies with a focus on clean hierarchy.",
      line: "Interface exploration with refined typography, spacing, and subtle interaction patterns.",
    },
    ar: {
      type: "تجربة واجهة",
      label: "مختبر الواجهات",
      vibe: "دراساتٌ في التخطيط والحركة تركّز على تسلسل هرمي نظيف.",
      line: "استكشاف للواجهات مع طباعة مصقولة، وتباعد مدروس، وأنماط تفاعل خفيّة.",
    },
  },
  {
    name: "Forgee",
    href: "https://forgee-taupe.vercel.app/",
    stack: ["Next.js", "React", "Tailwind", "shadcn/ui", "React Hook Form"],
    accent:
      "from-stone-500/18 via-amber-500/8 to-orange-500/14 dark:from-stone-400/16 dark:via-amber-400/8 dark:to-orange-400/14",
    en: {
      type: "UI Experiment",
      label: "component craft",
      vibe: "Component-first UI with warm tones and deliberate restraint.",
      line: "Design-forward experiment exploring form layouts, cards, and responsive component systems.",
    },
    ar: {
      type: "تجربة واجهة",
      label: "حِرفة المكوّنات",
      vibe: "واجهةٌ تبدأ من المكوّن، بألوان دافئة وانضباطٍ مقصود.",
      line: "تجربة تصميمية أولًا تستكشف تخطيطات النماذج، والبطاقات، وأنظمة مكوّنات متجاوبة.",
    },
  },
  {
    name: "Arche",
    href: "https://arche-tau.vercel.app/",
    stack: ["Next.js", "TypeScript", "CSS Grid", "GSAP", "Design System"],
    accent:
      "from-slate-500/18 via-zinc-500/8 to-neutral-500/14 dark:from-slate-400/16 dark:via-zinc-400/8 dark:to-neutral-400/14",
    en: {
      type: "UI Experiment",
      label: "visual system",
      vibe: "Minimal structure, strong type, and calm visual rhythm.",
      line: "UI prototype built around grid systems, editorial layouts, and polished micro-interactions.",
    },
    ar: {
      type: "تجربة واجهة",
      label: "نظام بصري",
      vibe: "بنيةٌ مقتضبة، وطباعةٌ قوية، وإيقاعٌ بصري هادئ.",
      line: "نموذج أوّلي لواجهة مبنيّ حول أنظمة الشبكات، والتخطيطات التحريرية، والتفاعلات الدقيقة المصقولة.",
    },
  },
];

// ---------------------------------------------------------------------------
// Experience — company name stays Latin; role/place/line translated.
// ---------------------------------------------------------------------------

type ExperienceContent = { role: string; place: string; line: string };

export type Experience = {
  company: string;
  period: string;
  stack: string[];
} & Localized<ExperienceContent>;

export const experience: Experience[] = [
  {
    company: "PureSoft Labs OÜ",
    period: "Apr 2026 - Present",
    stack: ["TypeScript", "Node.js", "React", "AWS"],
    en: {
      role: "Software Engineer",
      place: "Remote, Estonia",
      line: "Driving full-stack delivery on the core product end to end — shipped a ground-up auth overhaul, cut API response times, and built internal tooling that made deploys faster and way less painful for the whole team.",
    },
    ar: {
      role: "مهندس برمجيات",
      place: "عن بُعد، إستونيا",
      line: "أقود تسليم المنتج الأساسي بشكل متكامل من طرفه إلى طرفه — أطلقتُ إعادة بناء كاملة لنظام المصادقة، وقلّصتُ أزمنة استجابة الواجهات البرمجية، وبنيتُ أدوات داخلية جعلت عمليات النشر أسرع وأقلّ إرهاقًا للفريق بأكمله.",
    },
  },
  {
    company: "Cardinal Web 3",
    period: "May 2026 - Present",
    stack: ["Web3", "Solidity", "TypeScript", "Blockchain"],
    en: {
      role: "Founding Engineer",
      place: "Remote, UAE",
      line: "Founding engineer building the security layer and smart-contract infra from zero — designed the on-chain monitoring pipeline, wallet integration flows, and a real-time alerting system that catches threats before they hit users.",
    },
    ar: {
      role: "مهندس مؤسِّس",
      place: "عن بُعد، الإمارات",
      line: "مهندس مؤسِّس يبني طبقة الأمان والبنية التحتية للعقود الذكية من الصفر — صمّمتُ خطّ مراقبة السلسلة، وتدفّقات دمج المحافظ، ونظام تنبيهات آنيّ يلتقط التهديدات قبل أن تصل إلى المستخدمين.",
    },
  },
  {
    company: "exzyt",
    period: "Oct 2025 - Jun 2026",
    stack: ["Next.js", "TypeScript", "Tailwind", "AWS"],
    en: {
      role: "Software Engineer",
      place: "Remote, UAE",
      line: "Shipped an M&A deal-room platform end to end — document workflows, granular role-based access, real-time collaboration, and locked-down file sharing that active deal teams now run their live transactions on.",
    },
    ar: {
      role: "مهندس برمجيات",
      place: "عن بُعد، الإمارات",
      line: "أطلقتُ منصّة غرفة صفقات لعمليات الدمج والاستحواذ بشكل متكامل — سير عمل للمستندات، وصلاحيات دقيقة قائمة على الأدوار، وتعاون آنيّ، ومشاركة ملفات محكمة تُدير عليها فرق الصفقات معاملاتها الحيّة الآن.",
    },
  },
  {
    company: "Stealth Startup",
    period: "Nov 2025 - May 2026",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    en: {
      role: "Software Engineer",
      place: "Remote, South Korea",
      line: "Owned the commerce engine solo — rebuilt transaction flows to run 3× faster and hunted down the payment-reliability bugs that were silently dropping revenue in production.",
    },
    ar: {
      role: "مهندس برمجيات",
      place: "عن بُعد، كوريا الجنوبية",
      line: "تولّيتُ محرّك التجارة بمفردي — أعدتُ بناء تدفّقات المعاملات لتعمل أسرع بثلاثة أضعاف، وتتبّعتُ أخطاء موثوقية المدفوعات التي كانت تُسقط الإيرادات بصمت في بيئة الإنتاج.",
    },
  },
  {
    company: "McKinsey & Company",
    period: "Mar 2025 - Sep 2025",
    stack: ["Strategy", "Leadership", "Problem Solving"],
    en: {
      role: "Forward Program Fellow",
      place: "Remote",
      line: "Handpicked for McKinsey's highly selective Forward Program — sharpened structured problem-solving and executive-level communication, then applied both to real business cases alongside a global cohort.",
    },
    ar: {
      role: "زميل برنامج Forward",
      place: "عن بُعد",
      line: "اختِيرتُ لبرنامج Forward شديد الانتقائية من ماكنزي — صقلتُ حلّ المشكلات المنظَّم والتواصل على المستوى التنفيذي، ثم طبّقتُهما على حالات أعمال حقيقية إلى جانب دفعة عالمية.",
    },
  },
  {
    company: "Minimalisticlearning",
    period: "Jan 2025 - Jun 2025",
    stack: ["React", "TypeScript", "Redux", "REST"],
    en: {
      role: "UI/UX Developer",
      place: "Remote, UK",
      line: "Rebuilt the student-facing experience from the ground up — shipped a reusable component library, nailed mobile responsiveness, and trimmed page load times to keep learners focused instead of waiting.",
    },
    ar: {
      role: "مطوّر واجهات وتجربة استخدام",
      place: "عن بُعد، المملكة المتحدة",
      line: "أعدتُ بناء تجربة الطالب من الأساس — أطلقتُ مكتبة مكوّنات قابلة لإعادة الاستخدام، وأتقنتُ التجاوب مع الأجهزة المحمولة، وقلّصتُ أزمنة تحميل الصفحات لإبقاء المتعلّمين مركّزين بدل الانتظار.",
    },
  },
  {
    company: "Datapoint",
    period: "Aug 2024 - Dec 2024",
    stack: ["Node.js", "Express", "REST", "Databases"],
    en: {
      role: "Back End Developer",
      place: "Remote, India",
      line: "Kept the backend humming — extended Node.js APIs powering auth, partner integrations, and data pipelines, shipped the webhook infrastructure, and tuned queries so the whole system stayed fast under real load.",
    },
    ar: {
      role: "مطوّر خادم",
      place: "عن بُعد، الهند",
      line: "أبقيتُ الخادم يعمل بسلاسة — وسّعتُ واجهات Node.js البرمجية التي تشغّل المصادقة، وتكاملات الشركاء، وخطوط البيانات، وأطلقتُ بنية الـ webhooks، وضبطتُ الاستعلامات ليبقى النظام كلّه سريعًا تحت الحِمل الحقيقي.",
    },
  },
];

// ---------------------------------------------------------------------------
// Stats section
// ---------------------------------------------------------------------------

type StatItem = { value: number; suffix: string; label: string };

export const stats: Localized<StatItem[]> = {
  en: [
    { value: 3, suffix: "+", label: "Years of Experience" },
    { value: 8, suffix: "+", label: "Projects Shipped" },
    { value: 7, suffix: "+", label: "Companies Worked With" },
    { value: 5, suffix: "", label: "Tech Stacks Mastered" },
  ],
  ar: [
    { value: 3, suffix: "+", label: "سنوات من الخبرة" },
    { value: 8, suffix: "+", label: "مشاريع مُطلَقة" },
    { value: 7, suffix: "+", label: "شركات عملتُ معها" },
    { value: 5, suffix: "", label: "أدوات تقنية مُتقَنة" },
  ],
};

// ---------------------------------------------------------------------------
// Command palette
// ---------------------------------------------------------------------------

export const commandPalette: Localized<{
  placeholder: string;
  about: string;
  projects: string;
  experience: string;
  stack: string;
  contact: string;
  downloadCv: string;
  lightMode: string;
  darkMode: string;
  switchLang: string;
  noResults: string;
  navigate: string;
  select: string;
}> = {
  en: {
    placeholder: "Search or jump to…",
    about: "Go to About",
    projects: "Go to Projects",
    experience: "Go to Timeline",
    stack: "Go to Stack",
    contact: "Go to Contact",
    downloadCv: "Download CV",
    lightMode: "Switch to light mode",
    darkMode: "Switch to dark mode",
    switchLang: "Switch to العربية",
    noResults: "No results found.",
    navigate: "navigate",
    select: "select",
  },
  ar: {
    placeholder: "ابحث أو انتقل إلى…",
    about: "انتقل إلى نبذة",
    projects: "انتقل إلى الأعمال",
    experience: "انتقل إلى المسيرة",
    stack: "انتقل إلى الأدوات",
    contact: "انتقل إلى التواصل",
    downloadCv: "تحميل السيرة الذاتية",
    lightMode: "التبديل إلى الوضع الفاتح",
    darkMode: "التبديل إلى الوضع الداكن",
    switchLang: "Switch to English",
    noResults: "لا توجد نتائج.",
    navigate: "التنقّل",
    select: "اختيار",
  },
};
