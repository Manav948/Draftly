"use client";

import Image from "next/image";
import { homePageRolesAndSettingsImgs } from "@/lib/constants";

export default function SettingsSection() {
  return (
    <div className="relative w-full bg-slate-100/70 dark:bg-[#0d0d0d] bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:28px_28px] border-y border-slate-200/80 dark:border-transparent transition-colors duration-300">
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-slate-500 dark:text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>PERSONALIZATION</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-black dark:text-white">Truly yours.</h2>
            <p className="text-slate-600 dark:text-[#737373] text-lg leading-relaxed">
              Custom themes, notification sounds, and workflow settings. Draftly adapts to your unique way of working, not the other way around.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex -space-x-2">
                {["#94a3b8", "#64748b", "#334155"].map((c) => (
                  <div key={c} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0a0a0a]" style={{ background: c }} />
                ))}
              </div>
              <span className="text-slate-500 dark:text-[#525252] text-sm">Joined by 12,000+ developers</span>
            </div>
          </div>
          <div className="scroll-image lg:col-span-7 bg-white dark:bg-[#0f0f0f] p-3 rounded-lg border border-slate-200 dark:border-[#1d1d1d] shadow-xl dark:shadow-2xl transition-colors duration-300">
            <Image src={homePageRolesAndSettingsImgs[0].src} alt="Settings" width={800} height={500} className="rounded w-full border border-slate-100 dark:border-[#1a1a1a]" />
          </div>
        </section>
      </main>
    </div>
  );
}
