"use client"

import { CheckCircle2, Layers, Bookmark, Users } from "lucide-react"
import { DashboardSummary } from "@/types/extended"

interface Props {
  data: DashboardSummary | undefined
}

const stats = (data: DashboardSummary | undefined) => [
  { label: "Tasks", value: data?.stats.totalTasks ?? 0, icon: CheckCircle2, sub: "total created" },
  { label: "Workspaces", value: data?.stats.workspaces ?? 0, icon: Layers, sub: "you belong to" },
  { label: "Starred", value: data?.stats.starred ?? 0, icon: Bookmark, sub: "saved items" },
  { label: "Assigned", value: data?.stats.assigned ?? 0, icon: Users, sub: "pending for you" },
]

export default function StatRow({ data }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats(data).map((s) => (
        <div
          key={s.label}
          className="group relative flex flex-col gap-5 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-[#111] dark:to-[#0a0a0a] border border-gray-200/60 dark:border-[#1f1f1f] rounded-2xl hover:border-red-500/30 dark:hover:border-red-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1 overflow-hidden"
        >
          {/* Background subtle glowing effect on hover */}
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/10 dark:group-hover:bg-red-500/20 transition-all duration-500" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] font-bold text-gray-500 dark:text-[#555] uppercase tracking-widest">
              {s.label}
            </span>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#222] group-hover:bg-red-50 dark:group-hover:bg-red-500/10 group-hover:border-red-100 dark:group-hover:border-red-500/20 transition-colors duration-300">
              <s.icon size={14} className="text-gray-400 dark:text-[#444] group-hover:text-red-600 transition-colors duration-200" />
            </div>
          </div>

          <div className="relative z-10 mt-1">
            <p className="text-[36px] font-bold text-gray-900 dark:text-[#f0f0f0] tracking-tight leading-none group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
              {s.value}
            </p>
            <p className="text-[11px] font-medium text-gray-500 dark:text-[#444] mt-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
