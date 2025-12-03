"use client"
import { Card, CardContent } from '@/components/ui/card'
import { ExtendedTask } from '@/types/extended'
import { UserPermission } from '@prisma/client'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import ReadOnlyEmoji from './ReadOnlyEmoji'
import { Star } from 'lucide-react'
import TaskOptions from './TaskOptions'
import ReadOnlyCalender from './ReadOnlyCalender'
import LinkTag from '@/components/common/tag/LinkTag'

interface Props {
  task: ExtendedTask
  isSavedByUser: boolean
  userRole: UserPermission | null
  workspaceId: string
}

const ReadOnlyContent = ({ task, isSavedByUser, userRole, workspaceId }: Props) => {
  const [isSaved, setIsSaved] = useState(isSavedByUser)
  const t = useTranslations("READ_ONLY")

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
    <Card className="dark:bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-none">
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
    </Card>
  )
}

export default ReadOnlyContent
