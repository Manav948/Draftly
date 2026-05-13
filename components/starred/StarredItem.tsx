"use client"

import { StarredItem as StarredItemType } from "@/types/saved"
import { useFormatter } from "next-intl"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import ReadOnlyEmoji from "../tasks/readOnly/ReadOnlyEmoji"
import { MoreHorizontal, StarOff } from "lucide-react"
import UserHoverInfo from "../common/UserHoverInfo"
import { Button } from "../ui/button"
import useUnStar from "@/hooks/useUnstar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Props {
  items: StarredItemType
  sortType: "asc" | "desc"
  userId: string
}

const StarredItem = ({ items, sortType, userId }: Props) => {
  const { link, title, emoji, type, updated, workspaceName, itemId } = items
  const unstar = useUnStar({ itemId, type, userId, sortType })
  const format = useFormatter()

  const handleUnstar = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    unstar.mutate()
  }

  return (
    <Link href={link} className="group block h-full">
      <Card
        className="
          relative h-full overflow-hidden
          transition-all duration-300
          hover:-translate-y-1
          bg-gradient-to-br from-white to-gray-50 dark:from-[#111] dark:to-[#0a0a0a]
          text-gray-900 dark:text-[#f0f0f0]
          border border-gray-200/60 dark:border-[#1f1f1f] 
          shadow-sm hover:shadow-xl hover:shadow-red-500/10
          rounded-2xl flex flex-col group
        "
      >
        {/* Top subtle gradient line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="flex flex-col p-6 h-full relative z-10">
          <div className="flex justify-between items-start mb-5">
            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest truncate max-w-[120px] bg-gray-100 dark:bg-[#1a1a1a] px-2.5 py-1 rounded-full">
              {workspaceName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 uppercase tracking-widest border border-red-100 dark:border-red-500/20">
                {type}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-[#1a1a1a] rounded-full border border-gray-100 dark:border-[#222]"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="dark:bg-[#111] dark:border-[#222]">
                  <DropdownMenuItem
                    onClick={handleUnstar}
                    className="cursor-pointer text-destructive focus:text-destructive dark:focus:bg-[#222]"
                  >
                    <StarOff className="mr-2 h-4 w-4" />
                    Unstar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-grow">
            <div className="bg-white dark:bg-[#1a1a1a] shadow-sm dark:shadow-none border border-gray-100 dark:border-[#2a2a2a] rounded-xl p-2.5 w-14 h-14 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <ReadOnlyEmoji
                selectedEmoji={emoji ?? undefined}
                className="h-8 w-8"
              />
            </div>
            <div>
               <h3 className="font-bold text-lg leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                 {title}
               </h3>
               <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                 Starred {type.toLowerCase()} located in the {workspaceName} workspace. Easily access it from here anytime.
               </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#1f1f1f] flex items-center justify-between text-[11px] text-muted-foreground font-medium">
            <span className="bg-gray-50 dark:bg-[#141414] px-2 py-1 rounded-md border border-gray-100 dark:border-[#222]">
              {format.relativeTime(new Date(updated.at), new Date())}
            </span>

            {updated.by && (
              <div className="flex items-center gap-2">
                <span className="text-gray-400">Updated By</span>
                <div className="rounded-full overflow-hidden">
                  <UserHoverInfo user={updated.by} />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StarredItem
