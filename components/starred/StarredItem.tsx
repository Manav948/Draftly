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
    <Link href={link} className="group block">
      <Card
        className="
          relative h-full overflow-hidden
          transition-all duration-300
          hover:bg-gray-50 dark:hover:bg-[#141414]
          bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-[#f0f0f0]
          border border-gray-200 dark:border-[#1f1f1f] shadow-sm hover:shadow-md
          rounded-xl flex flex-col group
        "
      >
        <CardContent className="flex flex-col p-5 h-full">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate max-w-[120px]">
              {workspaceName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 uppercase tracking-widest border border-gray-200 dark:border-[#333]">
                {type}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-gray-400 hover:text-gray-900 dark:hover:text-white"
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

          <div className="flex flex-col gap-3 flex-grow">
            <ReadOnlyEmoji
              selectedEmoji={emoji ?? undefined}
              className="h-12 w-12 shrink-0 mb-1"
            />
            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
              {title}
            </h3>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-[#1f1f1f] flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>
              {format.relativeTime(new Date(updated.at), new Date())}
            </span>

            {updated.by && (
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">Updated By</span>
                <UserHoverInfo user={updated.by} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StarredItem
