import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { Check, Tag } from 'lucide-react'
import React, { useMemo } from 'react'
import { WorkspaceIconColor, Tag as TagType } from '@prisma/client'

interface Props {
    tag: TagType
    currentActiveTags: TagType[]
    onSelectActiveTag: (id: string) => void
    isDarkMode?: boolean;
}
const CommandTagItem = ({ tag: { color, id, workspaceId, name },
    currentActiveTags,
    onSelectActiveTag,
    isDarkMode
}
    : Props) => {

    const isActive = useMemo(() => {
        return (currentActiveTags.length > 0 &&
            currentActiveTags.find((activeTag) => activeTag.id === id))
    }, [currentActiveTags, id])

    const TagColor = useMemo(() => {
        const colors: Record<WorkspaceIconColor, string> = {
            BLUE: isDarkMode
                ? "bg-blue-900 border-blue-700 hover:bg-blue-800 hover:border-blue-500"
                : "bg-blue-600 border-blue-400 hover:bg-blue-500 hover:border-blue-600",

            PINK: isDarkMode
                ? "bg-pink-900 border-pink-700 hover:bg-pink-800 hover:border-pink-500"
                : "bg-pink-600 border-pink-400 hover:bg-pink-500 hover:border-pink-600",

            YELLOW: isDarkMode
                ? "bg-yellow-900 border-yellow-700 hover:bg-yellow-800 hover:border-yellow-500"
                : "bg-yellow-500 border-yellow-300 hover:bg-yellow-400 hover:border-yellow-600",

            CYAN: isDarkMode
                ? "bg-cyan-900 border-cyan-700 hover:bg-cyan-800 hover:border-cyan-500"
                : "bg-cyan-600 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-600",

            EMERALD: isDarkMode
                ? "bg-emerald-900 border-emerald-700 hover:bg-emerald-800 hover:border-emerald-500"
                : "bg-emerald-600 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-600",

            FUCHSIA: isDarkMode
                ? "bg-fuchsia-900 border-fuchsia-700 hover:bg-fuchsia-800 hover:border-fuchsia-500"
                : "bg-fuchsia-600 border-fuchsia-400 hover:bg-fuchsia-500 hover:border-fuchsia-600",

            GREEN: isDarkMode
                ? "bg-green-900 border-green-700 hover:bg-green-800 hover:border-green-500"
                : "bg-green-600 border-green-400 hover:bg-green-500 hover:border-green-600",

            INDIGO: isDarkMode
                ? "bg-indigo-900 border-indigo-700 hover:bg-indigo-800 hover:border-indigo-500"
                : "bg-indigo-600 border-indigo-400 hover:bg-indigo-500 hover:border-indigo-600",

            LIME: isDarkMode
                ? "bg-lime-900 border-lime-700 hover:bg-lime-800 hover:border-lime-500"
                : "bg-lime-500 border-lime-300 hover:bg-lime-400 hover:border-lime-600",

            ORANGE: isDarkMode
                ? "bg-orange-900 border-orange-700 hover:bg-orange-800 hover:border-orange-500"
                : "bg-orange-600 border-orange-400 hover:bg-orange-500 hover:border-orange-600",

            PURPLE: isDarkMode
                ? "bg-purple-900 border-purple-700 hover:bg-purple-800 hover:border-purple-500"
                : "bg-purple-600 border-purple-400 hover:bg-purple-500 hover:border-purple-600",

            RED: isDarkMode
                ? "bg-red-900 border-red-700 hover:bg-red-800 hover:border-red-500"
                : "bg-red-600 border-red-400 hover:bg-red-500 hover:border-red-600",
        };

        return colors[color] ?? colors.BLUE;
    }, [color, isDarkMode]);

    return (
        <CommandItem>
            <Button
                onClick={() => {
                    onSelectActiveTag(id)
                }}
                size={"sm"}
                variant={"ghost"}
                className={`${TagColor}`}
            >
                <p>
                    <Tag size={16} />
                    <span>{name}</span>
                </p>
                {isActive && <Check size={16} />}
            </Button>
        </CommandItem>
    )
}

export default CommandTagItem
