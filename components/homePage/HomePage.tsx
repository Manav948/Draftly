"use client";
import {
  homePageCalendarImgs,
  homePagePomodoroImgs,
  homePageRolesAndSettingsImgs,
  homePageTasksImgs,
} from "@/lib/constants";
import { Nav } from "./navbar/Nav";
import Image from "next/image";
import WorkflowFlow from "./section/WorkflowFlow";
import Link from "next/link";
import { useLocale } from "next-intl";
import { CheckCircle2, Check, Zap, Globe, WifiOff, BarChart2, FileText, Bot, Focus, Layers, ListTodo, Moon } from "lucide-react";
import SmoothScroll from "./SmoothScroll";
import { useHomeAnimations } from "@/hooks/useHomeAnimations";
import SpotlightBeam from "./SpotlightBeam";

const precisionFeatures = [
  { Icon: ListTodo, title: "Task Management", desc: "Create, assign, and manage tasks with calendar-based tracking." },
  { Icon: Layers, title: "Workspace System", desc: "Multiple workspaces support with seamless switching without page reloads." },
  { Icon: Focus, title: "Mind Maps", desc: "Create and organize ideas visually, assign them to users and track updates." },
  { Icon: BarChart2, title: "Smart Calendar", desc: "View tasks across date ranges with multi-day task visualization." },
  { Icon: Zap, title: "Starred & Assigned", desc: "Quickly access important tasks and mind maps, filtered by workspace." },
  { Icon: Bot, title: "Focus Timer", desc: "Built-in Pomodoro timer to help you maintain deep work sessions." },
  { Icon: Moon, title: "Premium Themes", desc: "Carefully crafted dark and light themes with system preference persistence." },
  { Icon: Globe, title: "Global Ready", desc: "Multi-language support using next-intl for international teams." },
];

const logos = ["BET A AI", "VENTO...", "REFR...", "GENIX", "VRE A D", "ZAP"];

const activityFeed = [
  { action: "Updated", item: '"Q3 Roadmap Mind Map"', channel: "in Client Alpha", time: "2m ago" },
  { action: "Completed", item: '"Implement i18n Next-intl"', channel: "", time: "14m ago" },
  { action: "Switched workspace", item: '"Personal Productivity"', channel: "", time: "1h ago" },
];

