"use client";

import React from "react";
import { Workspace } from "@prisma/client";
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
}

const WorkspaceComponent = ({ workspaces: { id, image, name } }: Props) => {
  return (
    <HoverCard openDelay={100} closeDelay={100}>
      <HoverCardTrigger asChild>
        <ActiveLink
          href={`/dashboard/workspace/${name}`}
          size="icon"
          variant="ghost"
          className="
            relative flex items-center justify-center
            w-9 h-9 rounded-xl overflow-hidden
            border border-gray-300 dark:border-gray-700
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-200
            shadow-sm hover:shadow-md hover:scale-105
          "
        >
          {image ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <Image
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
