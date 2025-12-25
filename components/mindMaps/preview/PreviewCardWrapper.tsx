"use client"

import LinkTag from "@/components/common/tag/LinkTag"
import ReadOnlyEmoji from "@/components/tasks/readOnly/ReadOnlyEmoji"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ExtendedMindMap } from "@/types/extended"
import { UserPermission } from "@prisma/client"
import { Info, Star } from "lucide-react"
import React, { useMemo, useState } from "react"
import PreviewCard from "./PreviewCard"
import UserHoverInfo from "@/components/common/UserHoverInfo"
import { Separator } from "@/components/ui/separator"
import { useFormatter } from "next-intl"
import AssignedToMindMapSelector from "../assignTo/AssignToMindMapSelector"

interface Props {
  mindMap: ExtendedMindMap
  children: React.ReactNode
  isSavedByUser: boolean
  userRole: UserPermission | null
}

const PreviewCardWrapper = ({
  mindMap,
  userRole,
  isSavedByUser,
  children,
}: Props) => {
  console.log("mindmap", mindMap)
  const [isSaved, setIsSaved] = useState(isSavedByUser)
  const format = useFormatter()
  // @ts-ignore
  const dateTime = new Date(mindMap.createdAt)
  const now = new Date()

  const onSetIsSaved = () => setIsSaved((p) => !p)



  return (
    <div className="flex justify-center mt-8">
      <Card className="w-[96%] max-w-[1600px] rounded-2xl border border-border/60 shadow-sm dark:bg-[#0e0707]">
        <CardContent className="p-5 border-b border-border/40">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4 min-w-0">
              <ReadOnlyEmoji selectedEmoji={mindMap.emoji} />

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-semibold truncate">
                    {mindMap.title || "Untitled Mind Map"}
                  </h1>
                  {isSaved && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground">
                        <Info className="h-4 w-4" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="text-sm">
                      Mind map metadata
                    </HoverCardContent>
                  </HoverCard>
                  <AssignedToMindMapSelector workspaceId={mindMap.workspaceId} mindMapId={mindMap.id} />
                  {mindMap.tags?.map((tag) => (
                    <LinkTag key={tag.id} tag={tag} disabled />
                  ))}
                </div>
              </div>
            </div>

            <PreviewCard
              isSaved={isSaved}
              mindMapId={mindMap.id}
              workspaceId={mindMap.workspaceId}
              userRole={userRole}
              onSetIsSaved={onSetIsSaved}
            />
          </div>
        </CardContent>

        <CardContent className="p-0">
          <div className="w-full min-h-[70vh]">
            {children}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 text-xs text-muted-foreground border-t border-border/40">
          <div className="flex items-center gap-2">
            <span>Created by</span>
            <UserHoverInfo user={mindMap.creator} />
          </div>

          <Separator orientation="vertical" className="hidden sm:block h-4" />

          <div className="flex items-center gap-2">
            <span>Updated by</span>
            <UserHoverInfo user={mindMap.updatedBy ?? mindMap.creator} />
            <p>{format.relativeTime(dateTime, now)}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PreviewCardWrapper
