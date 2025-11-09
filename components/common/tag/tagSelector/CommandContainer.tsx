"use client";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CommandTagItem from "./CommandTagItem";
import NewTag from "./NewTag";
import { Tag, WorkspaceIconColor } from "@prisma/client";

interface Props {
    tags?: Tag[];
    currentActiveTags: Tag[];
    onSelectActiveTag: (id: string) => void;
    workspaceId: string;
    onUpdateActiveTags?: (id: string, color: WorkspaceIconColor, name: string) => void;
    onDeleteActiveTag?: (tagId: string) => void;
    onCreateLocalTag?: (tag: Tag) => void;
}

const CommandContainer = ({
    tags = [],
    currentActiveTags,
    onSelectActiveTag,
    workspaceId,
    onUpdateActiveTags,
    onDeleteActiveTag,
    onCreateLocalTag,
}: Props) => {
    const [tab, setTab] = useState<"list" | "editTag" | "newTag">("list");
    const [allTags, setAllTags] = useState<Tag[]>(tags);
    const [editedTagInfo, setEditedTagInfo] = useState<Tag | null>(null);

    useEffect(() => {
        setAllTags(tags ?? []);
    }, [tags]);

    const handleNewTag = (tag: Tag) => {
        setAllTags((prev) => {
            const exists = prev.find((t) => t.id === tag.id);
            if (exists) return prev;
            return [...prev, tag];
        });
        setTab("list");
    };

    const handleUpdateTag = (updated: Tag) => {
        setAllTags((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
        setTab("list");
    };

    const handleEditClick = (tag: Tag) => {
        setEditedTagInfo(tag);
        setTab("editTag");
    };

    return (
        <Command>
            {tab === "list" && (
                <>
                    <CommandInput className="" placeholder="Filter" />
                    <CommandList>
                        <CommandEmpty>No Result Found.</CommandEmpty>

                        <CommandGroup heading="TAGS">
                            {allTags.map((tag) => (
                                <CommandTagItem
                                    key={tag.id}
                                    tag={tag}
                                    currentActiveTags={currentActiveTags ?? []}
                                    onSelectActiveTag={onSelectActiveTag}
                                    onEditTagInfo={handleEditClick}
                                />
                            ))}
                        </CommandGroup>

                        <CommandSeparator />

                        <CommandGroup heading="NEW">
                            <CommandItem onSelect={(e) => {}}>
                                <Button
                                    size="sm"
                                    variant="ghost"
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

            {tab === "editTag" && editedTagInfo && (
                <NewTag
                    edit
                    workspaceId={workspaceId}
                    color={editedTagInfo.color}
                    id={editedTagInfo.id}
                    tagName={editedTagInfo.name}
                    onSetTab={setTab}
                    onUpdateActiveTags={(id, color, name) => {
                        onUpdateActiveTags?.(id, color, name);
                        handleUpdateTag({ ...editedTagInfo, color, name } as Tag);
                    }}
                    onDeleteActiveTag={onDeleteActiveTag}
                    currentActiveTags={currentActiveTags}
                    onSelectActiveTag={onSelectActiveTag}
                    onCreateTag={(tag) => {
                        handleUpdateTag(tag);
                        onCreateLocalTag?.(tag);
                    }}
                />
            )}

            {tab === "newTag" && (
                <NewTag
                    onSetTab={setTab}
                    workspaceId={workspaceId}
                    onCreateTag={(tag) => handleNewTag(tag)}
                />
            )}
        </Command>
    );
};

export default CommandContainer;
