import { db } from "@/lib/db"
import { CalendarItem } from "@/types/extended"
import { NextResponse } from "next/server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: Request) => {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
        return NextResponse.json("Unauthorized", { status: 401 })
    }
    
    const userId = session.user.id
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