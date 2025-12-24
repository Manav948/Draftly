"use client"

import { CalendarItem } from "@/types/extended"
import { WorkspaceIconColor } from "@prisma/client"
import React, { useMemo } from "react"
import { cn } from "@/lib/utils"

interface Props {
    item: CalendarItem
    span: number
    top: number
    startCol: number
}

const CalendarTask = ({ item, span, top, startCol }: Props) => {
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
                return "bg-inigo-600 hover:bg-indigo-500"
            case WorkspaceIconColor.LIME:
                return "bg-lime-600 hover:bg-lime-500"
            case WorkspaceIconColor.YELLOW :
                return "bg-yellow-600 hover:bg-yellow-500"
            default:
                return "bg-secondary"
        }
    }, [item.workspaceColor])

    return (
        <div
            style={{
                gridColumn: `${startCol} / span ${span}`,
                top,
            }}
            className={`absolute left-1 right-1 ${bgColor} text-white text-md font-medium px-5 py-3 rounded-md truncate shadow-sm`}
        >
            {item.title}
        </div>
    )
}

export default CalendarTask
