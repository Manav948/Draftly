"use client";

import { useSaveTaskState } from "@/context/TaskSavingContext";
import { useTags } from "@/hooks/useTags";
import { Tag } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../ui/hover-card";
import TagSelector from "../common/tag/tagSelector/TagSelector";
import LinkTag from "../common/tag/LinkTag";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  mindMapId: string;
  workspaceId: string;
  isMounted: boolean;
  initialActiveTag: Tag[];
}

const MindMapTagSelector = ({
  mindMapId,
  workspaceId,
  isMounted,
  initialActiveTag,
}: Props) => {
  const { onSetStatus } = useSaveTaskState();

  const { mutate: updateMindMapActiveTag } = useMutation({
    mutationFn: async (tagId: string[]) => {
      await axios.post(`/api/mind_maps/update/tags`, {
        workspaceId,
        mindMapId,
        tagId,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
      toast.success("Tags updated");
    },
    onError: (err: AxiosError) => {
      onSetStatus("unsaved");
      console.error("MindMap Tag Update Error:", err);
      toast.error("Tags not updated");
    },
  });


  const debouncedCurrentActiveTags = useDebouncedCallback(() => {
    onSetStatus("pending");
    updateMindMapActiveTag(currentActiveTags.map((t) => t.id));
  }, 1200);

  const {
    currentActiveTags,
    onDeleteActiveTagHandler,
    onSelectActiveTagHandler,
    onUpdateActiveTagHandler,
    isLoadingTags,
    tags,
  } = useTags(
    workspaceId,
    isMounted,
    initialActiveTag,
    debouncedCurrentActiveTags
  );
  console.log("CurrentActiveTags : " , currentActiveTags)

  return (
    <div className="flex flex-row gap-3">
      {/* Tag selector bar */}
      <HoverCard openDelay={200} closeDelay={200}>
        <HoverCardTrigger asChild>
          <div className="w-fit">
            <TagSelector
              workspaceId={workspaceId}
              plusIconSize={20}
              className="h-9 px-2 rounded-md border border-border bg-background hover:bg-muted transition-colors"
              tags={tags}
              currentActiveTags={currentActiveTags}
              onSelectActiveTag={onSelectActiveTagHandler}
              onUpdateActiveTags={onUpdateActiveTagHandler}
              onDeleteActiveTag={onDeleteActiveTagHandler}
              isLoading={isLoadingTags}
            />
          </div>
        </HoverCardTrigger>

        <HoverCardContent
          side="top"
          align="start"
          className="text-xs px-3 py-1.5 text-muted-foreground"
        >
          Add or remove tags for this mind map
        </HoverCardContent>
      </HoverCard>

      {/* Active tags */}
      {currentActiveTags.length > 0 && (
        <ScrollArea className="w-full rounded-md cursor-pointer">
          <div className="flex gap-2 px-2 py-2">
            {currentActiveTags.map((tag) => (
              <LinkTag
                key={tag.id}
                tag={tag}
                disabled
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default MindMapTagSelector;
