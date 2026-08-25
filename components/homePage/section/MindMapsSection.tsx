"use client";

import { Check } from "lucide-react";
import WorkflowFlow from "./WorkflowFlow";

export default function MindMapsSection() {
  return (
    <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
      <section className="reveal-section mb-32 mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="text-slate-500 dark:text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>VISUAL PLANNING</span>
          <h2 className="font-semibold text-3xl sm:text-4xl text-black dark:text-white">Integrated Mind Maps.</h2>
          <p className="text-slate-600 dark:text-[#737373] text-lg leading-relaxed">
            Brainstorm, architect, and map out complex projects visually. Convert any node into a task with a single click and keep your high-level vision connected to daily execution.
          </p>
          <div className="flex flex-col gap-5">
            {[
              { title: "Infinite Canvas", desc: "Organize thoughts without boundaries." },
              { title: "Task Linkage", desc: "Nodes sync directly with your backlog." },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <Check className="text-slate-700 dark:text-white/50 h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-slate-900 dark:text-white font-medium block">{title}</span>
                  <span className="text-slate-500 dark:text-[#525252] text-sm">{desc}</span>
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
  );
}
