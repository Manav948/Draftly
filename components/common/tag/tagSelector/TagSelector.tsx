"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import React from "react";
import CommandContainer from "./CommandContainer";
import { Tag } from "@prisma/client";
import { LoadingState } from "@/components/ui/LoadingState";


interface Props {
  tags?: Tag[]
  currentActiveTags: Tag[];
  onSelectActiveTag: (id: string) => void
  workspaceId : string
}
const TagSelector = ({ tags, currentActiveTags, onSelectActiveTag , workspaceId }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 rounded-md transition-all hover:bg-accent"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New Tag</span>
          <span className="sm:hidden">Tag</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="start"
        className="rounded-lg shadow-lg p-1 animate-in fade-in-0 scale-in-95"
      >
        {tags ? (
          <CommandContainer
            tags={tags}
            currentActiveThings={currentActiveTags}
            onSelectActiveTag={onSelectActiveTag}
            workspaceId={workspaceId}
          />
        ) : (
          <div>
            <LoadingState />
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
