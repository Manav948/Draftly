"use client";

import ActiveLink from "@/components/ui/active-link";
import { Brain, CalendarRange, Files, Map, PencilRuler } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

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

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1">
        {t("SHORTCUTS")}
      </p>

      {/* Links */}
      <div className="flex flex-col w-full mt-2">
        {workspaceOptionFields.map((field, i) => (
          <ActiveLink
            size="sm"
            variant="ghost"
            key={i}
            href={field.href}
            className="
              flex justify-start gap-2 rounded-lg px-2 py-2 text-sm font-medium
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-700 dark:text-gray-300 transition-colors
              active:bg-gray-200 dark:active:bg-gray-700
            "
          >
            <span className="text-gray-600 dark:text-gray-300">{field.icon}</span>
            <span>{field.title}</span>
          </ActiveLink>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceOptions;
