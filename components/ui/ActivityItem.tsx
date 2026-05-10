"use client"

import { useFormatter } from "next-intl"

interface ActivityItemProps {
  item: {
    emoji: string | null
    title: string
    updatedAt: string | Date
    workspace: { name: string }
  }
}

const ActivityItem = ({ item }: ActivityItemProps) => {
  const format = useFormatter()

  return (
    <div className="
      group flex items-center gap-3 p-3 rounded-xl
      bg-[#131313] border border-[#1f1f1f]
      hover:border-[#2a2a2a] hover:bg-[#181818]
      transition-all duration-150 cursor-pointer
    ">
      {/* Emoji */}
      <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-[#232323] flex items-center justify-center text-sm shrink-0 group-hover:border-[#2a2a2a] transition-colors">
        {item.emoji ?? "📝"}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-medium text-[#bbb] truncate group-hover:text-[#f0f0f0] transition-colors">
          {item.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] text-[#444]">
            {format.relativeTime(new Date(item.updatedAt), new Date())}
          </span>
          <span className="text-[#2a2a2a]">·</span>
          <span className="text-[10px] text-red-700 truncate max-w-[100px]">
            {item.workspace.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ActivityItem