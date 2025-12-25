"use client"
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ExtendedTask } from '@/types/extended'
import { UserPermission } from '@prisma/client'
import { useFormatter, useTranslations } from 'next-intl'
import React, { useState } from 'react'
import ReadOnlyEmoji from './ReadOnlyEmoji'
import { Star } from 'lucide-react'
import TaskOptions from './TaskOptions'
import ReadOnlyCalender from './ReadOnlyCalender'
import LinkTag from '@/components/common/tag/LinkTag'
import UserHoverInfo from '@/components/common/UserHoverInfo'
import { Separator } from '@/components/ui/separator'
import AssignedToTaskSelector from '../assignedTo/AssignedToTaskSelector'

interface Props {
  task: ExtendedTask
  isSavedByUser: boolean
  userRole: UserPermission | null
  workspaceId: string
}

const ReadOnlyContent = ({ task, isSavedByUser, userRole, workspaceId }: Props) => {
  const [isSaved, setIsSaved] = useState(isSavedByUser)
  const t = useTranslations("READ_ONLY")
  const [] = useState(task.updatedBy)
  const format = useFormatter()
  //@ts-ignore
  const dateTime = new Date(task.date?.to)
  const now = new Date()

  const onSetIsSaved = () => {
    setIsSaved(prev => !prev)
  }

  const from = task.date?.from
    ? new Date(task.date.from as string | Date)
    : undefined

  const to = task.date?.to
    ? new Date(task.date.to as string | Date)
    : undefined

  return (
    <div className='flex items-center justify-center mt-10'>
      <Card className="dark:bg-[#0e0707] dark:text-white rounded-4xl w-[90%]">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="flex items-start gap-4">
            <ReadOnlyEmoji selectedEmoji={task.emoji ?? "✌️"} />

            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">
                    {task.title?.trim() || t("NO_TITLE")}
                  </p>
                  {isSaved && (
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-500"
                    />
                  )}
                </div>

                <TaskOptions
                  onSetIsSaved={onSetIsSaved}
                  isSaved={isSaved}
                  taskId={task.id}
                  workspaceId={workspaceId}
                  userRole={userRole}
                />
              </div>

              {/* Date + tags */}
              <div className="flex flex-wrap items-center gap-3">
                <AssignedToTaskSelector workspaceId={workspaceId} taskId={task.id} />
                <ReadOnlyCalender from={from} to={to} />

                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map(tag => (
                      <LinkTag
                        key={tag.id}
                        tag={tag}
                        disabled={true}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 text-xs text-muted-foreground border-t border-border/40">
          <div className="flex items-center gap-2">
            <span>Created by</span>
            <UserHoverInfo user={task.creator} />
          </div>

          <Separator orientation="vertical" className="hidden sm:block h-4" />

          <div className="flex items-center gap-2">
            <span>Updated by</span>
            <UserHoverInfo user={task.updatedBy ?? task.creator} />
            <p>at {format.relativeTime(dateTime, now)} ago. </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ReadOnlyContent
