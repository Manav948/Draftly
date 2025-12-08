import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { mindMapSchema } from "@/schema/mindMapSchema";
import { newTaskSchema } from "@/schema/newTaskSchema";
import { updateTaskSchema } from "@/schema/updateTaskSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = mindMapSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId, mindmapId, content } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                subscriptions: {
                    where: {
                        workspaceId: workspaceId
                    },
                    select: {
                        userRole: true
                    }
                }
            }
        })

        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        if (user.subscriptions[0].userRole === "CAN_EDIT" || user.subscriptions[0].userRole === "READ_ONLY") {
            return NextResponse.json("You don't have permisson to delete a picture", { status: 403 })
        }

        const mindmap = await db.mindMap.findUnique({
            where: {
                id: mindmapId
            }
        })

        if (!mindmap) {
            return NextResponse.json("mindmap not Found", { status: 403 })
        }

        const updatedMindMap = await db.mindMap.update({
            where: {
                id: mindmap.id
            },
            data: {
                updatedUserId: session.user.id,
                content
            }
        })
        return NextResponse.json(updatedMindMap, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}