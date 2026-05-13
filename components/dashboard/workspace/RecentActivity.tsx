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
    <div className="flex flex-col h-full bg-white dark:bg-[#111] border border-gray-200/60 dark:border-[#1f1f1f] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-[#1a1a1a] bg-gradient-to-r from-gray-50/50 to-transparent dark:from-[#0a0a0a] dark:to-transparent">
        <div>
          <h3 className="text-[13px] font-bold text-gray-900 dark:text-[#f0f0f0] tracking-wide">Recent Activity</h3>
          <p className="text-[11px] text-gray-500 dark:text-[#555] mt-0.5 font-medium">Latest updates across workspaces</p>
        </div>
        <div className="p-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#222]">
          <Clock size={14} className="text-gray-400 dark:text-[#444]" />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {activity?.length ? (
          <div className="flex flex-col p-2 gap-1">
            {activity.map((item) => (
              <div
                key={item.id}
                className="group relative flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-[#141414] border border-transparent hover:border-gray-100 dark:hover:border-[#1f1f1f] transition-all duration-300 cursor-pointer"
              >
                {/* Emoji badge */}
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0c0c0c] border border-gray-100 dark:border-[#232323] shadow-sm flex items-center justify-center text-base shrink-0 group-hover:scale-105 group-hover:border-gray-200 dark:group-hover:border-[#2a2a2a] transition-all duration-300">
                  {item.emoji ?? "📝"}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-700 dark:text-[#bbb] truncate group-hover:text-gray-900 dark:group-hover:text-[#f0f0f0] transition-colors">
                    {item.title || "Untitled"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-[#555]">
                      {format.relativeTime(new Date(item.updatedAt), new Date())}
                    </span>
                    <span className="text-gray-300 dark:text-[#333] text-[10px]">●</span>
                    <span className="text-[10px] font-medium text-red-600 dark:text-red-500 truncate bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded-md border border-red-100 dark:border-red-500/20">
                      {item.workspace.name}
                    </span>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-red-50 dark:bg-red-500/10 p-1.5 rounded-full border border-red-100 dark:border-red-500/20 mr-1">
                  <ArrowUpRight size={12} className="text-red-600 dark:text-red-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-16 gap-2 text-gray-300 dark:text-[#333]">
            <Clock size={18} />
            <p className="text-[11px] text-gray-500 dark:text-[#444]">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}
