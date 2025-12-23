"use client"

import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Trash2, AlertTriangle } from "lucide-react"
import { LoadingState } from "../ui/LoadingState"
import { Workspace } from "@prisma/client"
import { useRouter } from "next/navigation"

interface Props {
  workspace: Workspace
}

const LeaveWorkspace = ({ workspace: { id, name } }: Props) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { mutate: leaveWorkspace, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/workspace/leave", { id })
    },
    onError: (err: AxiosError) => {
      const error =
        err.response?.data ?? "Something went wrong while leaving workspace"
      console.error("Leave workspace error:", error)
      toast.error("Failed to leave workspace")
    },
    onSuccess: () => {
      toast.success("You have left the workspace")
      router.push("/dashboard")
      router.refresh()
    },
    mutationKey: ["leaveWorkspace", id],
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="
            text-destructive
            hover:bg-destructive/10
            hover:text-destructive
            flex items-center gap-2
          "
        >
          <Trash2 size={16} />
          <span>Leave workspace</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle size={20} />
            <DialogTitle>Leave “{name}”?</DialogTitle>
          </div>

          <DialogDescription className="text-sm text-muted-foreground">
            You will lose access to all tasks, mind maps, and workspace data.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          Make sure you have saved or transferred anything important before
          continuing.
        </div>

        <DialogFooter className="mt-6 flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={() => leaveWorkspace()}
            disabled={isPending}
            className="min-w-[150px]"
          >
            {isPending ? (
              <LoadingState loadingText="Leaving..." />
            ) : (
              "Leave Workspace"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LeaveWorkspace
