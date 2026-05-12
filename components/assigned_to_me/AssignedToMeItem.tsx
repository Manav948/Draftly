"use client"

import { AssignedToMeDataItems } from "@/types/extended"
import { Card, CardContent } from "../ui/card"
import ReadOnlyEmoji from "../tasks/readOnly/ReadOnlyEmoji"
import Link from "next/link"
import UserHoverInfo from "../common/UserHoverInfo"
import { useFormatter } from "next-intl"

interface Props {
  info: AssignedToMeDataItems
}

const AssignedToMeItem = ({ info }: Props) => {
  const { emoji, title, link, workspaceName, updated, type } = info
  const format = useFormatter()


  return (
    <Link href={link} className="group">
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
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 uppercase tracking-widest border border-gray-200 dark:border-[#333]">
              {type}
            </span>
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
                <span className="text-gray-400">Assigned By</span>
                <UserHoverInfo user={updated.by} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default AssignedToMeItem
