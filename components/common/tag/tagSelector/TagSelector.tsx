"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CommandContainer from "./CommandContainer";
import { Tag, WorkspaceIconColor } from "@prisma/client";
import { LoadingState } from "@/components/ui/LoadingState";
import { cn } from "@/lib/utils";

interface Props {
  tags?: Tag[];
  currentActiveTags: Tag[];
  onSelectActiveTag: (tag:Tag) => void;
  workspaceId: string;
  onUpdateActiveTags?: (id: string, colors: WorkspaceIconColor, name: string) => void;
  isLoading?: boolean;
  onDeleteActiveTag?: (tagId: string) => void;
  className?: string
  plusIconSize?: number
}

const TagSelector = ({
  tags = [],
  currentActiveTags,
  onSelectActiveTag,
  workspaceId,
  onUpdateActiveTags,
  isLoading = false,
  onDeleteActiveTag,
  className,
  plusIconSize = 16
}: Props) => {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 h-8 text-[13px] font-medium text-foreground/80 hover:text-foreground bg-secondary/30 hover:bg-secondary/70 border border-border/40 hover:border-border/80 rounded-md transition-all shadow-xs/5 cursor-pointer focus:outline-none",
            className
          )}
        >
          <Plus size={13} className="text-muted-foreground flex-shrink-0" />
          <span>Add tag</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        className="rounded-xl border border-border/60 shadow-xl p-1 bg-popover text-popover-foreground overflow-hidden"
      >
        {isLoading ? (
          <div className="p-3 justify-center items-center">
            <LoadingState />
          </div>
        ) : (
          <CommandContainer
            tags={tags} 
            currentActiveTags={currentActiveTags}
            onSelectActiveTag={onSelectActiveTag}
            workspaceId={workspaceId}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTag={onDeleteActiveTag}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
