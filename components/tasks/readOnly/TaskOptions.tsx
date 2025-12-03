"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingState } from "@/components/ui/LoadingState";
import Warning from "@/components/ui/warning";
import { UserPermission } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { MoreHorizontal, Pencil, Star, StarOff, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  isSaved: boolean;
  taskId: string;
  workspaceId: string;
  userRole: UserPermission | null;
  onSetIsSaved: () => void;
}

const TaskOptions = ({
  isSaved,
  taskId,
  workspaceId,
  userRole,
  onSetIsSaved,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("READ_ONLY");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post("/api/task/delete", {
        workspaceId,
        taskId,
      });
    },
    onError: (err: AxiosError) => {
      toast.error("Task could not be deleted.");
    },
    onSuccess: () => {
      toast.success("Task deleted successfully.");
      queryClient.invalidateQueries(["getWorkspaceShortCuts"] as any);
      router.push(`/dashboard/workspace/${workspaceId}`);
      router.refresh();
    },
    mutationKey: ["deleteTask"],
  });

  const { mutate: toggleTask } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/saved/tasks/toggleTasks`, {
        taskId,
      });
    },
    onMutate: onSetIsSaved,
    onError: () => {
      onSetIsSaved();
      toast.error("Failed to update favorite status.");
    },
    mutationKey: ["toggleTask"],
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* OPTIONS DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="
              h-9 w-9 rounded-full
              bg-white border border-black text-black
              hover:bg-gray-800 hover:text-white
              hover:dark:bg-black hover:dark:border-white hover:dark:text-white
              transition-all cursor-pointer
            "
          >
            <MoreHorizontal size={20} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            align="end"
            sideOffset={6}
            className="
              min-w-[175px]
              rounded-xl border border-white/90
              dark:bg-gradient-to-br from-gray-950 via-black to-gray-900
              backdrop-blur-md
              shadow-xl
              p-1
              text-sm
            "
          >
            {/* FAVORITE TOGGLE */}
            <DropdownMenuItem
              onClick={() => toggleTask()}
              className="cursor-pointer flex items-center gap-2 rounded-lg hover:bg-white/10 transition"
            >
              {isSaved ? (
                <>
                  <StarOff size={16} className="text-yellow-400" />
                  {t("REMOVE_FROM_FAV")}
                </>
              ) : (
                <>
                  <Star size={16} className="text-yellow-400" />
                  {t("ADD_TO_FAV")}
                </>
              )}
            </DropdownMenuItem>

            {userRole && userRole !== "READ_ONLY" && (
              <>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer rounded-lg hover:bg-white/10 transition"
                >
                  <Link
                    href={`/dashboard/workspace/${workspaceId}/tasks/task/${taskId}/edit`}
                    className="flex items-center gap-2"
                  >
                    <Pencil size={16} className="text-blue-400" />
                    {t("EDIT")}
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 my-1" />

                <DialogTrigger asChild>
                  <DropdownMenuItem
                    className="
                      cursor-pointer
                      rounded-lg
                      text-red-400 hover:text-red-300
                      hover:bg-red-500/10
                      transition
                      flex items-center gap-2
                    "
                  >
                    <Trash2 size={16} />
                    {t("DELETE")}
                  </DropdownMenuItem>
                </DialogTrigger>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>

      <DialogPortal>
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />
        <DialogContent
          className="
            max-w-md
            bg-gradient-to-br from-gray-950 via-black to-gray-900
            text-white
            rounded-2xl
            p-6
            border border-white/10
            shadow-2xl
          "
        >
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-lg font-semibold text-red-400">
              {t("DIALOG.TITLE")}
            </DialogTitle>

            <Warning>
              <p className="text-sm text-muted-foreground">
                {t("DIALOG.DESC")}
              </p>
            </Warning>

            <Button
              onClick={() => deleteTask()}
              size="lg"
              variant="destructive"
              className="
                w-full mt-4
                flex items-center justify-center gap-2
              "
            >
              {isPending ? (
                <LoadingState loadingText={t("DIALOG.BTN_PENDING")} />
              ) : (
                t("DIALOG.BTN_DELETE")
              )}
            </Button>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default TaskOptions;
