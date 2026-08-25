"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function CTASection() {
  const locale = useLocale();
  const signUpPath = locale ? `/${locale}/sign-up` : "/sign-up";

  return (
    <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
      <section className="cta-section mt-12 mb-24 py-20 bg-slate-900 dark:bg-[#0d0d0d] rounded-xl border border-slate-800 dark:border-[#1d1d1d] text-center relative overflow-hidden shadow-2xl transition-colors duration-300">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] dark:from-white/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-slate-400 dark:text-[#525252] text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "JetBrains Mono, monospace" }}>FREE FOR INDIVIDUALS. START SHIPPING TODAY.</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">Focus on what matters.</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={signUpPath} className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-slate-100 transition-all duration-200 hover:scale-105 shadow-md">
              Get Started for Free
            </Link>
            <button className="bg-transparent text-white border border-slate-700 dark:border-[#333] px-8 py-3 rounded-md font-medium hover:bg-slate-800 dark:hover:bg-[#111] transition-all duration-200 hover:scale-105">
              Contact Sales
            </button>
          </div>
          <span className="text-slate-400 dark:text-[#404040] text-xs uppercase mt-6 tracking-widest block" style={{ fontFamily: "JetBrains Mono, monospace" }}>
            AVAILABLE ON MACOS, WINDOWS, AND LINUX
          </span>
        </div>
      </section>
    </main>
  );
}
