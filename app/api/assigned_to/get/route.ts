import { db } from "@/lib/db"
import { sortAssignedToMeDataByCreated } from "@/lib/sortAssignedToMe";
import { AssignedToMeTasksAndMindMaps, AssignedToMeTypes } from "@/types/extended";
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    const url = new URL(request.url)

    const workspaceFilterParam = url.searchParams.get("workspace")
    const userId = url.searchParams.get("userId")
    const currentType = url.searchParams.get("type")

    if (!userId) {
        return NextResponse.json("Error in user api function", { status: 404 })
    }
    try {
        // for type safety check prisma for understand
        const normalizeDate = (date?: { from?: string | null; to?: string | null } | Date) => {
            if (!date) return new Date()
            if (date instanceof Date) return date
            return new Date(date.from ?? date.to ?? Date.now())
        }

        if (workspaceFilterParam && workspaceFilterParam !== "all") {
            const taskAndMindMaps = await db.workspace.findUnique({
                where: {
                    id: workspaceFilterParam,
                },
                include: {
                    Task: {
                        where: {
                            assignedToTasks: {
                                some: {
                                    userId
                                }
                            }
                        },
                        include: {
                            updatedBy: {
                                select: {
                                    username: true,
                                    name: true,
                                    id: true,
                                    image: true,
                                    surname: true
                                }
                            }
                        }
                    },
                    mindMaps: {
                        where: {
                            assignedToMindMaps: {
                                some: {
                                    userId
                                }
                            }
                        },
                        include: {
                            updatedBy: {
                                select: {
                                    username: true,
                                    name: true,
                                    surname: true,
                                    id: true,
                                    image: true,

                                }
                            }
                        }
                    }
                }
            })
            if (!taskAndMindMaps) {
                return NextResponse.json("Task not found", { status: 404 })
            }
            switch (currentType) {
                case "tasks":
                    const assignedTaskData: AssignedToMeTasksAndMindMaps = {
                        mindMaps: [],
                        Task: taskAndMindMaps.Task.map((task) => ({
                            id: task.id,
                            title: task.title || "",
                            emoji: task.emoji || "",
                            link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
                            workspaceName: taskAndMindMaps.name,
                            createdAt: new Date(
                                task.createdAt.from ??
                                task.createdAt.to ??
                                Date.now()
                            ),
                            type: "mindMap",
                            workspaceId: task.workspaceId,
                            updated: {
                                at: normalizeDate(task.updatedAt),
                                by: task.updatedBy
                            }

                        })),
                    }
                    return NextResponse.json(sortAssignedToMeDataByCreated(assignedTaskData), { status: 200 })
                case "mindMaps":
                    const assignedMindMapData: AssignedToMeTasksAndMindMaps = {
                        Task: [],
                        mindMaps: taskAndMindMaps.mindMaps.map((mindMap) => ({
                            id: mindMap.id,
                            title: mindMap.title || "",
                            emoji: mindMap.emoji || "",
                            link: `/dashboard/workspace/${mindMap.workspaceId}/mind_maps/mind_map/${mindMap.id}`,
                            workspaceName: taskAndMindMaps.name,
                            createdAt: new Date(
                                mindMap.createdAt.from ??
                                mindMap.createdAt.to ??
                                Date.now()
                            ),
                            type: "mindMap",
                            workspaceId: mindMap.workspaceId,
                            updated: {
                                at: normalizeDate(mindMap.updatedAt),
                                by: mindMap.updatedBy
                            }
                        })),
                    }
                    return NextResponse.json(sortAssignedToMeDataByCreated(assignedMindMapData), { status: 200 })
                default:
                    const assignedAllData: AssignedToMeTasksAndMindMaps = {
                        Task: taskAndMindMaps.Task.map((task) => ({
                            id: task.id,
                            title: task.title || "",
                            emoji: task.emoji || "",
                            link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
                            workspaceName: taskAndMindMaps.name,
                            createdAt: new Date(
                                task.createdAt.from ??
                                task.createdAt.to ??
                                Date.now()
                            ),
                            type: "tasks",
                            workspaceId: task.workspaceId,
                            updated: {
                                at: normalizeDate(task.updatedAt),
                                by: task.updatedBy
                            }
                        })),
                        mindMaps: taskAndMindMaps.mindMaps.map((mindMap) => ({
                            id: mindMap.id,
                            title: mindMap.title || "",
                            emoji: mindMap.emoji || "",
                            link: `/dashboard/workspace/${mindMap.workspaceId}/mind_maps/mind_map/${mindMap.id}`,
                            workspaceName: taskAndMindMaps.name,
                            createdAt: new Date(
                                mindMap.createdAt.from ??
                                mindMap.createdAt.to ??
                                Date.now()
                            ),
                            type: "mindMap",
                            workspaceId: mindMap.workspaceId,
                            updated: {
                                at: normalizeDate(mindMap.updatedAt),
                                by: mindMap.updatedBy
                            }
                        })),
                    }
                    return NextResponse.json(sortAssignedToMeDataByCreated(assignedAllData), { status: 200 })
            }
        }
        else {
            const taskAndMindMaps = await db.workspace.findMany({
                include: {
                    Task: {
                        where: {
                            assignedToTasks: {
                                some: {
                                    userId
                                }
                            }
                        },
                        include: {
                            updatedBy: {
                                select: {
                                    username: true,
                                    surname: true,
                                    id: true,
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    },
                    mindMaps: {
                        where: {
                            assignedToMindMaps: {
                                some: {
                                    userId
                                }
                            }
                        },
                        include: {
                            updatedBy: {
                                select: {
                                    username: true,
                                    surname: true,
                                    id: true,
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    }
                }
            })
            if (taskAndMindMaps.length === 0) {
                return NextResponse.json([], { status: 200 })
            }
            const assignData: AssignedToMeTasksAndMindMaps = {
                Task: [],
                mindMaps: []
            }
            switch (currentType) {
                case "tasks":
                    taskAndMindMaps.forEach((item) => {
                        assignData.Task.push(
                            ...item.Task.map((task) => ({
                                id: task.id,
                                title: task.title || "",
                                emoji: task.emoji || "",
                                link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
                                workspaceName: item.name,
                                createdAt: new Date(
                                    task.createdAt.from ??
                                    task.createdAt.to ??
                                    Date.now()
                                ),
                                type: "tasks" as AssignedToMeTypes,
                                workspaceId: task.workspaceId,
                                updated: {
                                    at: normalizeDate(task.updatedAt),
                                    by: task.updatedBy
                                }
                            }))
                        )
                    })
                    break;
                case "mindMaps":
                    taskAndMindMaps.forEach((item) => {
                        assignData.mindMaps.push(
                            ...item.mindMaps.map((mindMap) => ({
                                id: mindMap.id,
                                title: mindMap.title || "",
                                emoji: mindMap.emoji || "",
                                link: `/dashboard/workspace/${mindMap.workspaceId}/mind_maps/mind_map/${mindMap.id}`,
                                workspaceName: item.name, createdAt: new Date(
                                    mindMap.createdAt.from ??
                                    mindMap.createdAt.to ??
                                    Date.now()
                                ),
                                type: "mindMap" as AssignedToMeTypes,
                                workspaceId: mindMap.workspaceId,
                                updated: {
                                    at: normalizeDate(mindMap.updatedAt),
                                    by: mindMap.updatedBy
                                }
                            }))
                        )
                    })
                    break
                default:
                    taskAndMindMaps.forEach((item) => {
                        assignData.mindMaps.push(
                            ...item.mindMaps.map((mindMap) => ({
                                id: mindMap.id,
                                title: mindMap.title || "",
                                emoji: mindMap.emoji || "",
                                link: `/dashboard/workspace/${mindMap.workspaceId}/mind_maps/mind_map/${mindMap.id}`,
                                workspaceName: item.name,
                                createdAt: new Date(
                                    mindMap.createdAt.from ??
                                    mindMap.createdAt.to ??
                                    Date.now()
                                ),
                                type: "mindMap" as AssignedToMeTypes,
                                workspaceId: mindMap.workspaceId,
                                updated: {
                                    at: normalizeDate(mindMap.updatedAt),
                                    by: mindMap.updatedBy
                                }
                            }))
                        )
                        assignData.Task.push(
                            ...item.Task.map((task) => ({
                                id: task.id,
                                title: task.title || "",
                                emoji: task.emoji || "",
                                link: `/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}`,
                                workspaceName: item.name,
                                createdAt: new Date(
                                    task.createdAt.from ??
                                    task.createdAt.to ??
                                    Date.now()
                                ),
                                type: "tasks" as AssignedToMeTypes,
                                workspaceId: task.workspaceId,
                                updated: {
                                    at: normalizeDate(task.updatedAt),
                                    by: task.updatedBy
                                }
                            }))
                        )
                    })
            }
            return NextResponse.json(sortAssignedToMeDataByCreated(assignData), { status: 200 })
        }
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}