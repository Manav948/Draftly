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
          transition-all duration-200
          bg-white dark:bg-[#111]
          text-gray-900 dark:text-[#f0f0f0]
          border border-gray-200/80 dark:border-[#1f1f1f] 
          shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-[#2a2a2a]
          rounded-2xl flex flex-col group
        "
      >
        <CardContent className="flex flex-col p-6 h-full">
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
            <div className="p-2.5 w-10 h-10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <ReadOnlyEmoji
                selectedEmoji={emoji ?? undefined}
                className="h-10 w-10"
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
