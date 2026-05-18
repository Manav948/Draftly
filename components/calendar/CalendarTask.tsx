"use client"

import { CalendarItem } from "@/types/extended"
import { WorkspaceIconColor } from "@prisma/client"
import React, { useMemo, CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface Props {
  item: CalendarItem
  style: CSSProperties
}

const CalendarTask = ({ item, style }: Props) => {
  const bgColor = useMemo(() => {
    switch (item.workspaceColor) {
      case WorkspaceIconColor.EMERALD:
        return "bg-emerald-600 hover:bg-emerald-500"
      case WorkspaceIconColor.BLUE:
        return "bg-blue-600 hover:bg-blue-500"
      case WorkspaceIconColor.PURPLE:
        return "bg-purple-600 hover:bg-purple-500"
      case WorkspaceIconColor.ORANGE:
        return "bg-orange-600 hover:bg-orange-500"
      case WorkspaceIconColor.PINK:
        return "bg-pink-600 hover:bg-pink-500"
      case WorkspaceIconColor.RED:
        return "bg-red-600 hover:bg-red-500"
      case WorkspaceIconColor.CYAN:
        return "bg-cyan-600 hover:bg-cyan-500"
      case WorkspaceIconColor.GREEN:
        return "bg-green-600 hover:bg-green-500"
      case WorkspaceIconColor.FUCHSIA:
        return "bg-fuchsia-600 hover:bg-fuchsia-500"
      case WorkspaceIconColor.INDIGO:
        return "bg-indigo-600 hover:bg-indigo-500"
      case WorkspaceIconColor.LIME:
        return "bg-lime-600 hover:bg-lime-500"
      case WorkspaceIconColor.YELLOW:
        return "bg-yellow-600 hover:bg-yellow-500"
      default:
        return "bg-secondary"
    }
  }, [item.workspaceColor])

  return (
    <div
      style={style}
      className={cn(
        bgColor,
        "text-white text-xs font-medium px-2.5 flex items-center",
        "rounded-md truncate shadow-sm cursor-pointer",
        "transition-colors z-10"
      )}
    >
      {item.title}
    </div>
  )
}

export default CalendarTask
