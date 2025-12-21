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
    <Link href={link}>
      <Card className="bg-white dark:bg-gradient-to-b dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 transition">
        <CardContent className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <ReadOnlyEmoji
              selectedEmoji={emoji ?? undefined}
              className="h-10 w-10"
            />
            <div>
              <h3 className="font-medium">{title}</h3>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span>{type}</span>
                <span>•</span>
                <span>{format.relativeTime(new Date(updated.at), new Date())}</span>
                {updated.by && (
                  <>
                    <span>•</span>
                    <UserHoverInfo user={updated.by} />
                  </>
                )}
                <span>• {workspaceName}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleUnstar}
                className="text-destructive cursor-pointer"
              >
                <StarOff className="mr-2 h-4 w-4" />
                Unstar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </Link>
  )
}

export default StarredItem
