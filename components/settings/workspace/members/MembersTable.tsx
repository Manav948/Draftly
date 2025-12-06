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
    <div className="w-full space-y-3">
      <div
        className={cn(
          "grid gap-2 border-b pb-2 text-sm font-medium",
          "grid-cols-1 sm:grid-cols-3"
        )}
      >
        <Button
          size="sm"
          variant="ghost"
          className="flex items-center gap-1 justify-start px-0"
          onClick={() => onSort(currentSort === "desc" ? "asc" : "desc")}
        >
          {t("USERNAME")}
          {currentSort === "desc" ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronUp size={16} />
          )}
        </Button>

        <p className="hidden sm:block text-muted-foreground">
          {t("PERMISSION_SMAll")}
        </p>

        <p className="hidden sm:block text-muted-foreground text-right">
          {t("PERMISSION_BIG")}
        </p>
      </div>

      <ul className="space-y-2 sm:space-y-1">
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
