"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import CommandTagItem from "./CommandTagItem";
import NewTag from "./NewTag";
import { Tag, WorkspaceIconColor } from "@prisma/client";

interface Props {
  tags?: Tag[];
  currentActiveTags: Tag[];
  onSelectActiveTag: (tag : Tag) => void;
  workspaceId: string;
  onUpdateActiveTags?: (
    id: string,
    color: WorkspaceIconColor,
    name: string
  ) => void;
  onDeleteActiveTag?: (tagId: string) => void;
}

const CommandContainer = ({
  tags = [],
  currentActiveTags,
  onSelectActiveTag,
  workspaceId,
  onUpdateActiveTags,
  onDeleteActiveTag,
}: Props) => {
  const [tab, setTab] = useState<"list" | "editTag" | "newTag">("list");
  const [editedTag, setEditedTag] = useState<Tag | null>(null);

  return (
    <Command>
      {tab === "list" && (
        <>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>

            <CommandGroup heading="TAGS">
              {tags.map((tag) => (
                <CommandTagItem
                  key={tag.id}
                  tag={tag}
                  currentActiveTags={currentActiveTags}
                  onSelectActiveTag={onSelectActiveTag}
                  onEditTagInfo={(tag) => {
                    setEditedTag(tag);
                    setTab("editTag");
                  }}
                />
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="NEW">
              <CommandItem>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTab("newTag")}
                >
                  <Plus size={16} />
                  Add Tag
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </>
      )}

      {tab === "editTag" && editedTag && (
        <NewTag
          edit
          workspaceId={workspaceId}
          id={editedTag.id}
          tagName={editedTag.name}
          color={editedTag.color}
          currentActiveTags={currentActiveTags}
          onSetTab={setTab}
          onUpdateActiveTags={onUpdateActiveTags}
          onDeleteActiveTag={onDeleteActiveTag}
          onSelectActiveTag={onSelectActiveTag}
        />
      )}

      {tab === "newTag" && (
        <NewTag
          workspaceId={workspaceId}
          onSetTab={setTab}
        />
      )}
    </Command>
  );
};

export default CommandContainer;
