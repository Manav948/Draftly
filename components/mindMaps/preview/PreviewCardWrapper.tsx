"use client"

import LinkTag from "@/components/common/tag/LinkTag"
import ReadOnlyEmoji from "@/components/tasks/readOnly/ReadOnlyEmoji"
import { Card, CardContent } from "@/components/ui/card"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ExtendedMindMap } from "@/types/extended"
import { UserPermission } from "@prisma/client"
import { Info, Star } from "lucide-react"
import React, { useState } from "react"
import PreviewCard from "./PreviewCard"

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
    const [isSaved, setIsSaved] = useState(isSavedByUser)

    const onSetIsSaved = () => {
        setIsSaved((prev) => !prev)
    }

    return (
        <div className="flex items-center justify-center mt-10">
            <Card className="dark:bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 w-[94%] rounded-4xl border border-border/60 shadow-sm ">
                <CardContent className="sm:p-6 space-y-6">

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 min-w-0">
                            <ReadOnlyEmoji selectedEmoji={mindMap.emoji} />

                            <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                                        {mindMap.title || "Untitled Mind Map"}
                                    </h2>

                                    {isSaved && (
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 shrink-0" />
                                    )}
                                </div>

                                {/* Info + Tags */}
                                <div className="mt-2 flex flex-wrap items-center gap-3">
                                    <HoverCard openDelay={250} closeDelay={250}>
                                        <HoverCardTrigger asChild>
                                            <button className="text-muted-foreground hover:text-foreground transition">
                                                <Info className="h-4 w-4" />
                                            </button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="text-sm max-w-xs">
                                            Mind map details & metadata
                                        </HoverCardContent>
                                    </HoverCard>

                                    <div className="flex flex-wrap gap-2">
                                        {mindMap.tags?.map((tag) => (
                                            <LinkTag key={tag.id} tag={tag} disabled />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="shrink-0">
                            <PreviewCard
                                isSaved={isSaved}
                                mindMapId={mindMap.id}
                                workspaceId={mindMap.workspaceId}
                                userRole={userRole}
                                onSetIsSaved={onSetIsSaved}
                            />
                        </div>
                    </div>

                    <div className="w-full">
                        {children}
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default PreviewCardWrapper
