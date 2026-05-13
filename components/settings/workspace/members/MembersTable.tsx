"use client";

import { Button } from "@/components/ui/button";
import { SettingsWorkspace } from "@/types/extended";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import MembersRow from "./row/MembersRow";
import { cn } from "@/lib/utils";

interface Props {
  workspace: SettingsWorkspace;
  workspaceId: string;
}

const MembersTable = ({ workspace, workspaceId }: Props) => {
  const [currentSort, setCurrentSort] = useState<"asc" | "desc">("desc");
  const t = useTranslations("EDIT_WORKSPACE.MEMBERS.TABLE");

  const [workspaceSubscriber, setWorkspaceSubscriber] = useState(
    workspace?.Subscribers ?? []
  );

  const onSort = (order: "asc" | "desc") => {
    const sortedSubscriber = [...workspaceSubscriber].sort((a, b) => {
      const usernameA = a.user.username.toLowerCase();
      const usernameB = b.user.username.toLowerCase();

      return order === "asc"
        ? usernameA.localeCompare(usernameB)
        : usernameB.localeCompare(usernameA);
    });

    setWorkspaceSubscriber(sortedSubscriber);
    setCurrentSort(order);
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "grid gap-4 border-b border-gray-100 dark:border-[#1f1f1f] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-[#666] bg-gray-50/30 dark:bg-[#0f0f0f]/50",
          "grid-cols-1 sm:grid-cols-12 items-center"
        )}
      >
        <div className="sm:col-span-5 flex items-center">
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-1.5 justify-start px-0 hover:bg-transparent hover:text-gray-900 dark:hover:text-gray-200 text-xs font-semibold uppercase tracking-wider h-auto"
            onClick={() => onSort(currentSort === "desc" ? "asc" : "desc")}
          >
            {t("USERNAME")}
            {currentSort === "desc" ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronUp size={14} />
            )}
          </Button>
        </div>

        <div className="hidden sm:block sm:col-span-4 text-left">
          {t("PERMISSION_SMAll")}
        </div>

        <div className="hidden sm:block sm:col-span-3 text-right pr-2">
          {t("PERMISSION_BIG")}
        </div>
      </div>

      <ul className="flex flex-col divide-y divide-gray-100 dark:divide-[#1a1a1a]">
        {workspaceSubscriber.map((subscriber) => (
          <MembersRow
            key={subscriber.user.id}
            user={subscriber.user}
            userRole={subscriber.userRole}
            workspaceId={workspaceId}
            onSetWorkspaceSubscriber={setWorkspaceSubscriber}
          />
        ))}
      </ul>
    </div>
  );
};

export default MembersTable;
