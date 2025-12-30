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
      BLUE: isDarkMode ? "bg-blue-900" : "bg-blue-600",
      RED: isDarkMode ? "bg-red-900" : "bg-red-600",
      GREEN: isDarkMode ? "bg-green-900" : "bg-green-600",
      YELLOW: isDarkMode ? "bg-yellow-900" : "bg-yellow-500",
      CYAN: isDarkMode ? "bg-cyan-900" : "bg-cyan-600",
      ORANGE: isDarkMode ? "bg-orange-900" : "bg-orange-600",
      PURPLE: isDarkMode ? "bg-purple-900" : "bg-purple-600",
      PINK: isDarkMode ? "bg-pink-900" : "bg-pink-600",
      INDIGO: isDarkMode ? "bg-indigo-900" : "bg-indigo-600",
      LIME: isDarkMode ? "bg-lime-900" : "bg-lime-500",
      FUCHSIA: isDarkMode ? "bg-fuchsia-900" : "bg-fuchsia-600",
      EMERALD: isDarkMode ? "bg-emerald-900" : "bg-emerald-600",
    };
    return map[tag.color];
  }, [tag.color, isDarkMode]);

  return (
    <CommandItem
      className="relative px-2 py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TAG BUTTON */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onSelectActiveTag(tag)}
        className={cn(
          "flex w-full items-center justify-between pr-10",
          TagColor
        )}
      >
        <div className="flex items-center gap-2">
          <TagIcon size={14} />
          <span>{tag.name}</span>
        </div>
        {isActive && <Check size={14} />}
      </Button>

      {/* EDIT ICON */}
      {isHovered && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
            onEditTagInfo(tag);
          }}
        >
          <Pencil size={14} />
        </Button>
      )}
    </CommandItem>
  );
};

export default CommandTagItem;
