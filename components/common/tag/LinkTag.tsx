import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tag, Users2 } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { Tag as TagType, WorkspaceIconColor } from '@prisma/client'

interface Props {
    tag: TagType;
    isDarkMode?: boolean
    disabled: boolean
}

const LinkTag = ({ tag: { color, id, name, workspaceId }, isDarkMode, disabled }: Props) => {

    const TagColor = useMemo(() => {
        const colors: Record<WorkspaceIconColor, string> = {
            BLUE: isDarkMode
                ? "text-blue-900 border-blue-700 hover:text-blue-800 hover:border-blue-500"
                : "text-blue-600 border-blue-400 hover:text-blue-500 hover:border-blue-600",

            PINK: isDarkMode
                ? "text-pink-900 border-pink-700 hover:text-pink-800 hover:border-pink-500"
                : "text-pink-600 border-pink-400 hover:text-pink-500 hover:border-pink-600",

            YELLOW: isDarkMode
                ? "text-yellow-900 border-yellow-700 hover:text-yellow-800 hover:border-yellow-500"
                : "text-yellow-500 border-yellow-300 hover:text-yellow-400 hover:border-yellow-600",

            CYAN: isDarkMode
                ? "text-cyan-900 border-cyan-700 hover:text-cyan-800 hover:border-cyan-500"
                : "text-cyan-600 border-cyan-400 hover:text-cyan-500 hover:border-cyan-600",

            EMERALD: isDarkMode
                ? "text-emerald-900 border-emerald-700 hover:text-emerald-800 hover:border-emerald-500"
                : "text-emerald-600 border-emerald-400 hover:text-emerald-500 hover:border-emerald-600",

            FUCHSIA: isDarkMode
                ? "text-fuchsia-900 border-fuchsia-700 hover:text-fuchsia-800 hover:border-fuchsia-500"
                : "text-fuchsia-600 border-fuchsia-400 hover:text-fuchsia-500 hover:border-fuchsia-600",

            GREEN: isDarkMode
                ? "text-green-900 border-green-700 hover:text-green-800 hover:border-green-500"
                : "text-green-600 border-green-400 hover:text-green-500 hover:border-green-600",

            INDIGO: isDarkMode
                ? "text-indigo-900 border-indigo-700 hover:text-indigo-800 hover:border-indigo-500"
                : "text-indigo-600 border-indigo-400 hover:text-indigo-500 hover:border-indigo-600",

            LIME: isDarkMode
                ? "text-lime-900 border-lime-700 hover:text-lime-800 hover:border-lime-500"
                : "text-lime-500 border-lime-300 hover:text-lime-400 hover:border-lime-600",

            ORANGE: isDarkMode
                ? "text-orange-900 border-orange-700 hover:text-orange-800 hover:border-orange-500"
                : "text-orange-600 border-orange-400 hover:text-orange-500 hover:border-orange-600",
            PURPLE: isDarkMode
                ? "text-purple-900 border-purple-700 hover:text-purple-800 hover:border-purple-500"
                : "text-purple-600 border-purple-400 hover:text-purple-500 hover:border-purple-600",

            RED: isDarkMode
                ? "text-red-900 border-red-700 hover:text-red-800 hover:border-red-500"
                : "text-red-600 border-red-400 hover:text-red-500 hover:border-red-600",
        };

        return colors[color] ?? colors.BLUE;
    }, [color, isDarkMode]);
    return (
        <Link
            aria-disabled={disabled}
            href={"/"}
            className={cn(`${buttonVariants({
                variant: "outline",
                size: "sm"
            })} px-2.5 py-0.5 h-fit text-xs ${disabled ? "pointer-events-none" : ""}`
            )}
        >
            <Tag size={16} className={`${TagColor}`} />
            <span>{name}</span>
        </Link>
    )
}

export default LinkTag
