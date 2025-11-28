"use client";

import ActiveLink from "@/components/ui/active-link";
import { Brain, CalendarRange, Files, Map, PencilRuler } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import NewTask from "./action/NewTask";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { WorkspaceShortCuts } from "@/types/extended";
import WorkspaceOption from "./WorkspaceOption";

interface Props {
  workspaceId: string;
}

const WorkspaceOptions = ({ workspaceId }: Props) => {
  const t = useTranslations("WORKSPACE_OPTIONS");

  const workspaceOptionFields = useMemo(
    () => [
      {
        href: `/dashboard/workspace/${workspaceId}/tasks`,
        icon: <PencilRuler size={18} />,
        title: t("TASKS"),
      },
      {
        href: `/dashboard/workspace/${workspaceId}/mind-maps`,
        icon: <Map size={18} />,
        title: t("MIND_MAPS"),
      },
      {
        href: `/dashboard/workspace/${workspaceId}/schedules`,
        icon: <CalendarRange size={18} />,
        title: t("SCHEDULES"),
      },
      {
        href: `/dashboard/workspace/${workspaceId}/study`,
        icon: <Brain size={18} />,
        title: t("STUDY"),
      },
      {
        href: `/dashboard/workspace/${workspaceId}/files`,
        icon: <Files size={18} />,
        title: t("FILES"),
      },
    ],
    [workspaceId, t]
  );

  const { data: workspaceShortcuts, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`)
      if (!res.ok) {
        return null;
      }
      const data = await res.json()
      return data as WorkspaceShortCuts
    },
    queryKey: ["getWorkspaceShortcuts"]
  })

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
        {t("SHORTCUTS")}
      </p>

      {/* Links */}
      <div className="flex flex-col w-full mt-2 bg-red-500">
        <div className="">
          <WorkspaceOption
            workspaceId={workspaceId}
            href={`tasks/task`}
            fields={workspaceShortcuts?.tasks ?? []}
            defaultName="test"
          >
            <PencilRuler size={18}  />  
            Tasks
          </WorkspaceOption>
        </div>
      </div>
      <div>
        <p>Actions</p>
        <NewTask workspaceId={workspaceId} />
      </div>
    </div>
  );
};

export default WorkspaceOptions;
