"use client";

import { CheckCircle2 } from "lucide-react";

export default function SpeedSection() {
  return (
    <div className="relative w-full bg-slate-100/70 dark:bg-[#0d0d0d] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] bg-[size:32px_32px] border-y border-slate-200/80 dark:border-transparent transition-colors duration-300">
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-slate-500 dark:text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>PERFORMANCE</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-black dark:text-white">Designed for speed.</h2>
            <p className="text-slate-600 dark:text-[#737373] text-lg leading-relaxed">
              Everything you need is a keystroke away. A command-line inspired interface wrapped in a beautiful, modern shell.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Sub-millisecond interactions",
                "Global command palette",
                "Offline-first architecture",
              ].map((label) => (
                <div key={label} className="flex items-center gap-3">
                  <CheckCircle2 className="text-slate-700 dark:text-white/40 h-5 w-5 flex-shrink-0" />
                  <span className="text-slate-800 dark:text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="scroll-image lg:col-span-7">
            <div className="bg-slate-900 dark:bg-[#0f0f0f] border border-slate-800 dark:border-[#1d1d1d] rounded-lg overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 dark:border-[#1d1d1d]">
                <span className="w-3 h-3 rounded-full bg-slate-700 dark:bg-[#333]" />
                <span className="w-3 h-3 rounded-full bg-slate-700 dark:bg-[#333]" />
                <span className="w-3 h-3 rounded-full bg-slate-700 dark:bg-[#333]" />
                <span className="ml-2 text-slate-400 dark:text-[#404040] text-xs" style={{ fontFamily: "JetBrains Mono, monospace" }}>Sprint #24 Roadmap</span>
              </div>
              <div className="p-6 text-sm space-y-3" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <div className="flex items-center gap-3"><span className="text-slate-400 dark:text-[#737373]">❯</span><span className="text-slate-300 dark:text-[#737373]">draftly status</span></div>
                <div className="pl-5 space-y-2 text-xs">
                  <p className="text-slate-400 dark:text-[#737373]">✓ Mind Map: Q3 Roadmap <span className="text-slate-500 dark:text-[#404040]">[DONE]</span></p>
                  <p className="text-white">⬡ Task: Implement i18n support <span className="text-slate-400 dark:text-[#404040]">[IN PROGRESS]</span></p>
                  <p className="text-slate-400 dark:text-[#525252]">○ Task: Set up Next.js App Router <span className="text-slate-500 dark:text-[#333]">[DONE]</span></p>
                  <p className="text-slate-400 dark:text-[#525252]">○ Workspace: Client Alpha <span className="text-slate-500 dark:text-[#333]">[ACTIVE]</span></p>
                  <p className="text-slate-400 dark:text-[#525252]">○ Sync with Pomodoro Session <span className="text-slate-500 dark:text-[#333]">[WAITING]</span></p>
                </div>
                <div className="flex items-center gap-3 pt-2"><span className="text-slate-400 dark:text-[#525252]">❯</span><span className="text-white animate-pulse">_</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
