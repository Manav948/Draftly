"use client";
import {
  homePageCalendarImgs,
  homePageMindMapsImgs,
  homePagePomodoroImgs,
  homePageRolesAndSettingsImgs,
  homePageTasksImgs,
} from "@/lib/constants";
import { Nav } from "./navbar/Nav";
import Image from "next/image";
import WorkflowFlow from "./section/WorkflowFlow";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  CheckCircle2,
  Check,
  Zap,
  Globe,
  WifiOff,
  BarChart2,
  Calendar,
  FileText,
  Bot,
  Focus,
  Layers,
  ListTodo,
} from "lucide-react";

/* ── Precision feature cards ──────────────────────────── */
const precisionFeatures = [
  {
    Icon: ListTodo,
    title: "Task Management",
    desc: "Blazing fast keyboard-first task capture and triage.",
  },
  {
    Icon: Layers,
    title: "Workspace Organization",
    desc: "Isolated contexts for side projects and production apps.",
  },
  {
    Icon: BarChart2,
    title: "Progress Tracking",
    desc: "Visual velocity charts that help you estimate shipping dates with high accuracy.",
  },
  {
    Icon: Globe,
    title: "Roadmap Planning",
    desc: "High-level strategic views that sync with daily execution tasks automatically.",
  },
  {
    Icon: Focus,
    title: "Daily Focus",
    desc: "A minimal mode that hides everything but your current top-3 priorities.",
  },
  {
    Icon: FileText,
    title: "Developer Notes",
    desc: "Markdown-first notes integrated directly with your tickets.",
  },
  {
    Icon: BarChart2,
    title: "Productivity Analytics",
    desc: "Data-driven insights into your flow state cycles and time distribution.",
  },
  {
    Icon: Bot,
    title: "AI Assistance",
    desc: "Automated task breakdown and smart labeling to keep your backlog clean.",
  },
];

const activityFeed = [
  {
    action: "Shared",
    item: '"API Design Docs"',
    channel: "to #engineering",
    time: "2m ago",
  },
  {
    action: "Completed",
    item: '"Fix SSR hydration bug"',
    channel: "",
    time: "14m ago",
  },
  {
    action: "Created workspace",
    item: '"NextGen Mobile"',
    channel: "",
    time: "1h ago",
  },
];

