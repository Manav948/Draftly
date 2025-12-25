"use client"

import { useQuery } from "@tanstack/react-query"
import { useFormatter } from "next-intl"
import LoadingPage from "@/components/ui/IsLoadingPage"
import ErrorPage from "@/components/ui/IsError"
import ActivityItem from "../ui/ActivityItem"
import {
    Star,
    Folder,
    CheckCircle,
    User,
    Sparkles,
} from "lucide-react"
import { DashboardSummary } from "@/types/extended"
import StateCard from "../ui/stateCard"
import FocusCard from "../ui/FocusCard"
import InsightCard from "../ui/InsightCard"
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

    if (isLoading) return <LoadingPage title="Preparing your focus…" />
    if (isError) return <ErrorPage onRetry={refetch} />

    return (
        <section className="px-6 space-y-5 py-5">
            <header className="space-y-1">
               <Welcoming />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FocusCard />
                <div className="grid grid-cols-2 gap-4">
                    <StateCard icon={CheckCircle} label="Tasks" value={data?.stats.totalTasks ?? 2} />
                    <StateCard icon={Folder} label="Workspaces" value={data?.stats.workspaces ?? 2} />
                    <StateCard icon={Star} label="Starred" value={data?.stats.starred ?? 2} />
                    <StateCard icon={User} label="Assigned" value={data?.stats.assigned ?? 2} />
                </div>
            </div>

            <section>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles size={18} /> Recent Activity
                </h2>

                <div className="space-y-3">
                    {data?.recentActivity.map((item) => (
                        <ActivityItem key={item.id} item={item} />
                    ))}
                </div>
            </section>

            <InsightCard />
        </section>
    )
}

export default DashboardPage
