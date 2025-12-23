"use client"

import useAssignToMeParams from "@/hooks/useAssignToMeParams"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import AssignedToMeItem from "./AssignedToMeItem"
import { AssignedToMeDataItems } from "@/types/extended"
import { Loader2 } from "lucide-react"

interface Props {
  userId: string
}

const AssignedToMeContainer = ({ userId }: Props) => {
  const { currentType, workspaceParam } = useAssignToMeParams()

  const {
    data: assignedInfo,
    isLoading,
    isError,
  } = useQuery<AssignedToMeDataItems[]>({
    queryKey: ["getAssignedToMeInfo", userId, workspaceParam, currentType],
    queryFn: async () => {
      const res = await fetch(
        `/api/assigned_to/get?workspace=${workspaceParam}&type=${currentType}&userId=${userId}`
      )
      if (!res.ok) throw new Error("Failed to fetch assigned items")
      return res.json()
    },
  })

  return (
    <Card className="border-none shadow-none bg-transparent">
      <CardHeader className="pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Assigned to me
        </h1>
        <CardDescription className="max-w-2xl">
          Items that are currently assigned to you across workspaces.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center py-10 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading assignments…
          </div>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            Something went wrong while loading assignments.
          </p>
        )}

        {!isLoading && assignedInfo?.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No items assigned to you.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {assignedInfo?.map((info) => (
            <AssignedToMeItem key={info.id} info={info} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default AssignedToMeContainer
