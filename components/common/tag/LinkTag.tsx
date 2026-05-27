import { cn } from '@/lib/utils'
import { Tag as TagIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useMemo } from 'react'
import { Tag as TagType, WorkspaceIconColor } from '@prisma/client'

interface Props {
    tag: TagType;
    disabled: boolean;
}

const LinkTag = ({ tag: { color, id, name, workspaceId }, disabled }: Props) => {

    const tagStyles = useMemo(() => {
        const colors: Record<WorkspaceIconColor, string> = {
            BLUE: "bg-blue-50/50 text-blue-600 border-blue-200/50 hover:bg-blue-50 hover:text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-400/20 dark:hover:bg-blue-500/15 dark:hover:text-blue-300",
            PINK: "bg-pink-50/50 text-pink-600 border-pink-200/50 hover:bg-pink-50 hover:text-pink-700 dark:bg-pink-500/10 dark:text-pink-400 dark:border-pink-400/20 dark:hover:bg-pink-500/15 dark:hover:text-pink-300",
            YELLOW: "bg-amber-50/50 text-amber-600 border-amber-200/50 hover:bg-amber-50 hover:text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-400/20 dark:hover:bg-amber-500/15 dark:hover:text-amber-300",
            CYAN: "bg-cyan-50/50 text-cyan-600 border-cyan-200/50 hover:bg-cyan-50 hover:text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400 dark:border-cyan-400/20 dark:hover:bg-cyan-500/15 dark:hover:text-cyan-300",
            EMERALD: "bg-emerald-50/50 text-emerald-600 border-emerald-200/50 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-400/20 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-300",
            FUCHSIA: "bg-fuchsia-50/50 text-fuchsia-600 border-fuchsia-200/50 hover:bg-fuchsia-50 hover:text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-400 dark:border-fuchsia-400/20 dark:hover:bg-fuchsia-500/15 dark:hover:text-fuchsia-300",
            GREEN: "bg-green-50/50 text-green-600 border-green-200/50 hover:bg-green-50 hover:text-green-700 dark:bg-green-500/10 dark:text-green-400 dark:border-green-400/20 dark:hover:bg-green-500/15 dark:hover:text-green-300",
            INDIGO: "bg-indigo-50/50 text-indigo-600 border-indigo-200/50 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-400/20 dark:hover:bg-indigo-500/15 dark:hover:text-indigo-300",
            LIME: "bg-lime-50/50 text-lime-600 border-lime-200/50 hover:bg-lime-50 hover:text-lime-700 dark:bg-lime-500/10 dark:text-lime-400 dark:border-lime-400/20 dark:hover:bg-lime-500/15 dark:hover:text-lime-300",
            ORANGE: "bg-orange-50/50 text-orange-600 border-orange-200/50 hover:bg-orange-50 hover:text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-400/20 dark:hover:bg-orange-500/15 dark:hover:text-orange-300",
            PURPLE: "bg-purple-50/50 text-purple-600 border-purple-200/50 hover:bg-purple-50 hover:text-purple-700 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-400/20 dark:hover:bg-purple-500/15 dark:hover:text-purple-300",
            RED: "bg-red-50/50 text-red-600 border-red-200/50 hover:bg-red-50 hover:text-red-700 dark:bg-red-500/10 dark:text-red-400 dark:border-red-400/20 dark:hover:bg-red-500/15 dark:hover:text-red-300",
        };

        return colors[color] ?? colors.BLUE;
    }, [color]);

    if (disabled) {
        return (
            <div
                className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-medium tracking-wide transition-all select-none pointer-events-none opacity-80 cursor-default shadow-sm/5",
                    tagStyles
                )}
            >
                <TagIcon size={12} className="opacity-70 flex-shrink-0" />
                <span>{name}</span>
            </div>
        )
    }

    return (
        <Link
            href={"/"}
            onClick={(e) => e.preventDefault()}
            className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border text-[11px] font-medium tracking-wide transition-all shadow-sm/5",
                tagStyles
            )}
        >
            <TagIcon size={12} className="opacity-70 flex-shrink-0" />
            <span>{name}</span>
        </Link>
    )
}

export default LinkTag
