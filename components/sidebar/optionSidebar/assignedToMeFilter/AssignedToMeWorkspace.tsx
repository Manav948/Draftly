"use client"

import ActiveLink from "@/components/ui/active-link"
import { Workspace, WorkspaceIconColor } from "@prisma/client"
import Image from "next/image"
import React, { useMemo } from "react"
import { cn } from "@/lib/utils"

interface Props {
  workspaceFilterParam: string | null
  workspace: Workspace
  href: string
  currentType: string
}

const AssignedToMeWorkspace = ({
  workspace: { id, color, image, name },
  workspaceFilterParam,
  currentType,
}: Props) => {
  const workspaceColor = useMemo(() => {
    switch (color) {
      case WorkspaceIconColor.BLUE:
        return "bg-blue-600 hover:bg-blue-500"
      case WorkspaceIconColor.PINK:
        return "bg-pink-600 hover:bg-pink-500"
      case WorkspaceIconColor.YELLOW:
        return "bg-yellow-500 hover:bg-yellow-400 text-black"
      case WorkspaceIconColor.CYAN:
        return "bg-cyan-600 hover:bg-cyan-500"
      case WorkspaceIconColor.EMERALD:
        return "bg-emerald-600 hover:bg-emerald-500"
      case WorkspaceIconColor.FUCHSIA:
        return "bg-fuchsia-600 hover:bg-fuchsia-500"
      case WorkspaceIconColor.GREEN:
        return "bg-green-600 hover:bg-green-500"
      case WorkspaceIconColor.INDIGO:
        return "bg-indigo-600 hover:bg-indigo-500"
      case WorkspaceIconColor.LIME:
        return "bg-lime-500 hover:bg-lime-400 text-black"
      case WorkspaceIconColor.ORANGE:
        return "bg-orange-600 hover:bg-orange-500"
      case WorkspaceIconColor.PURPLE:
        return "bg-purple-600 hover:bg-purple-500"
      case WorkspaceIconColor.RED:
        return "bg-red-600 hover:bg-red-500"
      default:
        return "bg-blue-600 hover:bg-blue-500"
    }
  }, [color])

  return (
    <ActiveLink
      href={`/dashboard/assigned_to_me?workspace=${id}&type=${currentType}`}
      disableActiveStateColor
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
        "hover:bg-muted-foreground",
        "data-[active=true]:bg-muted data-[active=true]:font-medium"
      )}
    >

      {image ? (
        <Image
          priority
          src={image}
          alt="workspace-image"
          height={32}
          width={32}
          className="h-8 w-8 rounded-md object-cover"
        />
      ) : (
        <div
          className={cn(
            "h-8 w-8 rounded-md flex items-center justify-center font-semibold text-white",
            workspaceColor
          )}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      <span className="flex-1 truncate">{name}</span>
      <span
        className="h-2.5 w-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color ?? "#9ca3af" }}
      />
    </ActiveLink>
  )
}

export default AssignedToMeWorkspace
