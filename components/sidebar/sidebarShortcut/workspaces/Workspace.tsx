"use client";

import React, { useMemo } from "react";
import { Workspace, WorkspaceIconColor } from "@prisma/client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ActiveLink from "@/components/ui/active-link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  workspaces: Workspace;
  href: string
}

const WorkspaceComponent = ({ workspaces: { id, image, name, color }, href }: Props) => {

  const workspaceColor = useMemo(() => {
    switch (color) {
      case WorkspaceIconColor.BLUE:
        return "bg-blue-600 hover:bg-blue-500"

      case WorkspaceIconColor.PINK:
        return "bg-pink-600 hover:bg-pink-500"

      case WorkspaceIconColor.YELLOW:
        return "bg-yellow-600 hover:bg-yellow-500"

      case WorkspaceIconColor.CYAN:
        return "bg-cyan-600 hover:bg-cyan-500"

      case WorkspaceIconColor.EMERALD:
        return "bg-emerald-600 hover:bg-emerald-500"

      case WorkspaceIconColor.FUCHSIA:
        return "bg-fuchsia-600 hover:bg-fuhsia-500"

      case WorkspaceIconColor.GREEN:
        return "bg-green-600 hover:bg-green-500"

      case WorkspaceIconColor.INDIGO:
        return "bg-indigo-600 hover:bg-indigo-500"

      case WorkspaceIconColor.LIME:
        return "bg-lime-600 hover:bg-lime-500"

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
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <ActiveLink
          workspaceIcon
          href={`${href}/${id}`}
          size="icon"
          variant="ghost"
          className={`
            relative flex items-center justify-center
            w-9 h-9 rounded-xl overflow-hidden
            shadow-sm hover:shadow-md hover:scale-105 ${!image && workspaceColor}
          `}
        >
          {image ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <Image
                priority
                src={image}
                alt="workspace"
                fill
                className="object-cover rounded-xl"
              />
            </motion.div>
          ) : (
            <span className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-200">
              {name[0]}
            </span>
          )}
        </ActiveLink>
      </HoverCardTrigger>

      <HoverCardContent
        align="center"
        side="right"
        className="
          text-sm font-medium text-gray-900 dark:text-gray-100
          bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
          px-3 py-1.5 rounded-lg shadow-md
        "
      >
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {name}
        </motion.span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default WorkspaceComponent;