export const HomePage = () => {
  const locale = useLocale();
  const signUpPath = locale ? `/${locale}/sign-up` : "/sign-up";

  return (
    <div
      className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#ef4444] selection:text-white"
      style={{ fontFamily: "Geist, Inter, sans-serif" }}
    >
      {/* Sticky Nav */}
      <Nav />

      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="flex flex-col items-center text-center pt-28 pb-24">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 bg-[#111111] border border-[#262626] rounded px-3 py-1.5">
            <span
              className="text-[#ef4444] text-xs tracking-widest uppercase"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Refactor API Layer
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
          </div>

          <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl max-w-4xl leading-[1.05] tracking-tight text-white mt-2">
            Build your developer{" "}
            <span className="text-[#ef4444]">workflow.</span>
          </h1>
          <p className="text-[#a1a1aa] text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed">
            Organize technical debt, track shipping velocity, and reclaim your
            deep work hours. Draftly is the productivity operating system
            designed for modern engineering teams.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={signUpPath}
              className="bg-[#ef4444] text-white px-7 py-3 rounded-md font-medium hover:bg-[#dc2626] transition-all duration-200 hover:scale-105"
            >
              Get Started Free
            </Link>
            <button className="bg-[#111111] text-white border border-[#262626] px-7 py-3 rounded-md font-medium hover:bg-[#1a1a1a] transition-all duration-200 hover:scale-105">
              Download App
            </button>
          </div>

          {/* Hero image */}
          <div className="mt-16 w-full bg-[#111111] p-3 rounded-xl border border-[#262626] relative group shadow-2xl">
            <div className="absolute -inset-px bg-gradient-to-b from-[#ef4444]/20 to-transparent rounded-xl pointer-events-none" />
            <Image
              src={homePageTasksImgs[0].src}
              alt="Draftly App Dashboard"
              width={1200}
              height={750}
              className="rounded-lg w-full"
              priority
            />
          </div>
        </section>

        {/* ── PRECISION TOOLS GRID ─────────────────────────── */}
        <section className="mb-32">
          <div className="text-center mb-14">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              FEATURES
            </span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white mt-3">
              Precision tools for focus.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {precisionFeatures.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#111111] border border-[#262626] rounded-lg p-5 hover:border-[#3f3f46] hover:bg-[#141414] transition-all duration-200 cursor-default group"
              >
                <div className="w-8 h-8 rounded bg-[#1a1a1a] border border-[#262626] flex items-center justify-center mb-4 group-hover:border-[#ef4444]/40 transition-colors duration-200">
                  <Icon className="w-4 h-4 text-[#ef4444]" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">
                  {title}
                </h3>
                <p className="text-[#71717a] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── MIND MAPS ────────────────────────────────────── */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              VISUAL PLANNING
            </span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">
              Integrated Mind Maps.
            </h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Brainstorm, architect, and map out complex projects visually.
              Convert any node into a task with a single click and keep your
              high-level vision connected to daily execution.
            </p>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Check className="text-[#ef4444] h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium block">
                    Infinite Canvas
                  </span>
                  <span className="text-[#71717a] text-sm">
                    Organize thoughts without boundaries.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="text-[#ef4444] h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium block">
                    Task Linkage
                  </span>
                  <span className="text-[#71717a] text-sm">
                    Nodes sync directly with your backlog.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <WorkflowFlow />
          </div>
        </section>

        {/* ── DESIGNED FOR SPEED ───────────────────────────── */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              PERFORMANCE
            </span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">
              Designed for speed.
            </h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Everything you need is a keystroke away. A command-line inspired
              interface wrapped in a beautiful, modern shell.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              {[
                { Icon: Zap, label: "Sub-millisecond interactions" },
                { Icon: Globe, label: "Global command palette" },
                { Icon: WifiOff, label: "Offline-first architecture" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#ef4444] h-5 w-5 flex-shrink-0" />
                  <span className="text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal mockup */}
          <div className="lg:col-span-7">
            <div className="bg-[#111111] border border-[#262626] rounded-lg overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#262626]">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
                <span
                  className="ml-2 text-[#525252] text-xs"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  Sprint #24 Roadmap
                </span>
              </div>
              {/* Terminal body */}
              <div
                className="p-6 text-sm space-y-3"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#ef4444]">❯</span>
                  <span className="text-[#a1a1aa]">draftly sprint list</span>
                </div>
                <div className="pl-5 space-y-2 text-xs">
                  <p className="text-[#22c55e]">
                    ✓ Fix SSR hydration bug{" "}
                    <span className="text-[#525252]">[DONE]</span>
                  </p>
                  <p className="text-[#ef4444]">
                    ⬡ Migrate auth to OAuth2{" "}
                    <span className="text-[#525252]">[IN PROGRESS]</span>
                  </p>
                  <p className="text-[#a1a1aa]">
                    ○ Refactor API layer{" "}
                    <span className="text-[#525252]">[BACKLOG]</span>
                  </p>
                  <p className="text-[#a1a1aa]">
                    ○ Write integration tests{" "}
                    <span className="text-[#525252]">[BACKLOG]</span>
                  </p>
                  <p className="text-[#a1a1aa]">
                    ○ Deploy to staging{" "}
                    <span className="text-[#525252]">[BACKLOG]</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-[#ef4444]">❯</span>
                  <span className="text-white animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOCUS ENGINE ─────────────────────────────────── */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 bg-[#111111] p-3 rounded-lg border border-[#262626] relative group shadow-2xl">
            <div className="absolute -inset-8 bg-[#ef4444] opacity-10 blur-3xl group-hover:opacity-15 transition-opacity duration-500 rounded-xl -z-10" />
            <Image
              src={homePagePomodoroImgs[0].src}
              alt="Focus Engine"
              width={800}
              height={500}
              className="rounded w-full"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              DEEP WORK
            </span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">
              Built-in Focus Engine.
            </h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Protect your flow state with native Pomodoro timers and focus
              modes. Track your productivity analytics and maintain a consistent
              shipping streak.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-2">
              {[
                "Custom work intervals",
                "Soundscape integration",
                "Flow state analytics",
                "Auto-DND mode",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#ef4444] h-4 w-4 flex-shrink-0" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACTIVITY FEED ───────────────────────────────── */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              COLLABORATION
            </span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">
              Code is a marathon,<br />not a sprint.
            </h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Shared workspaces designed for clarity. Tag teammates, assign
              ownership, and see real-time progress without the noise of typical
              project management tools.
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Activity feed card */}
            <div className="bg-[#111111] border border-[#262626] rounded-lg overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#262626]">
                <span className="text-white text-sm font-medium">
                  Team Activity
                </span>
                <span
                  className="text-[#525252] text-xs"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  LIVE
                </span>
              </div>
              <div className="divide-y divide-[#1a1a1a]">
                {activityFeed.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-[#141414] transition-colors duration-150"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#ef4444] text-xs font-bold">
                        {item.action[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">
                        <span className="text-[#a1a1aa]">{item.action} </span>
                        <span className="font-medium">{item.item}</span>
                        {item.channel && (
                          <span className="text-[#ef4444]"> {item.channel}</span>
                        )}
                      </p>
                    </div>
                    <span
                      className="text-[#525252] text-xs flex-shrink-0"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SMART CALENDAR ──────────────────────────────── */}
        <section className="mb-32 flex flex-col items-center text-center">
          <span
            className="text-[#ef4444] text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            SCHEDULING
          </span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-white mb-4">
            Smart Calendar View.
          </h2>
          <p className="text-[#a1a1aa] text-lg leading-relaxed max-w-2xl mb-12">
            Visualize your workload across time. Draftly automatically schedules
            your tasks based on priority and deadline, ensuring you never
            overcommit.
          </p>

          <div className="w-full bg-[#111111] p-3 rounded-lg border border-[#262626] mb-10 shadow-2xl">
            <Image
              src={homePageCalendarImgs[0].src}
              alt="Calendar View"
              width={1200}
              height={600}
              className="rounded w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {[
              {
                title: "Starred & Assigned",
                desc: "Keep critical items front and center with dedicated starred and assigned views.",
              },
              {
                title: "Workspace System",
                desc: "Separate your personal, client, and team work with isolated context switching.",
              },
              {
                title: "Internationalization",
                desc: "Full support for global teams with multi-language UI and timezone synchronization.",
              },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="bg-[#111111] p-6 rounded-lg border border-[#262626] text-left hover:border-[#3f3f46] hover:bg-[#141414] transition-all duration-200 cursor-default"
              >
                <h3 className="font-medium text-white mb-2">{title}</h3>
                <p className="text-[#71717a] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PERSONALIZATION ─────────────────────────────── */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              PERSONALIZATION
            </span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">
              Truly yours.
            </h2>
            <p className="text-[#a1a1aa] text-lg leading-relaxed">
              Custom themes, notification sounds, and workflow settings. Draftly
              adapts to your unique way of working, not the other way around.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex -space-x-2">
                {["#ef4444", "#111111", "#262626"].map((c) => (
                  <div
                    key={c}
                    className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="text-[#a1a1aa] text-sm">
                Joined by 12,000+ developers
              </span>
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#111111] p-3 rounded-lg border border-[#262626] shadow-2xl">
            <Image
              src={homePageRolesAndSettingsImgs[0].src}
              alt="Settings"
              width={800}
              height={500}
              className="rounded w-full"
            />
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="mb-24 py-20 bg-[#111111] rounded-xl border border-[#262626] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#ef4444]/5 via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col items-center">
            <span
              className="text-[#ef4444] text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              FREE FOR INDIVIDUALS
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Turn consistency into progress.
            </h2>
            <p className="text-[#a1a1aa] text-lg mb-8 max-w-xl">
              Start shipping today. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={signUpPath}
                className="bg-[#ef4444] text-white px-8 py-3 rounded-md font-medium hover:bg-[#dc2626] transition-all duration-200 hover:scale-105"
              >
                Get Started for Free
              </Link>
              <button className="bg-[#0a0a0a] text-white border border-[#262626] px-8 py-3 rounded-md font-medium hover:bg-[#141414] transition-all duration-200 hover:scale-105">
                Contact Sales
              </button>
            </div>
            <span
              className="text-[#525252] text-xs uppercase mt-6 tracking-widest block"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              AVAILABLE ON MACOS, WINDOWS, AND LINUX
            </span>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] mt-4">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            {/* Brand */}
            <div className="md:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img src="/logo3.png" className="h-8 w-8 rounded-full" alt="Draftly" />
                <span className="text-white font-semibold text-lg uppercase tracking-wider">
                  Draftly
                </span>
              </div>
              <p className="text-[#525252] text-sm leading-relaxed">
                Redefining productivity for engineering teams through precision
                design and integrated flow systems.
              </p>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-4">
              <h4
                className="text-[#525252] text-xs uppercase tracking-widest font-medium"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Product
              </h4>
              <div className="flex flex-col gap-3">
                {["Features", "Changelog", "Pricing"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-[#a1a1aa] text-sm hover:text-white transition-colors duration-150"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4">
              <h4
                className="text-[#525252] text-xs uppercase tracking-widest font-medium"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Company
              </h4>
              <div className="flex flex-col gap-3">
                {["About", "Blog", "Careers"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-[#a1a1aa] text-sm hover:text-white transition-colors duration-150"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <h4
                className="text-[#525252] text-xs uppercase tracking-widest font-medium"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                Social
              </h4>
              <div className="flex flex-col gap-3">
                {["Twitter", "GitHub", "Discord"].map((l) => (
                  <a
                    key={l}
                    href="#"
                    className="text-[#a1a1aa] text-sm hover:text-white transition-colors duration-150"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-[#525252] text-xs"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              © {new Date().getFullYear()} Draftly Systems Inc. Built for deep work.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-[#525252] text-xs hover:text-[#a1a1aa] transition-colors duration-150"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
