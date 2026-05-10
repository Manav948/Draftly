"use client"

import { useFormatter } from "next-intl"
import { DashboardSummary } from "@/types/extended"
import { Clock, ArrowUpRight } from "lucide-react"

interface Props {
  activity: DashboardSummary["recentActivity"]
}

export default function RecentActivity({ activity }: Props) {
  const format = useFormatter()

  return (
    <div className="flex flex-col h-full bg-[#131313] border border-[#1f1f1f] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
        <div>
          <h3 className="text-sm font-medium text-[#f0f0f0]">Recent Activity</h3>
          <p className="text-[11px] text-[#444] mt-0.5">Latest updates</p>
        </div>
        <Clock size={13} className="text-[#333]" />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#181818]">
        {activity?.length ? (
          activity.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-3 px-5 py-3.5 hover:bg-[#181818] transition-colors cursor-pointer"
            >
              {/* Emoji badge */}
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#232323] flex items-center justify-center text-sm shrink-0 group-hover:border-[#2a2a2a] transition-colors">
                {item.emoji ?? "📝"}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-medium text-[#bbb] truncate group-hover:text-[#f0f0f0] transition-colors">
                  {item.title || "Untitled"}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-[#444]">
                    {format.relativeTime(new Date(item.updatedAt), new Date())}
                  </span>
                  <span className="text-[#2a2a2a]">·</span>
                  <span className="text-[11px] text-red-700 truncate">
                    {item.workspace.name}
                  </span>
                </div>
              </div>

              <ArrowUpRight size={12} className="text-[#2a2a2a] group-hover:text-[#555] shrink-0 transition-colors" />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16 gap-2 text-[#333]">
            <Clock size={18} />
            <p className="text-[11px] text-[#444]">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}
