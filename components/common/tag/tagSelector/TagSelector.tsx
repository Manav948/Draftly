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
  onSelectActiveTag: (id: string) => void;
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

  const [localTags, setLocalTags] = useState<Tag[]>(tags);
  useEffect(() => {
    if (tags.length !== localTags.length) {
      setLocalTags(tags);
    }
  }, [tags]);

  const handleCreateLocalTag = (tag: Tag) => {
    setLocalTags(prev => {
      const exists = prev.some(t => t.id === tag.id);
      if (exists) return prev;
      return [...prev, tag];
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(`flex items-center gap-2 rounded-md transition-all hover:bg-accent`, className)}
        >
          <Plus size={plusIconSize} />
          <span className="hidden sm:inline">New Tag</span>
          <span className="sm:hidden">Tag</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        className="rounded-lg shadow-lg p-1 animate-in fade-in-0 scale-in-95"
      >
        {isLoading ? (
          <div className="p-3 justify-center items-center">
            <LoadingState />
          </div>
        ) : (
          <CommandContainer
            tags={localTags}
            currentActiveTags={currentActiveTags}
            onSelectActiveTag={onSelectActiveTag}
            workspaceId={workspaceId}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTag={onDeleteActiveTag}
            onCreateLocalTag={handleCreateLocalTag}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
