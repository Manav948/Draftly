"use client"

import { UserPermission as UserPermissionType } from '@prisma/client'
import { SubscriptionUser } from '@/types/extended'
import { useTranslations } from 'next-intl'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'
import React from 'react'

import { Button } from '@/components/ui/button'
import { MoreHorizontal, Trash } from 'lucide-react'
import { LoadingState } from '@/components/ui/LoadingState'
import Warning from '@/components/ui/warning'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'


interface Props {
  userRole: UserPermissionType
  userId: string
  workspaceId: string
  onSetWorkspaceSubscriber: React.Dispatch<
    React.SetStateAction<SubscriptionUser[]>
  >
}

const MoreOptions = ({ userId, userRole, workspaceId, onSetWorkspaceSubscriber }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const t = useTranslations("EDIT_WORKSPACE.MEMBERS.REMOVE")
  const router = useRouter()

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/workspace/users/remove", {
        userId,
        workspaceId
      })
    },

    onSuccess: () => {
      onSetWorkspaceSubscriber(prev =>
        prev.filter(sub => sub.user.id !== userId) 
      )

      toast.success("User removed")
      setIsOpen(false)
      router.refresh()
    },

    onError: (err: AxiosError) => {
      toast.error(err.response?.data as string || "Failed")
    }
  })

  if (userRole === "OWNER") return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={18} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400">
              <Trash className="h-4 w-4 mr-2" />
              {t("REMOVE_BTN")}
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent
        className="
          bg-white dark:bg-gradient-to-br 
          dark:from-gray-900 dark:via-gray-950 dark:to-black 
          border border-gray-200 dark:border-gray-800
        "
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {t("REMOVE.TITLE")}
          </DialogTitle>
        </DialogHeader>

        <Warning blue>
          <p>{t("REMOVE.NOTE")}</p>
        </Warning>

        <Button
          onClick={() => deleteUser()}
          size="lg"
          className="w-full"
          variant="secondary"
          disabled={isPending}
        >
          {isPending
            ? <LoadingState loadingText={t("REMOVE.BTN_PENDING")} />
            : t("REMOVE.BTN")
          }
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default MoreOptions
