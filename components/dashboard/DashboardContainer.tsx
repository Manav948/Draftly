"use client"

import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { DashboardSummary } from "@/types/extended"
import LoadingPage from "@/components/ui/IsLoadingPage"
import ErrorPage from "@/components/ui/IsError"

import StatRow from "./workspace/StatRow"
import RecentActivity from "./workspace/RecentActivity"
import WorkspaceCards from "./workspace/WorkspaceCards"

interface Props {
  userId: string
  username: string
}

export default function DashboardContainer({ userId, username }: Props) {
  const { data, isLoading, isError, refetch } = useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary", userId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/summary`)
      if (!res.ok) throw new Error()
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })

  if (isLoading) return <LoadingPage title="Loading workspace…" />
  if (isError)   return <ErrorPage onRetry={refetch} />

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">

      {/* Page header */}
      <div className="px-6 md:px-8 pt-8 pb-6 border-b border-[#181818]">
        <p className="text-[10px] text-[#3a3a3a] uppercase tracking-widest font-medium mb-1.5">
          Overview
        </p>
        <h1 className="text-xl font-semibold text-[#f0f0f0] tracking-tight">
          Good to see you, <span className="text-red-500">{username || "there"}</span> 👋
        </h1>
        <p className="text-[12px] text-[#444] mt-1">
          Here's a summary of your workspaces and activity.
        </p>
      </div>

      {/* Body */}
      <div className="px-6 md:px-8 py-6 max-w-[1400px] mx-auto">

        {/* Stats */}
        <StatRow data={data} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">

          {/* Left — Workspaces (takes up more space) */}
          <div className="lg:col-span-8">
            <WorkspaceCards workspaces={data?.workspaces ?? []} />
          </div>

          {/* Right — Activity feed */}
          <div className="lg:col-span-4">
            <div className="h-full min-h-[360px]">
              <RecentActivity activity={data?.recentActivity ?? []} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
