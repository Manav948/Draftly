import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import CommandTagItem from './CommandTagItem'
import NewTag from './NewTag'
import EditTag from './EditTag'
import { Tag, WorkspaceIconColor } from '@prisma/client'

interface Props {
    tags?: Tag[]
    currentActiveTags: Tag[];
    onSelectActiveTag: (id: string) => void
    workspaceId: string
    onUpdateActiveTags: (id: string, color: WorkspaceIconColor, name: string) => void
    onDeleteActiveTag: (tagId: string) => void
}

const CommandContainer = ({ tags, currentActiveTags, onSelectActiveTag, workspaceId, onUpdateActiveTags, onDeleteActiveTag }: Props) => {
    const [tab, setTab] = useState<"list" | "editTag" | "newTag">("list")
    const [editedTagInfo, setEditedTagInfo] = useState<Tag | null>(null);

    const editTagInfoHandler = (tag: Tag) => {
        setEditedTagInfo(tag);
        setTab("editTag");
    }

    const onSetTab = (tab: "list" | "newTag" | "editTag") => {
        setTab(tab)
    }
    return (
        <Command>
            {tab === "list" && (
                <>
                    <CommandInput className='' placeholder='Filter' />
                    <CommandList>
                        <CommandEmpty>No Result Found.</CommandEmpty>
                        {(tags?.length ?? 0) > 0 && (<>
                            <CommandGroup heading="TAGS">
                                {tags?.map((tag) => (
                                    <CommandTagItem
                                        key={tag.id}
                                        tag={tag}
                                        currentActiveTags={currentActiveTags}
                                        onSelectActiveTag={onSelectActiveTag}
                                        onEditTagInfo={editTagInfoHandler}
                                    />
                                ))}
                            </CommandGroup>
                        </>
                        )}
                        <CommandSeparator />
                        <CommandGroup heading="NEW">
                            <CommandItem>
                                <Button
                                    size={"sm"}
                                    variant={"ghost"}
                                    className=''
                                    onClick={() => {
                                        setTab("newTag")
                                    }}
                                >
                                    <Plus size={16} />
                                    Add Tag
                                </Button>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </>
            )}
            {tab === "editTag" && <NewTag
                edit
                workspaceId={workspaceId}
                color={editedTagInfo?.color}
                id={editedTagInfo?.id}
                tagName={editedTagInfo?.name}
                onSetTab={onSetTab}
                onUpdateActiveTags={onUpdateActiveTags}
                onDeleteActiveTag={onDeleteActiveTag}
                currentActiveTags={currentActiveTags}
                onSelectActiveTag={onSelectActiveTag} 
            />}
            {tab === "newTag" && <NewTag onSetTab={onSetTab} workspaceId={workspaceId} />}
        </Command>
    )
}

export default CommandContainer
