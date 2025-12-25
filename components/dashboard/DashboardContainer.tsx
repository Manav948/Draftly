"use client"

import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { useFormatter } from "next-intl"
import { Star, Folder, CheckCircle, User } from "lucide-react"
import LoadingPage from "@/components/ui/IsLoadingPage"
import ErrorPage from "@/components/ui/IsError"
import { DashboardSummary } from "@/types/extended"
import StateCard from "../ui/stateCard"
import Welcoming from "../header/Welcoming"

interface Props {
  userId: string
  username: string
}

const DashboardPage = ({ userId, username }: Props) => {
  const format = useFormatter()

  const { data, isLoading, isError, refetch } = useQuery<DashboardSummary>({
    queryKey: ["dashboard-summary", userId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/summary?userId=${userId}`)
      if (!res.ok) throw new Error()
      return res.json()
    },
  })

  if (isLoading) return <LoadingPage title="Loading your dashboard…" />
  if (isError) return <ErrorPage onRetry={refetch} />

  return (
    <section className="px-6 py-6 space-y-8">

      {/* HEADER */}
      <div>
       <Welcoming />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StateCard icon={CheckCircle} label="Tasks" value={data?.stats.totalTasks ?? 2} />
        <StateCard icon={Folder} label="Workspaces" value={data?.stats.workspaces ?? 2} />
        <StateCard icon={Star} label="Starred" value={data?.stats.starred ?? 2} />
        <StateCard icon={User} label="Assigned" value={data?.stats.assigned ?? 2} />
      </div>

      {/* RECENT ACTIVITY */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Recent Activity ⭐
        </h2>

        <div className="space-y-3">
          {data?.recentActivity.map((item) => (
            <Card
              key={item.id}
              className="
                dark:bg-gradient-to-b
                dark:from-gray-900 dark:via-gray-900 dark:to-black/30
                hover:shadow-lg transition
              "
            >
              <CardContent className="flex items-center gap-4 py-4">
                <span className="text-2xl">{item.emoji ?? "📝"}</span>

                <div className="min-w-0">
                  <p className="font-semibold truncate">
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Updated {format.relativeTime(new Date(item.updatedAt), new Date())}
                    {" · "}
                    <span className="text-red-400">
                      {item.workspace.name}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
