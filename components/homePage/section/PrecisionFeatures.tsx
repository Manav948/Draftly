"use client";

import { BarChart2, Bot, Focus, Globe, Layers, ListTodo, Moon, Zap } from "lucide-react";

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

export default function PrecisionFeatures() {
  return (
    <div className="relative w-full bg-slate-100/70 dark:bg-[#0d0d0d] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] bg-[size:28px_28px] border-y border-slate-200/80 dark:border-transparent transition-colors duration-300">
      <main className="w-full mx-auto max-w-[1200px] px-6 md:px-12">
        <section className="reveal-section py-24">
          <div className="text-center mb-12">
            <span className="text-slate-500 dark:text-[#525252] text-xs uppercase tracking-widest" style={{ fontFamily: "JetBrains Mono, monospace" }}>FEATURES</span>
            <h2 className="font-semibold text-3xl sm:text-4xl text-black dark:text-white mt-3">Precision tools for focus.</h2>
          </div>
          <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {precisionFeatures.map(({ Icon, title, desc }) => (
              <div key={title} className="feature-card bg-white dark:bg-[#0f0f0f] border border-slate-200/80 dark:border-[#1d1d1d] rounded-lg p-5 hover:border-slate-300 dark:hover:border-[#2d2d2d] hover:bg-slate-50 dark:hover:bg-[#111] shadow-sm dark:shadow-none transition-all duration-200 cursor-default group">
                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-[#161616] border border-slate-200 dark:border-[#222] flex items-center justify-center mb-4 group-hover:border-slate-300 dark:group-hover:border-[#333] transition-colors">
                  <Icon className="w-4 h-4 text-slate-600 dark:text-[#737373]" />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-1.5">{title}</h3>
                <p className="text-slate-600 dark:text-[#525252] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
