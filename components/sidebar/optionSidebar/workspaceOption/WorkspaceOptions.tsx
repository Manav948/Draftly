"use client";

import ActiveLink from "@/components/ui/active-link";
import {
  Brain,
  CalendarRange,
  Files,
  Map,
  MapIcon,
  PencilRuler,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import NewTask from "./action/NewTask";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceShortCuts } from "@/types/extended";
import WorkspaceOption from "./WorkspaceOption";
import NewMindMap from "./action/NewMindMap";

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
      const res = await fetch(
        `/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`
      );

      if (!res.ok) return null;

      return (await res.json()) as WorkspaceShortCuts;
    },
    queryKey: ["getWorkspaceShortcuts", workspaceId],
  });

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 dark:text-gray-400 px-2">
        {t("SHORTCUTS")}
      </p>

      {/* Tasks & Mindmaps Native List */}
      <div className="flex flex-col">
        {isLoading ? (
          <p className="px-4 py-3 text-sm text-gray-500">Loading tasks...</p>
        ) : (
          <WorkspaceOption
            workspaceId={workspaceId}
            href={`tasks/task`}
            fields={workspaceShortcuts?.tasks || []}
            defaultName="Untitled Task"
          >
            Tasks
          </WorkspaceOption>
        )}

        {isLoading ? (
          <p className="px-4 py-3 text-sm text-gray-500">Loading MindMaps...</p>
        ) : (
           <WorkspaceOption
            workspaceId={workspaceId}
            href={`mind_maps/mind_map`}
            fields={workspaceShortcuts?.mindMaps || []}
            defaultName="Untitled MindMap"
          >
            Mind Maps
          </WorkspaceOption>
        )}
      </div>
    </div>
  );
};

export default WorkspaceOptions;
