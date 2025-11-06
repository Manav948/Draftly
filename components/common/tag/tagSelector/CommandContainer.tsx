import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import CommandTagItem from './CommandTagItem'
import NewTag from './NewTag'
import EditTag from './EditTag'
import { Tag } from '@prisma/client'

interface Props {
    tags?: Tag[]
    currentActiveThings: Tag[];
    onSelectAvtiveTag: (id: string) => void
}

const CommandContainer = ({ tags, currentActiveThings, onSelectAvtiveTag }: Props) => {
    const [tab, setTab] = useState<"list" | "editTag" | "newTag">("list")

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
                        <CommandGroup heading="TAGS">
                            {tags?.map((tag) => (
                                <CommandTagItem
                                    key={tag.id}
                                    tag={tag}
                                    currentActiveTags={currentActiveThings}
                                    onSelectActiveTag={onSelectAvtiveTag}
                                />
                            ))}
                        </CommandGroup>
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
            {tab === "editTag" && <EditTag />}
            {tab === "newTag" && <NewTag onSetTab={onSetTab} />}
        </Command>
    )
}

export default CommandContainer
