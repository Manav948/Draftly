"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LoadingState } from "@/components/ui/LoadingState"
import Warning from "@/components/ui/warning"
import { UserPermission } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import {
  MoreHorizontal,
  Pencil,
  Star,
  StarOff,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import toast from "react-hot-toast"

interface Props {
  isSaved: boolean
  mindMapId: string
  workspaceId: string
  userRole: UserPermission | null
  onSetIsSaved: () => void
}

const PreviewCard = ({
  isSaved,
  mindMapId,
  workspaceId,
  userRole,
  onSetIsSaved,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: deleteMindMap, isPending } = useMutation({
    mutationFn: async () =>
      axios.post("/api/mind_maps/delete", {
        workspaceId,
        mindMapId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getWorkspaceShortCuts"] })
      router.push(`/dashboard/workspace/${workspaceId}`)
      toast.success("Mind map deleted")
    },
    onError: (err: AxiosError) => {
      toast.error(
        "Delete failed: " +
          (err.response?.data ?? "Unexpected error")
      )
    },
  })

  const { mutate: toggleMindMap } = useMutation({
    mutationFn: async () =>
      axios.post("/api/saved/mind_maps/toggle_mind_maps", {
        mindMapId,
      }),
    onSuccess: () => {
      onSetIsSaved()
      toast.success("Updated favourites")
    },
    onError: () => {
      onSetIsSaved()
      toast.error("Failed to update favourites")
    },
  })

  return (
    <div className="flex justify-end">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-48"
            >
              <DropdownMenuItem
                onClick={() => toggleMindMap()}
                className="cursor-pointer gap-2"
              >
                {isSaved ? (
                  <>
                    <StarOff size={16} />
                    Remove from favourites
                  </>
                ) : (
                  <>
                    <Star size={16} />
                    Add to favourites
                  </>
                )}
              </DropdownMenuItem>

              {userRole === "OWNER" && (
                <>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild className="cursor-pointer gap-2">
                    <Link
                      href={`/dashboard/workspace/${workspaceId}/mind_maps/mind_map/${mindMapId}/edit`}
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>
                  </DropdownMenuItem>

                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                      <Trash2 size={16} />
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>

        {/* Delete Confirmation */}
        <DialogPortal>
          <DialogOverlay className="bg-black/40" />
          <DialogContent className="max-w-sm rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg">
                Delete Mind Map?
              </DialogTitle>
              <DialogDescription>Are you Sure you want to delete this MinMap, you lost all access and minMap settings.</DialogDescription>
            </DialogHeader>

            <Warning>
              <p className="text-sm text-muted-foreground">
                This action is permanent and cannot be undone.
              </p>
            </Warning>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => deleteMindMap()}
              >
                {isPending ? (
                  <LoadingState loadingText="Deleting..." />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

export default PreviewCard
