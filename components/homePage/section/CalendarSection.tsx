"use client";

import Image from "next/image";
import { homePageCalendarImgs } from "@/lib/constants";

export default function CalendarSection() {
  return (
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
  );
}
