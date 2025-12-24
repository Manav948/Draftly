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
          relative overflow-hidden
          transition-all duration-200
          hover:-translate-y-[1px] hover:shadow-lg
          dark:bg-gradient-to-b
          dark:from-gray-900 dark:via-gray-900 dark:to-black/30
        "
      >
        <CardContent className="flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-4 min-w-0">
            <ReadOnlyEmoji
              selectedEmoji={emoji ?? undefined}
              className="h-10 w-10 shrink-0"
            />

            <div className="min-w-0">
              <h3 className="font-semibold text-xl truncate">{title}</h3>

              <div className="mt-0.5 flex flex-wrap items-center gap-1  text-muted-foreground font-medium">
                <span className="capitalize">{type}</span>
                <span>•</span>
                <span>
                  {format.relativeTime(new Date(updated.at), new Date())}
                </span>

                {updated.by && (
                  <>
                    <span>•</span>
                    <UserHoverInfo user={updated.by} />
                  </>
                )}

                <span className="truncate">• {workspaceName}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleUnstar}
                className="cursor-pointer text-destructive"
              >
                <StarOff className="mr-2 h-4 w-4" />
                Unstar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>

        <div
          className="
            pointer-events-none absolute inset-0 opacity-0
            group-hover:opacity-100 transition
            dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_60%)]
          "
        />
      </Card>
    </Link>
  )
}

export default StarredItem
