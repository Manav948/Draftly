"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { useQuery } from "@tanstack/react-query"
import { AssignedToMeDataItems } from "@/types/extended"
import LoadingPage from "../ui/IsLoadingPage"
import ErrorPage from "../ui/IsError"
import WorkspaceItem from "./WorkspaceItem"
import WorkspaceHeader from "./WorkspaceHeader"
import { Workspace } from "@prisma/client"
import { useState } from "react"

interface Props {
  userId: string
  workspaceId: string
  userWorkspace: Workspace[]
  href: string
  workspace: Workspace
}

const WorkspaceContainer = ({
  userId,
  workspaceId,
  userWorkspace,
  href,
  workspace,
}: Props) => {
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>(
    workspaceId ?? "all"
  )

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<AssignedToMeDataItems[]>({
    queryKey: ["getWorkspaceDetails", userId, activeWorkspaceId],
    queryFn: async () => {
      const res = await fetch(
        `/api/dashboard/getItem?workspace=${activeWorkspaceId}&userId=${userId}`
      )
      if (!res.ok) throw new Error("Failed to fetch workspace items")
      return res.json()
    },
    placeholderData: (previousData) => previousData,
  })

  return (
    <section className="flex flex-col gap-6 dark:bg-[#0e0707]">
      <WorkspaceHeader
        workspaceId={workspaceId}
        userWorkspace={userWorkspace}
        href={href}
        workspace={workspace}
        activeWorkspaceId={activeWorkspaceId}
        onWorkspaceChange={setActiveWorkspaceId}
      />

      <Card className="border-none shadow-none dark:bg-[#0e0707] dark:text-[#f03d3d]">
        <CardHeader>
          <CardTitle className="text-xl">Workspace Details</CardTitle>
          <CardDescription>
            Tasks and mind maps assigned to you in this workspace.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 flex flex-col gap-3">
          {isLoading && <LoadingPage title="Loading workspace…" />}

          {isError && (
            <ErrorPage
              title="Unable to load workspace"
              description="There was a problem fetching workspace details."
              onRetry={refetch}
            />
          )}

          {!isLoading && !isError && data?.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              No items assigned yet.
            </div>
          )}

          {!isLoading &&
            !isError &&
            data?.map(item => (
              <WorkspaceItem key={item.id} WorkspaceInfo={item} />
            ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default WorkspaceContainer
