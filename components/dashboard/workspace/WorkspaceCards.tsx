"use client"

import { DashboardSummary } from "@/types/extended"
import { Layers, Users, ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Addworkspace from "@/components/sidebar/sidebarShortcut/newWorkspace/Addworkspace"

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
        <Addworkspace
          activeWorkspace={workspaces.length}
          customTrigger={
            <button className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-[#444] hover:text-red-500 transition-colors">
              <Plus size={12} />
              <span>New</span>
            </button>
          }
        />
      </div>

      {/* Cards grid */}
      {workspaces.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 gap-2 text-gray-400 dark:text-[#333]">
          <Layers size={18} />
          <p className="text-[11px] text-gray-500 dark:text-[#444]">No workspaces yet</p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {workspaces.map((ws) => (
            <Link
              key={ws.id}
              href={`/dashboard/workspace/${ws.id}`}
              className="
                group flex flex-col gap-4 p-5 
                bg-white dark:bg-[#111]
                border border-gray-200/80 dark:border-[#1f1f1f] 
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-[#2a2a2a]
                transition-all duration-200 cursor-pointer
              "
            >
              {/* Avatar + name row */}
              <div className="flex items-center gap-3">
                <div className="group-hover:scale-105 transition-transform duration-200 ring-2 ring-gray-100 dark:ring-[#222] rounded-lg">
                  <WorkspaceAvatar ws={ws} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-900 dark:text-[#f0f0f0] group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors truncate">
                    {ws.name}
                  </p>
                  <p className={`text-[10px] mt-0.5 font-bold tracking-widest uppercase ${colorText(ws.color)}`}>
                    {ws.color} Workspace
                  </p>
                </div>
              </div>

              {/* Stats + arrow */}
              <div className="mt-2 pt-4 border-t border-gray-100 dark:border-[#1f1f1f] flex items-center justify-between text-xs text-muted-foreground font-medium">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors bg-gray-50 dark:bg-[#141414] px-2 py-1 rounded-md border border-gray-100 dark:border-[#222]">
                    <Layers size={12} className="text-gray-400" />
                    {ws._count.Task} Tasks
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-gray-200 transition-colors bg-gray-50 dark:bg-[#141414] px-2 py-1 rounded-md border border-gray-100 dark:border-[#222]">
                    <Users size={12} className="text-gray-400" />
                    {ws._count.Subscribers} Members
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-full p-1.5 border border-gray-100 dark:border-[#222] group-hover:bg-gray-100 dark:group-hover:bg-[#222] transition-colors">
                  <ArrowUpRight size={12} className="text-gray-400 dark:text-[#555] group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
