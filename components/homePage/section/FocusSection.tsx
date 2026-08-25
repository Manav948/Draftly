"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { homePagePomodoroImgs } from "@/lib/constants";

export default function FocusSection() {
  return (
    <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
      <section className="reveal-section mt-24 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="scroll-image lg:col-span-7 bg-white dark:bg-[#0f0f0f] p-3 rounded-lg border border-slate-200 dark:border-[#1d1d1d] shadow-xl dark:shadow-2xl transition-colors duration-300">
          <Image src={homePagePomodoroImgs[0].src} alt="Focus Engine" width={800} height={500} className="rounded w-full border border-slate-100 dark:border-[#1a1a1a]" />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-slate-500 dark:text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>DEEP WORK</span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-black dark:text-white">Built-in Focus Engine.</h2>
          <p className="text-slate-600 dark:text-[#737373] text-lg leading-relaxed">
            Protect your flow state with native Pomodoro timers and focus modes. Track your productivity analytics and maintain a consistent shipping streak.
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {["Custom work intervals", "Soundscape integration", "Flow state analytics", "Auto-DND mode"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="text-slate-700 dark:text-white/40 h-4 w-4 flex-shrink-0" />
                <span className="text-slate-800 dark:text-white text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
