import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const body: unknown = await request.json()
    const result = z.object({
        id: z.string()
    }).safeParse(body)

    if (!result.success) {
        return NextResponse.json("Your Email is not Match Enter correct one", { status: 401 })
    }

    const { id, } = result.data

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                subscriptions: {
                    where: {
                        workspaceId: id
                    },
                    select: {
                        userRole: true
                    }
                },
                savedMindMaps: {
                    where: {
                        mindMap: {
                            workspaceId: id
                        }
                    }
                },
                savedTask: {
                    where: {
                        task: {
                            workspaceId: id
                        }
                    }
                },
                assignedToTasks: {
                    where: {
                        task: {
                            workspaceId: id
                        }
                    }
                },
                assignedToMindMaps: {
                    where: {
                        mindMap: {
                            workspaceId: id
                        }
                    }
                }
            }
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        if (user.subscriptions[0].userRole === "OWNER") {
            return NextResponse.json("You don't have permisson to delete a picture", { status: 403 })
        }

        const savedMindMapsIds = user.savedMindMaps.map((mindMap) => mindMap.id)
        const savedTaskIds = user.savedTask.map((task) => task.id)
        const assignedToMindMapsIds = user.assignedToMindMaps.map((mindMap) => mindMap.id)
        const assignedToTasksIds = user.assignedToTasks.map((task) => task.id)

        await db.savedMindMaps.deleteMany({
            where: {
                id: { in: savedMindMapsIds }
            }
        })

        await db.savedTask.deleteMany({
            where: {
                id: { in: savedTaskIds }
            }
        })

        await db.assignedToMindMap.deleteMany({
            where: {
                id: { in: assignedToMindMapsIds }
            }
        })

        await db.assignedToTask.deleteMany({
            where: {
                id: { in: assignedToTasksIds }
            }
        })

        await db.subscription.delete({
            where :{
                userId_workspaceId : {
                    workspaceId : id,
                    userId : session.user.id
                }
            }
        })

        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}