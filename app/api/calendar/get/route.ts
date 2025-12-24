import { db } from "@/lib/db"
import { CalendarItem } from "@/types/extended"
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json("User ID is missing. Please try again.", { status: 400 })
    }
    try {
        const userSubscription = await db.subscription.findMany({
            where: {
                userId: userId
            }, include: {
                workspace: {
                    include: {
                        Task: {
                            include: {
                                date: true
                            }
                        }
                    }
                },
            }
        })
        if (userSubscription.length === 0) {
            return NextResponse.json([], { status: 200 })
        }
        const allTask: CalendarItem[] = userSubscription.flatMap((subscription) => {
            return subscription.workspace.Task.map((task) => ({
                title: task.title || "",
                date: {
                    id: task.date?.id || "",
                    from: task.date?.from ? new Date(task.date.from) : undefined,
                    to: task.date?.to ? new Date(task.date.to) : undefined
                },
                workspaceId: task.workspaceId,
                workspaceName: subscription.workspace.name,
                workspaceColor: subscription.workspace.color,
                taskId: task.id
            }))
        })
        return NextResponse.json(allTask, { status: 200 })
    } catch (error) {
        console.error("Error fetching user workspaces:", error);
        return NextResponse.json(
            { error: "Failed to fetch workspaces. Please try again later." },
            { status: 500 }
        );
    }
}