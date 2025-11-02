"use client"

import { UserAvatar } from '@/components/ui/user-avatar'
import { SubscriptionUser } from '@/types/extended'
import { UserPermission as UserPermissionType } from '@prisma/client'
import React from 'react'
import MoreOptions from './MoreOptions'
import { cn } from '@/lib/utils'

interface Props {
    userRole: UserPermissionType;
    user: {
        id: string,
        image?: string | null | undefined,
        username: string
    };
    workspaceId: string;
    onSetWorkspaceSubscriber: React.Dispatch<React.SetStateAction<SubscriptionUser[]>>
}

const roleColors = {
    OWNER: "bg-purple-500/15 text-purple-500 border-purple-500/20",
    ADMIN: "bg-blue-500/15 text-blue-500 border-blue-500/20",
    MEMBER: "bg-gray-500/15 text-gray-400 border-gray-500/20",
}

const MembersRow = ({ user, userRole, workspaceId, onSetWorkspaceSubscriber }: Props) => {
    return (
        <li
            className={cn(
                "grid grid-cols-3 items-center py-2 px-2 rounded-lg transition",
                "hover:bg-gray-700 dark:hover:bg-gradient-to-r dark:hover:from-gray-900/40 dark:hover:via-gray-950/40 dark:hover:to-black/40"
            )}
        >
            {/* Left: Avatar + Name */}
            <div className="flex items-center gap-3">
                <UserAvatar profileImage={user.image} size={32} />
                <p className="font-medium text-gray-800 dark:text-gray-200">
                    {user.username}
                </p>
            </div>

            {/* Middle: Role Badge */}
            <div className="flex justify-start">
                <span
                    className={cn(
                        "text-xs px-2 py-1 font-semibold rounded-md border",
                        "uppercase tracking-wide",
                    )}
                >
                    {userRole}
                </span>
            </div>

            {/* Right: Options */}
            <div className="flex justify-end">
                <MoreOptions
                    workspaceId={workspaceId}
                    userId={user.id}
                    userRole={userRole}
                    onSetWorkspaceSubscriber={onSetWorkspaceSubscriber}
                />
            </div>
        </li>
    )
}

export default MembersRow
