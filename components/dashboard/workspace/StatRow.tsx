"use client"

import { CheckCircle2, Layers, Bookmark, Users } from "lucide-react"
import { DashboardSummary } from "@/types/extended"

interface Props {
  data: DashboardSummary | undefined
}

const stats = (data: DashboardSummary | undefined) => [
  { label: "Tasks",      value: data?.stats.totalTasks ?? 0, icon: CheckCircle2, sub: "total created"   },
  { label: "Workspaces", value: data?.stats.workspaces  ?? 0, icon: Layers,       sub: "you belong to"   },
  { label: "Starred",    value: data?.stats.starred     ?? 0, icon: Bookmark,     sub: "saved items"     },
  { label: "Assigned",   value: data?.stats.assigned    ?? 0, icon: Users,        sub: "pending for you" },
]

export default function StatRow({ data }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats(data).map((s) => (
        <div
          key={s.label}
          className="group flex flex-col gap-4 p-5 bg-[#131313] border border-[#1f1f1f] rounded-xl hover:border-[#2a2a2a] transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[#555] uppercase tracking-widest">
              {s.label}
            </span>
            <s.icon size={14} className="text-[#333] group-hover:text-red-600 transition-colors duration-200" />
          </div>
          <div>
            <p className="text-[32px] font-semibold text-[#f0f0f0] tracking-tight leading-none">
              {s.value}
            </p>
            <p className="text-[11px] text-[#444] mt-2">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
