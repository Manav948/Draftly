import { db } from "@/lib/db"
import { sortAssignedToMeDataByCreated } from "@/lib/sortAssignedToMe";
import { AssignedToMeTasksAndMindMaps, AssignedToMeTypes } from "@/types/extended";
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: Request) => {
    const url = new URL(request.url)

    const workspaceFilterParam = url.searchParams.get("workspace")
    const currentType = url.searchParams.get("type")
    
    // Pagination params
    const page = parseInt(url.searchParams.get("page") || "1", 10)
    const limit = parseInt(url.searchParams.get("limit") || "50", 10)
    const skip = (page - 1) * limit

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json("Unauthorized", { status: 401 })
    }
    const userId = session.user.id

    try {
        const assignData: AssignedToMeTasksAndMindMaps = {
            Task: [],
            mindMaps: []
        }

        const workspaceCondition = workspaceFilterParam && workspaceFilterParam !== "all" 
            ? { workspaceId: workspaceFilterParam } 
            : {}

        if (currentType === "tasks" || currentType === "all" || !currentType) {
            const tasks = await db.task.findMany({
                where: {
                    ...workspaceCondition,
                    assignedToTasks: { some: { userId } }
                },
                include: {
                    workspace: { select: { name: true } },
                    updatedBy: { select: { username: true, name: true, surname: true, id: true, image: true } }
                },
                orderBy: { updatedAt: 'desc' },
                take: limit,
                skip: skip
            })

            assignData.Task = tasks.map(task => ({
                id: task.id,
                title: task.title || "",
                emoji: task.emoji || "",
                link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
                workspaceName: task.workspace?.name || "",
                createdAt: new Date(task.createdAt as any),
                type: "tasks" as AssignedToMeTypes,
                workspaceId: task.workspaceId,
                updated: {
                    at: new Date(task.updatedAt as any),
                    by: task.updatedBy
                }
            }))
        }

        if (currentType === "mindMaps" || currentType === "all" || !currentType) {
            const mindMaps = await db.mindMap.findMany({
                where: {
                    ...workspaceCondition,
                    assignedToMindMaps: { some: { userId } }
                },
                include: {
                    workspace: { select: { name: true } },
                    updatedBy: { select: { username: true, name: true, surname: true, id: true, image: true } }
                },
                orderBy: { updatedAt: 'desc' },
                take: limit,
                skip: skip
            })

            assignData.mindMaps = mindMaps.map(mindMap => ({
                id: mindMap.id,
                title: mindMap.title || "",
                emoji: mindMap.emoji || "",
                link: `/dashboard/workspace/${mindMap.workspaceId}/mind_maps/mind_map/${mindMap.id}`,
                workspaceName: mindMap.workspace?.name || "",
                createdAt: new Date(mindMap.createdAt as any),
                type: "mindMap" as AssignedToMeTypes,
                workspaceId: mindMap.workspaceId,
                updated: {
                    at: new Date(mindMap.updatedAt as any),
                    by: mindMap.updatedBy
                }
            }))
        }

        return NextResponse.json(sortAssignedToMeDataByCreated(assignData), { status: 200 })

    } catch (error) {
        console.error("Error fetching assigned items:", error)
        return NextResponse.json("Error during db connection", { status: 500 })
    }
}