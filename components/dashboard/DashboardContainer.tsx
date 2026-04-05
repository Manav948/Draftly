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
    Activity,
} from "lucide-react"
import { DashboardSummary } from "@/types/extended"
import FocusCard from "../ui/FocusCard"
import StateCard from "../ui/StateCard"
import InsightCard from "../ui/InsightCard"
import Welcoming from "../header/Welcoming"
import ActivityChart from "./ActivityChart"

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
        <section className="px-3 md:px-6 space-y-6 py-6 md:py-8 min-h-screen pb-24">
            <header className="space-y-2 mb-6 md:mb-8">
               <Welcoming />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
                <div className="lg:col-span-5 xl:col-span-4">
                    <FocusCard />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 lg:col-span-7 xl:col-span-8">
                    <StateCard icon={CheckCircle} label="Tasks" value={data?.stats.totalTasks ?? 0} />
                    <StateCard icon={Folder} label="Spaces" value={data?.stats.workspaces ?? 0} />
                    <StateCard icon={Star} label="Starred" value={data?.stats.starred ?? 0} />
                    <StateCard icon={User} label="Assigned" value={data?.stats.assigned ?? 0} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mt-6">
                <div className="lg:col-span-7 xl:col-span-8 overflow-hidden rounded-xl">
                    <ActivityChart />
                </div>
                
                <section className="flex flex-col space-y-4 lg:col-span-5 xl:col-span-4 max-h-[400px]">
                    <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 text-white">
                        <Activity size={18} className="text-red-500" /> Recent Activity
                    </h2>
                    
                    <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        {data?.recentActivity?.length ? (
                            data.recentActivity.map((item) => (
                                <ActivityItem key={item.id} item={item} />
                            ))
                        ) : (
                            <div className="text-sm border border-red-900/30 rounded-xl p-6 text-center text-gray-400 bg-black/40">
                                No recent activity found.
                            </div>
                        )}
                    </div>
                </section>
            </div>

            <InsightCard />
        </section>
    )
}

export default DashboardPage
