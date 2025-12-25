"use client"
import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import ReadOnlyEmoji from '../tasks/readOnly/ReadOnlyEmoji'
import { AssignedToMeDataItems } from '@/types/extended'
import UserHoverInfo from '../common/UserHoverInfo'
import { useFormatter } from 'next-intl'

interface Props {
    WorkspaceInfo: AssignedToMeDataItems
}
const WorkspaceItem = ({ WorkspaceInfo }: Props) => {
    const { title, emoji, link, type, updated, workspaceName } = WorkspaceInfo
    const format = useFormatter()

    return (
        <Link href={link} className="group">
            <Card
                className="
                 relative overflow-hidden
                 transition-all duration-200
                 hover:-translate-y-0.5 hover:shadow-lg
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

                            <div className="mt-0.5 flex flex-wrap items-center gap-1 text-sm text-muted-foreground font-medium">
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
                </CardContent>

                <div
                    className="
                   pointer-events-none absolute inset-0 opacity-0
                   group-hover:opacity-100
                   transition
                   dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]
                 "
                />
            </Card>
        </Link>
    )
}

export default WorkspaceItem
