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
  );
}
