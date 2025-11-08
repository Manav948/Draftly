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
import { Tag, WorkspaceIconColor } from "@prisma/client";
import { LoadingState } from "@/components/ui/LoadingState";
import { useRouter } from "next/navigation";


interface Props {
  tags?: Tag[]
  currentActiveTags: Tag[];
  onSelectActiveTag: (id: string) => void
  workspaceId: string
  onUpdateActiveTags: (id: string, color: WorkspaceIconColor, name: string) => void
  isLoading: boolean
  onDeleteActiveTag: (tagId: string) => void
}
const TagSelector = ({ tags, currentActiveTags, onSelectActiveTag, workspaceId, onUpdateActiveTags, isLoading, onDeleteActiveTag }: Props) => {
  const router = useRouter()
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
        {isLoading && (
          <div className="p-3 justify-center items-center">
            <LoadingState />
          </div>
        )}
        {isLoading && tags ? (
          <CommandContainer
            tags={tags}
            currentActiveTags={currentActiveTags}
            onSelectActiveTag={onSelectActiveTag}
            workspaceId={workspaceId}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTag={onDeleteActiveTag}
          />
        ) : (
          <div className="p-3 text-sm flex justify-center items-center flex-col gap-4">
            <p>Something went wrong</p>
            <Button
              onClick={() => router.refresh()}
              className="w-full"
              size={"sm"}
              variant={"default"}
            >
              Refresh
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagSelector;
