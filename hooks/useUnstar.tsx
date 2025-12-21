"use client"

import { StarredItem } from "@/types/saved"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"

interface Props {
  itemId: string
  type: "mindMap" | "task"
  userId: string
  sortType: "asc" | "desc"
}

const useUnStar = ({ itemId, type, userId, sortType }: Props) => {
  const queryClient = useQueryClient()

  const api =
    type === "mindMap"
      ? "/api/saved/mind_maps/toggle_mind_maps"
      : "/api/saved/tasks/toggleTasks"

  const body =
    type === "mindMap" ? { mindMapId: itemId } : { taskId: itemId }

  return useMutation({
    mutationFn: async () => {
      await axios.post(api, body)
    },

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["getStarredItems", userId, sortType],
      })

      const previous =
        queryClient.getQueryData<StarredItem[]>([
          "getStarredItems",
          userId,
          sortType,
        ]) ?? []

      queryClient.setQueryData(
        ["getStarredItems", userId, sortType],
        previous.filter((item) => item.itemId !== itemId)
      )

      return { previous }
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["getStarredItems", userId, sortType],
          context.previous
        )
      }
      toast.error("Unstar failed")
    },

    onSuccess: () => {
      toast.success("Removed from starred")
    },
  })
}

export default useUnStar