function HomeContent() {
  useHomeAnimations();
  const locale = useLocale();
  const signUpPath = locale ? `/${locale}/sign-up` : "/sign-up";

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-white/20" style={{ fontFamily: "Geist, Inter, sans-serif" }}>
      <Nav />

      <main className="w-full mx-auto max-w-[1800px] px-6 md:px-12">

        {/* ── HERO ── */}
        <section className="flex flex-col items-center text-center pt-32 pb-24 relative overflow-hidden w-full">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-[#0a0a0a] bg-[linear-gradient(to_right,#2a2a2a_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-100 z-0 pointer-events-none" />

          {/* Stage spotlight beam */}
          <SpotlightBeam />

          <div className="relative z-10 hero-badge mb-8 inline-flex items-center gap-2 bg-[#111] border border-[#333] shadow-[0_0_15px_rgba(255,255,255,0.05)] rounded-full px-4 py-2 hover:border-[#555] transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              Draftly is live in beta
            </span>
          </div>

          <h1 className="relative z-10 hero-h1 font-extrabold text-5xl sm:text-7xl lg:text-[80px] max-w-5xl leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mt-2 pb-2 drop-shadow-sm">
            The unified workspace for <br className="hidden md:block" /> tasks & mind maps.
          </h1>
          <p className="relative z-10 hero-desc text-[#888] text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed font-medium">
            Draftly is a modern productivity platform that combines structured task management with visual planning and focused workflows — all in one place.
          </p>

          <div className="relative z-10 hero-btns mt-12 flex flex-wrap justify-center gap-4">
            <Link href={signUpPath} className="bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Start Shipping Today
            </Link>
            <button className="bg-transparent text-white border border-[#333] px-8 py-3.5 rounded-full font-medium hover:bg-[#111] hover:border-[#555] transition-all duration-200 hover:scale-105 backdrop-blur-sm">
              View Documentation
            </button>
          </div>

          <div className="relative z-10 hero-image mt-20 w-full max-w-[1000px] bg-[#0c0c0c] p-2 rounded-2xl border border-[#222] shadow-[0_0_60px_-15px_rgba(255,255,255,0.1)] transition-transform duration-500 hover:scale-[1.01] mx-auto">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
            <Image src={homePageTasksImgs[0].src} alt="Draftly Dashboard" width={1200} height={750} className="rounded-xl w-full border border-[#1a1a1a]" priority />
          </div>
        </section>

        {/* ── LOGO BAR ── */}
        <div className="logo-bar flex justify-between items-center text-[#404040] font-mono text-sm uppercase mb-32 border-t border-b border-[#1d1d1d] py-5">
          {logos.map((l) => <span key={l} className="tracking-widest">{l}</span>)}
        </div>

      </main>

      {/* ── PRECISION TOOLS — gray bg with dot grid ── */}
      <div className="relative w-full" style={{ background: "#0d0d0d", backgroundImage: "radial-gradient(circle, #1f1f1f 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
        <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
          <section className="reveal-section py-24">
            <div className="text-center mb-12">
              <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>FEATURES</span>
              <h2 className="font-semibold text-3xl sm:text-4xl text-white mt-3">Precision tools for focus.</h2>
            </div>
            <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {precisionFeatures.map(({ Icon, title, desc }) => (
                <div key={title} className="feature-card bg-[#0f0f0f] border border-[#1d1d1d] rounded-lg p-5 hover:border-[#2d2d2d] hover:bg-[#111] transition-all duration-200 cursor-default group">
                  <div className="w-8 h-8 rounded bg-[#161616] border border-[#222] flex items-center justify-center mb-4 group-hover:border-[#333] transition-colors">
                    <Icon className="w-4 h-4 text-[#737373]" />
                  </div>
                  <h3 className="font-medium text-white text-sm mb-1.5">{title}</h3>
                  <p className="text-[#525252] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* ── INTEGRATED MIND MAPS — pure black ── */}
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section mb-32 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>VISUAL PLANNING</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">Integrated Mind Maps.</h2>
            <p className="text-[#737373] text-lg leading-relaxed">
              Brainstorm, architect, and map out complex projects visually. Convert any node into a task with a single click and keep your high-level vision connected to daily execution.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { title: "Infinite Canvas", desc: "Organize thoughts without boundaries." },
                { title: "Task Linkage", desc: "Nodes sync directly with your backlog." },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <Check className="text-white/50 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-white font-medium block">{title}</span>
                    <span className="text-[#525252] text-sm">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="scroll-image lg:col-span-7">
            <WorkflowFlow />
          </div>
        </section>
      </main>

      {/* ── DESIGNED FOR SPEED — gray bg with line grid ── */}
      <div className="relative w-full" style={{ background: "#0d0d0d", backgroundImage: "linear-gradient(to right, #171717 1px, transparent 1px), linear-gradient(to bottom, #171717 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
        <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
          <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>PERFORMANCE</span>
              <h2 className="font-semibold text-3xl sm:text-4xl text-white">Designed for speed.</h2>
              <p className="text-[#737373] text-lg leading-relaxed">
                Everything you need is a keystroke away. A command-line inspired interface wrapped in a beautiful, modern shell.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { Icon: Zap, label: "Sub-millisecond interactions" },
                  { Icon: Globe, label: "Global command palette" },
                  { Icon: WifiOff, label: "Offline-first architecture" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <CheckCircle2 className="text-white/40 h-5 w-5 flex-shrink-0" />
                    <span className="text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-image lg:col-span-7">
              <div className="bg-[#0f0f0f] border border-[#1d1d1d] rounded-lg overflow-hidden shadow-2xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1d1d1d]">
                  <span className="w-3 h-3 rounded-full bg-[#333]" />
                  <span className="w-3 h-3 rounded-full bg-[#333]" />
                  <span className="w-3 h-3 rounded-full bg-[#333]" />
                  <span className="ml-2 text-[#404040] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>Sprint #24 Roadmap</span>
                </div>
                <div className="p-6 text-sm space-y-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                  <div className="flex items-center gap-3"><span className="text-[#737373]">❯</span><span className="text-[#737373]">draftly status</span></div>
                  <div className="pl-5 space-y-2 text-xs">
                    <p className="text-[#737373]">✓ Mind Map: Q3 Roadmap <span className="text-[#404040]">[DONE]</span></p>
                    <p className="text-white">⬡ Task: Implement i18n support <span className="text-[#404040]">[IN PROGRESS]</span></p>
                    <p className="text-[#525252]">○ Task: Set up Next.js App Router <span className="text-[#333]">[DONE]</span></p>
                    <p className="text-[#525252]">○ Workspace: Client Alpha <span className="text-[#333]">[ACTIVE]</span></p>
                    <p className="text-[#525252]">○ Sync with Pomodoro Session <span className="text-[#333]">[WAITING]</span></p>
                  </div>
                  <div className="flex items-center gap-3 pt-2"><span className="text-[#525252]">❯</span><span className="text-white animate-pulse">_</span></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ── BUILT-IN FOCUS ENGINE — pure black ── */}
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section mt-24 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="scroll-image lg:col-span-7 bg-[#0f0f0f] p-3 rounded-lg border border-[#1d1d1d] shadow-2xl">
            <Image src={homePagePomodoroImgs[0].src} alt="Focus Engine" width={800} height={500} className="rounded w-full" />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>DEEP WORK</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white">Built-in Focus Engine.</h2>
            <p className="text-[#737373] text-lg leading-relaxed">
              Protect your flow state with native Pomodoro timers and focus modes. Track your productivity analytics and maintain a consistent shipping streak.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {["Custom work intervals", "Soundscape integration", "Flow state analytics", "Auto-DND mode"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="text-white/40 h-4 w-4 flex-shrink-0" />
                  <span className="text-white text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── CODE IS A MARATHON — gray dot grid ── */}
      <div className="relative w-full" style={{ background: "#0c0c0c", backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
        <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
          <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>COLLABORATION</span>
              <h2 className="font-semibold text-3xl sm:text-4xl text-white">Collaboration<br />made simple.</h2>
              <p className="text-[#737373] text-lg leading-relaxed">
                Manage workspace-level permissions and assignments. Assign mind maps and tasks to users, track updates, and keep everyone aligned without the noise of typical project management tools.
              </p>
            </div>
            <div className="activity-feed lg:col-span-7">
              <div className="bg-[#0f0f0f] border border-[#1d1d1d] rounded-lg overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#1d1d1d]">
                  <span className="text-white text-sm font-medium">Team Activity</span>
                  <span className="text-[#404040] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>LIVE</span>
                </div>
                <div className="divide-y divide-[#141414]">
                  {activityFeed.map((item, i) => (
                    <div key={i} className="activity-item flex items-center gap-4 px-5 py-4 hover:bg-[#111] transition-colors duration-150">
                      <div className="w-8 h-8 rounded-full bg-[#161616] border border-[#222] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#737373] text-xs font-bold">{item.action[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          <span className="text-[#737373]">{item.action} </span>
                          <span className="font-medium">{item.item}</span>
                          {item.channel && <span className="text-[#737373]"> {item.channel}</span>}
                        </p>
                      </div>
                      <span className="text-[#404040] text-xs flex-shrink-0" style={{ fontFamily: "JetBrains Mono, monospace" }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ── SMART CALENDAR — pure black ── */}
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section mt-24 mb-32 flex flex-col items-center text-center">
          <span className="text-[#525252] text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>SCHEDULING</span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-white mb-4">Smart Calendar View.</h2>
          <p className="text-[#737373] text-lg leading-relaxed max-w-2xl mb-12">
            Visualize your workload across time. Draftly automatically schedules your tasks based on priority and deadline, ensuring you never overcommit.
          </p>
          <div className="scroll-image w-full bg-[#0f0f0f] p-3 rounded-lg border border-[#1d1d1d] mb-10 shadow-2xl">
            <Image src={homePageCalendarImgs[0].src} alt="Calendar View" width={1200} height={600} className="rounded w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[
              { title: "Starred & Assigned", desc: "Keep critical items front and center with dedicated starred and assigned views." },
              { title: "Workspace System", desc: "Separate your personal, client, and team work with isolated context switching." },
              { title: "Internationalization", desc: "Full support for global teams with multi-language UI and timezone synchronization." },
            ].map(({ title, desc }) => (
              <div key={title} className="feature-card bg-[#0f0f0f] p-6 rounded-lg border border-[#1d1d1d] text-left hover:border-[#2d2d2d] hover:bg-[#111] transition-all duration-200">
                <h3 className="font-medium text-white mb-2">{title}</h3>
                <p className="text-[#525252] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── TRULY YOURS — gray line grid ── */}
      <div className="relative w-full" style={{ background: "#0d0d0d", backgroundImage: "linear-gradient(to right, #161616 1px, transparent 1px), linear-gradient(to bottom, #161616 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
        <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
          <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>PERSONALIZATION</span>
              <h2 className="font-semibold text-3xl sm:text-4xl text-white">Truly yours.</h2>
              <p className="text-[#737373] text-lg leading-relaxed">
                Custom themes, notification sounds, and workflow settings. Draftly adapts to your unique way of working, not the other way around.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex -space-x-2">
                  {["#2a2a2a", "#1a1a1a", "#111111"].map((c) => (
                    <div key={c} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a]" style={{ background: c }} />
                  ))}
                </div>
                <span className="text-[#525252] text-sm">Joined by 12,000+ developers</span>
              </div>
            </div>
            <div className="scroll-image lg:col-span-7 bg-[#0f0f0f] p-3 rounded-lg border border-[#1d1d1d] shadow-2xl">
              <Image src={homePageRolesAndSettingsImgs[0].src} alt="Settings" width={800} height={500} className="rounded w-full" />
            </div>
          </section>
        </main>
      </div>

      {/* ── CTA — pure black ── */}
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="cta-section mt-12 mb-24 py-20 bg-[#0d0d0d] rounded-xl border border-[#1d1d1d] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[#525252] text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>FREE FOR INDIVIDUALS. START SHIPPING TODAY.</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Focus on what matters.</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={signUpPath} className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-white/90 transition-all duration-200 hover:scale-105">
                Get Started for Free
              </Link>
              <button className="bg-transparent text-white border border-[#333] px-8 py-3 rounded-md font-medium hover:bg-[#111] transition-all duration-200 hover:scale-105">
                Contact Sales
              </button>
            </div>
            <span className="text-[#404040] text-xs uppercase mt-6 tracking-widest block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              AVAILABLE ON MACOS, WINDOWS, AND LINUX
            </span>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#141414] bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            <div className="md:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <img src="/logo3.png" className="h-8 w-8 rounded-full" alt="Draftly" />
                <span className="text-white font-semibold text-lg uppercase tracking-wider">Draftly</span>
              </div>
              <p className="text-[#404040] text-sm leading-relaxed">
                Redefining productivity for engineering teams through precision design and integrated flow systems.
              </p>
            </div>
            {[
              { heading: "Product", links: ["Features", "Changelog", "Pricing"] },
              { heading: "Company", links: ["About", "Blog", "Careers"] },
              { heading: "Social", links: ["Twitter", "GitHub", "Discord"] },
            ].map(({ heading, links }) => (
              <div key={heading} className="flex flex-col gap-4">
                <h4 className="text-[#404040] text-xs uppercase tracking-widest font-medium" style={{ fontFamily: "JetBrains Mono, monospace" }}>{heading}</h4>
                <div className="flex flex-col gap-3">
                  {links.map((l) => (
                    <a key={l} href="#" className="text-[#737373] text-sm hover:text-white transition-colors duration-150">{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#141414] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#404040] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              © {new Date().getFullYear()} Draftly. Built for focus.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service"].map((l) => (
                <a key={l} href="#" className="text-[#404040] text-xs hover:text-[#737373] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const HomePage = () => (
  <SmoothScroll>
    <HomeContent />
  </SmoothScroll>
);
