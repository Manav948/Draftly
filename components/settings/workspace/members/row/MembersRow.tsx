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
        transition-colors duration-200
        hover:bg-gray-50/80 dark:hover:bg-[#141414]
        sm:grid sm:grid-cols-12 sm:items-center
        sm:gap-4 px-6 py-4
        `
      )}
    >
      <div className="sm:col-span-5 flex items-center gap-4">
        <UserAvatar profileImage={user.image} size={40} className="shadow-sm border border-gray-100 dark:border-[#222]" />

        <div className="flex flex-col">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            {user.username}
          </p>
          <span className="sm:hidden text-xs text-muted-foreground mt-0.5">
            {userRole.replace("_", " ")}
          </span>
        </div>
      </div>

      <div className="sm:col-span-4 flex items-center justify-start mt-3 sm:mt-0">
        <UserPermission
          workspaceId={workspaceId}
          user={user}
          userRole={userRole}
          onSetWorkspaceSubscriber={onSetWorkspaceSubscriber}
        />
      </div>

      <div className="sm:col-span-3 flex justify-start sm:justify-end mt-3 sm:mt-0">
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
