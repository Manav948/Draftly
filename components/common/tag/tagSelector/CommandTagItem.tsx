"use client";

import { Button } from "@/components/ui/button";
import { CommandItem } from "@/components/ui/command";
import { Check, Pencil, Tag as TagIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { WorkspaceIconColor, Tag as TagType } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  tag: TagType;
  currentActiveTags: TagType[];
  onSelectActiveTag: (tag: TagType) => void;
  onEditTagInfo: (tag: TagType) => void;
  isDarkMode?: boolean;
}

const CommandTagItem = ({
  tag,
  currentActiveTags,
  onSelectActiveTag,
  onEditTagInfo,
  isDarkMode,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const isActive = useMemo(() => {
    return currentActiveTags.some((t) => t.id === tag.id);
  }, [currentActiveTags, tag.id]);

  const TagColor = useMemo(() => {
    const map: Record<WorkspaceIconColor, string> = {
      BLUE: "bg-blue-500 dark:bg-blue-400",
      RED: "bg-red-500 dark:bg-red-400",
      GREEN: "bg-green-500 dark:bg-green-400",
      YELLOW: "bg-amber-500 dark:bg-amber-400",
      CYAN: "bg-cyan-500 dark:bg-cyan-400",
      ORANGE: "bg-orange-500 dark:bg-orange-400",
      PURPLE: "bg-purple-500 dark:bg-purple-400",
      PINK: "bg-pink-500 dark:bg-pink-400",
      INDIGO: "bg-indigo-500 dark:bg-indigo-400",
      LIME: "bg-lime-500 dark:bg-lime-400",
      FUCHSIA: "bg-fuchsia-500 dark:bg-fuchsia-400",
      EMERALD: "bg-emerald-500 dark:bg-emerald-400",
    };
    return map[tag.color];
  }, [tag.color]);

  return (
    <CommandItem
      className="relative p-0 flex items-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onSelectActiveTag(tag)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 h-8 hover:bg-muted/65 text-left text-foreground bg-transparent border-none rounded-md"
      >
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full flex-shrink-0 shadow-sm/5", TagColor)} />
          <span className="text-[13px] font-medium text-foreground/80">{tag.name}</span>
        </div>
        {isActive && <Check size={13} className="text-muted-foreground/80 flex-shrink-0" />}
      </Button>

      {/* EDIT ICON */}
      {isHovered && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md hover:bg-muted text-muted-foreground/80"
          onClick={(e) => {
            e.stopPropagation();
            onEditTagInfo(tag);
          }}
        >
          <Pencil size={12} />
        </Button>
      )}
    </CommandItem>
  );
};

export default CommandTagItem;
