"use client"

import { DashboardSummary } from "@/types/extended"
import { Layers, Users, ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Map Prisma WorkspaceIconColor enum to tailwind bg colors
const colorMap: Record<string, string> = {
  RED:     "bg-red-600",
  PURPLE:  "bg-purple-600",
  BLUE:    "bg-blue-600",
  GREEN:   "bg-emerald-600",
  PINK:    "bg-pink-600",
  YELLOW:  "bg-yellow-500",
  ORANGE:  "bg-orange-500",
  CYAN:    "bg-cyan-500",
  LIME:    "bg-lime-500",
  EMERALD: "bg-emerald-500",
  INDIGO:  "bg-indigo-600",
  FUCHSIA: "bg-fuchsia-600",
}

// Map color to muted text for labels
const colorTextMap: Record<string, string> = {
  RED:     "text-red-400",
  PURPLE:  "text-purple-400",
  BLUE:    "text-blue-400",
  GREEN:   "text-emerald-400",
  PINK:    "text-pink-400",
  YELLOW:  "text-yellow-400",
  ORANGE:  "text-orange-400",
  CYAN:    "text-cyan-400",
  LIME:    "text-lime-400",
  EMERALD: "text-emerald-400",
  INDIGO:  "text-indigo-400",
  FUCHSIA: "text-fuchsia-400",
}

interface Props {
  workspaces: DashboardSummary["workspaces"]
}

function WorkspaceAvatar({ ws }: { ws: Props["workspaces"][number] }) {
  if (ws.image) {
    return (
      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-[#232323]">
        <Image
          src={ws.image}
          alt={ws.name}
          width={36}
          height={36}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }
  // No image — use initial with color from schema
  const bg    = colorMap[ws.color]   ?? "bg-red-600"
  const initials = ws.name
    .split(" ")
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
      <span className="text-[11px] font-semibold text-white">{initials}</span>
    </div>
  )
}

export default function WorkspaceCards({ workspaces }: Props) {
  const colorText = (color: string) => colorTextMap[color] ?? "text-red-400"

  return (
    <div className="flex flex-col bg-white dark:bg-[#131313] border border-gray-100 dark:border-[#1f1f1f] rounded-xl overflow-hidden shadow-sm dark:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-[#1a1a1a]">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-[#f0f0f0]">Workspaces</h3>
          <p className="text-[11px] text-gray-500 dark:text-[#444] mt-0.5">{workspaces.length} active</p>
        </div>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-[#444] hover:text-red-500 transition-colors"
        >
          <Plus size={12} />
          <span>New</span>
        </Link>
      </div>

      {/* Cards grid */}
      {workspaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 gap-2 text-gray-400 dark:text-[#333]">
          <Layers size={18} />
          <p className="text-[11px] text-gray-500 dark:text-[#444]">No workspaces yet</p>
        </div>
      ) : (
        <div className="p-3 grid grid-cols-2 gap-2">
          {workspaces.map((ws) => (
            <Link
              key={ws.id}
              href={`/dashboard/workspace/${ws.id}`}
              className="group flex flex-col gap-3 p-4 bg-gray-50 dark:bg-[#0e0e0e] border border-gray-100 dark:border-[#1a1a1a] rounded-xl hover:border-gray-200 dark:hover:border-[#2a2a2a] hover:bg-gray-100 dark:hover:bg-[#111] transition-all duration-200 cursor-pointer"
            >
              {/* Avatar + name row */}
              <div className="flex items-center gap-2.5">
                <WorkspaceAvatar ws={ws} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-gray-700 dark:text-[#bbb] group-hover:text-gray-900 dark:group-hover:text-[#f0f0f0] transition-colors truncate">
                    {ws.name}
                  </p>
                  <p className={`text-[10px] mt-0.5 font-medium ${colorText(ws.color)}`}>
                    {ws.color.charAt(0) + ws.color.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Stats + arrow */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-[#444]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-[#888] transition-colors">
                    <Layers size={10} />
                    {ws._count.Task}
                  </span>
                  <span className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-[#888] transition-colors">
                    <Users size={10} />
                    {ws._count.Subscribers}
                  </span>
                </div>
                <ArrowUpRight size={11} className="text-gray-400 dark:text-[#2a2a2a] group-hover:text-red-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
