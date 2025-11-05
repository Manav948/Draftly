import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { Tag } from 'lucide-react'
import React from 'react'

const CommandTagItem = () => {
    return (
        <CommandItem>
            <Button
                size={"sm"}
                variant={"ghost"}
                className=''
            >
                <p>
                    <Tag size={16} />
                    <span>Critical</span>
                </p>
            </Button>
        </CommandItem>
    )
}

export default CommandTagItem
