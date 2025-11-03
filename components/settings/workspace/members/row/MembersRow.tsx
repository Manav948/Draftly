"use client"

import { UserAvatar } from '@/components/ui/user-avatar'
import { SubscriptionUser } from '@/types/extended'
import { UserPermission as UserPermissionType } from '@prisma/client'
import React from 'react'
import MoreOptions from './MoreOptions'
import { cn } from '@/lib/utils'
import UserPermission from './UserPermission'

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

const MembersRow = ({ user, userRole, workspaceId, onSetWorkspaceSubscriber }: Props) => {
  return (
    <li
      className={cn(
        "grid grid-cols-3 items-center py-2 px-3 rounded-md text-sm",
        "transition hover:bg-gray-700 dark:hover:bg-gradient-to-r",
        "dark:hover:from-gray-900/40 dark:hover:via-gray-950/40 dark:hover:to-black/40"
      )}
    >
      {/* Avatar + Username */}
      <div className="flex items-center gap-3">
        <UserAvatar profileImage={user.image} size={32} />
        <p className="text-gray-800 dark:text-gray-200 font-medium">{user.username}</p>
      </div>

      {/* Permission Dropdown */}
      <div className="flex justify-start">
        <UserPermission
          workspaceId={workspaceId}
          user={user}
          userRole={userRole}
          onSetWorkspaceSubscriber={onSetWorkspaceSubscriber}
        />
      </div>

      {/* More options */}
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
