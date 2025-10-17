"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Settings from "./Settings";
import ActiveWorkspaceInfo from "@/components/common/ActiveWorkspaceInfo";
import { Workspace } from "@prisma/client";

interface Props {
  activeWorkspaces: number
  userAdminWorkspaces: Workspace[]
}

const OptionSidebar = ({ activeWorkspaces, userAdminWorkspaces }: Props) => {
  const pathname = usePathname();
  const isSettings = pathname.includes("/dashboard/settings");

  return (
    <div
      className={`
        h-screen transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-950 dark:text-white border-l border-gray-300 dark:border-gray-800
        ${isSettings ? "w-52 p-4 opacity-100" : "w-0 opacity-0 p-0 overflow-hidden"} flex flex-col justify-between
      `}
    >
      {isSettings && <Settings userAdminWorkspaces={userAdminWorkspaces} />}
      <ActiveWorkspaceInfo activeNumber={activeWorkspaces} />
    </div>
  );
};

export default OptionSidebar;
