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
}
const ReadOnlyContent = ({ task, isSavedByUser, userRole }: Props) => {
    const [isSaved, setIsSaved] = useState(isSavedByUser)
    const t = useTranslations("READ_ONLY")

    const onSetIsSaved = () => {
        setIsSaved((prev) => !prev)
    }
    return <Card>
        <CardContent>
            <ReadOnlyEmoji selectedEmoji={task.emoji} />
            <div>
                <div>
                    <div>
                        <p>{task.title ? task.title : t("NO_TITLE")} {isSaved && <Star size={16} />}</p>
                    </div>
                    <div>
                        <TaskOptions
                            onSetIsSaved={onSetIsSaved}
                            isSaved={isSaved}
                            taskId={task.id}
                            workspaceId={task.id}
                            userRole={userRole} />
                    </div>
                </div>
                <div>
                    <ReadOnlyCalender
                        from={task.date?.from ? new Date(task.date.from as string | Date) : undefined}
                        to={task.date?.to ? new Date(task.date.to as string | Date) : undefined}
                    />
                    {task.tags && task.tags.map((tag) => <LinkTag key={tag.id} tag={tag}  /> )}
                </div>
            </div>
        </CardContent>
    </Card>
}

export default ReadOnlyContent
