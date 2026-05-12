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
    <section className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]">
      <WorkspaceHeader
        workspaceId={workspaceId}
        userWorkspace={userWorkspace}
        href={href}
        workspace={workspace}
        activeWorkspaceId={activeWorkspaceId}
        onWorkspaceChange={setActiveWorkspaceId}
      />

      <div className="flex-1 w-full max-w-[1800px] mx-auto px-6 py-10">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
              {activeWorkspaceId === "all" ? "All Workspaces" : workspace.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Tasks and mind maps assigned to you in this workspace.
            </p>
          </div>

          {/* Quick Stats - Simple Counter */}
          {!isLoading && !isError && data && (
            <div className="flex items-center gap-3 text-sm">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider text-xs">Total Items</span>
                <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span>
              </div>
            </div>
          )}
        </div>

        {isLoading && <LoadingPage title="Loading workspace…" />}

        {isError && (
          <ErrorPage
            title="Unable to load workspace"
            description="There was a problem fetching workspace details."
            onRetry={refetch}
          />
        )}

        {!isLoading && !isError && data?.length === 0 && (
          <div className="py-24 text-center border border-dashed border-gray-200 dark:border-[#222] rounded-xl flex flex-col items-center justify-center bg-white/50 dark:bg-[#111]/50">
            <span className="text-gray-400 dark:text-gray-500 mb-2">No items found</span>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              There are currently no tasks or mind maps assigned to you.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.map(item => (
              <WorkspaceItem key={item.id} WorkspaceInfo={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default WorkspaceContainer
