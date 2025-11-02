"use client"

import { Button } from '@/components/ui/button'
import { SettingsWorkspace } from '@/types/extended'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import MembersRow from './row/MembersRow'
import { cn } from '@/lib/utils'

interface Props {
    workspace: SettingsWorkspace,
    workspaceId: string
}

const MembersTable = ({ workspace, workspaceId }: Props) => {
    const [currentSort, setCurrentSort] = useState<"asc" | "desc">("desc")
    const t = useTranslations("EDIT_WORKSPACE.MEMBERS.TABLE")
    const [workspaceSubscriber, setWorkspaceSubscriber] = useState(
        workspace?.Subscribers ?? []
    )

    const onSort = (order: "asc" | "desc") => {
        const sortedSubscriber = [...workspaceSubscriber]
        sortedSubscriber.sort((a, b) => {
            const usernameA = a.user.username.toLowerCase()
            const usernameB = b.user.username.toLowerCase()

            return order === "asc"
                ? usernameA.localeCompare(usernameB)
                : usernameB.localeCompare(usernameA)
        })

        setCurrentSort(order);
        setWorkspaceSubscriber(sortedSubscriber)
    }

    return (
        <div className="w-full space-y-3">
            {/* Header Row */}
            <div
                className={cn(
                    "grid grid-cols-3 w-full items-center border-b pb-2 text-sm font-medium",
                    "text-gray-700 dark:text-gray-300"
                )}
            >
                <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1 justify-start px-0 text-gray-900 dark:text-white"
                    onClick={() => onSort(currentSort === "desc" ? "asc" : "desc")}
                >
                    {t("USERNAME")}
                    {currentSort === "desc" ? (
                        <ChevronDown size={16} />
                    ) : (
                        <ChevronUp size={16} />
                    )}
                </Button>

                <p className="text-gray-600 dark:text-gray-400">{t("PERMISSION_SMAll")}</p>
                <p className="text-gray-600 dark:text-gray-400">{t("PERMISSION_BIG")}</p>
            </div>

            {/* Members List */}
            <ul className="space-y-1">
                {workspaceSubscriber.map((subscriber) => (
                    <MembersRow
                        key={subscriber.user.id}
                        user={subscriber.user}
                        userRole={subscriber.userRole}
                        workspaceId={workspaceId}
                        onSetWorkspaceSubscriber={setWorkspaceSubscriber}
                    />
                ))}
            </ul>
        </div>
    )
}

export default MembersTable
