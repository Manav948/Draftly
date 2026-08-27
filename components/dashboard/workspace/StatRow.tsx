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
          className="group flex flex-col gap-5 p-6 bg-white dark:bg-[#111] border border-gray-200/80 dark:border-[#1f1f1f] rounded-2xl hover:border-gray-300 dark:hover:border-[#2a2a2a] transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 dark:text-[#666] uppercase tracking-widest">
              {s.label}
            </span>
            <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#222] group-hover:bg-gray-100 dark:group-hover:bg-[#222] transition-colors duration-200">
              <s.icon size={14} className="text-gray-400 dark:text-[#555] group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-200" />
            </div>
          </div>

          <div className="mt-1">
            <p className="text-[36px] font-bold text-gray-900 dark:text-[#f0f0f0] tracking-tight leading-none">
              {s.value}
            </p>
            <p className="text-[11px] font-medium text-gray-500 dark:text-[#555] mt-2">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
