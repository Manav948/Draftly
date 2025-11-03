"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LoadingState } from "@/components/ui/LoadingState"
import { SubscriptionUser } from "@/types/extended"
import { UserPermission as UserPermissionType } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { Check } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import React from "react"

interface Props {
  userRole: UserPermissionType;
  user: { id: string; image?: string | null; username: string };
  workspaceId: string;
  onSetWorkspaceSubscriber: React.Dispatch<React.SetStateAction<SubscriptionUser[]>>
}

const roleEmojis: Record<UserPermissionType, string> = {
  OWNER: "👑",
  ADMIN: "🛠️",
  CAN_EDIT: "✏️",
  READ_ONLY: "👁️"
}

const UserPermission = ({ user, userRole, workspaceId, onSetWorkspaceSubscriber }: Props) => {
  const router = useRouter()
  const t = useTranslations("PERMISSIONS")

  const { mutate: editUserRole, isPending } = useMutation({
    mutationFn: async (role: UserPermissionType) => {
      const { data } = await axios.post("/api/workspace/users/edit_role", {
        userId: user.id,
        workspaceId,
        new_role: role
      }) as AxiosResponse<UserPermissionType>

      return data
    },

    onSuccess: (newRole) => {
      onSetWorkspaceSubscriber((cur) =>
        cur.map((s) => (s.user.id === user.id ? { ...s, userRole: newRole } : s))
      )
      toast.success("User role updated")
      router.refresh()
    },

    onError: (err: AxiosError) => {
      console.log("Error from :", err)
      toast.error(err.response?.data as string || "Failed")
    }
  })

  if (isPending) return <LoadingState loadingText={t("WAIT")} />
  if (userRole === "OWNER") {
    return (
      <div className="text-sm flex items-center gap-1 opacity-75 font-medium">
        {roleEmojis.OWNER} {t("OWNER.TITLE")}
      </div>
    )
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-1 items-center">
          {roleEmojis[userRole]} {t(`${userRole}.TITLE`)}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48 p-1 dark:bg-gray-900">
        {(["ADMIN", "CAN_EDIT", "READ_ONLY"] as UserPermissionType[]).map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => editUserRole(role)}
            className="cursor-pointer flex flex-col gap-0.5 py-2"
          >
            <div className="flex justify-between">
              <span className="flex items-center gap-2">
                {roleEmojis[role]} {t(`${role}.TITLE`)}
              </span>
              {userRole === role && <Check size={18} />}
            </div>
            <span className="text-xs opacity-70">{t(`${role}.DESC`)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserPermission
