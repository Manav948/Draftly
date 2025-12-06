"use client"

import { UserAvatar } from "@/components/ui/user-avatar"
import { SubscriptionUser } from "@/types/extended"
import { UserPermission as UserPermissionType } from "@prisma/client"
import React from "react"
import MoreOptions from "./MoreOptions"
import { cn } from "@/lib/utils"
import UserPermission from "./UserPermission"

interface Props {
  userRole: UserPermissionType
  user: {
    id: string
    image?: string | null | undefined
    username: string
  }
  workspaceId: string
  onSetWorkspaceSubscriber: React.Dispatch<
    React.SetStateAction<SubscriptionUser[]>
  >
}

const MembersRow = ({
  user,
  userRole,
  workspaceId,
  onSetWorkspaceSubscriber,
}: Props) => {
  return (
    <li
      className={cn(
        `
        flex flex-col
        p-4 rounded-xl border
        bg-muted/40
        shadow-2xl
        dark:bg-gradient-to-br
        dark:from-gray-800
        dark:via-white/120
        dark:to-gray-800
        transition
        sm:grid sm:grid-cols-3 sm:items-center
        sm:gap-3 sm:p-2 sm:rounded-xl sm:border-none sm:bg-transparent
        hover:bg-primary/5
        `
      )}
    >
      <div className="flex items-center gap-3">
        <UserAvatar profileImage={user.image} size={36} />

        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {user.username}
          </p>
          <span className="sm:hidden text-xs text-muted-foreground">
            {userRole}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-start sm:justify-start">
        <UserPermission
          workspaceId={workspaceId}
          user={user}
          userRole={userRole}
          onSetWorkspaceSubscriber={onSetWorkspaceSubscriber}
        />
      </div>

      <div className="flex justify-start sm:justify-end">
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
