"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Settings from "./Settings";
import ActiveWorkspaceInfo from "@/components/common/ActiveWorkspaceInfo";
import { Workspace } from "@prisma/client";
import WorkspaceOptions from "./workspaceOption/WorkspaceOptions";
import PomodoroLinks from "./pomodoro/PomodoroLinks";
import AssignedToMeFilter from "./assignedToMeFilter/AssignedToMeFilter";

interface Props {
  activeWorkspaces: number
  userAdminWorkspaces: Workspace[]
  userWorkspaces: Workspace[]
}

const OptionSidebar = ({ activeWorkspaces, userAdminWorkspaces, userWorkspaces }: Props) => {
  const pathname = usePathname();
  const isSettings = pathname.includes("/dashboard/settings");
  const urlWorkspaceId: string | undefined = pathname.split("/")[4]
  const urlTaskId: string | undefined = pathname.split("/")[6]
  const workspaceId = urlWorkspaceId ? urlWorkspaceId : "";
  const url = pathname.includes(`/dashboard/workspace/${workspaceId}`)
  const isTasksPage = pathname === `/dashboard/workspace/${workspaceId}/tasks`;
  const isPomodoro = pathname.includes(`/dashboard/pomodoro`)
  const PomodoroSettings = pathname === `/dashboard/pomodoro/settings`
  const isAssignedToMe = pathname.includes(`/dashboard/assigned_to_me`)

  if (pathname === "/dashboard" || (
    urlTaskId && pathname === `/dashboard/workspace/${workspaceId}/tasks/task/${urlTaskId}/edit`) ||
    urlTaskId && pathname === `/dashboard/workspace/${workspaceId}/mind_maps/mind_map/${urlTaskId}/edit`
  ) {
    return null
  }

  return (
    <div
      className={`
        h-screen transition-all duration-300 ease-in-out
        dark:bg-[#0e0707] dark:text-white border-l border-gray-300 dark:border-gray-800
        ${isSettings || url||  isPomodoro || isAssignedToMe ? "w-52 p-4 opacity-100" : "w-0 opacity-0 p-0 overflow-hidden"} flex flex-col justify-between
      `}
    >
      {isAssignedToMe && <AssignedToMeFilter userWorkspaces={userWorkspaces} />}
      {isPomodoro && !PomodoroSettings && <PomodoroLinks />}

      {isSettings && !isTasksPage && (
        <Settings userAdminWorkspaces={userAdminWorkspaces} />
      )}
      {url && !isTasksPage && (
        <WorkspaceOptions workspaceId={workspaceId} />
      )}
      {isTasksPage && <p>Tasks</p>}
      <ActiveWorkspaceInfo activeNumber={activeWorkspaces} />

    </div>
  );
};

export default OptionSidebar;
