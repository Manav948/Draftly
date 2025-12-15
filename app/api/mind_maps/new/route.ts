import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const newMindMapSchema = z.object({
        workspaceId: z.string()
    })
    const body: unknown = await request.json();

    const result = newMindMapSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId } = result.data;

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

        const mindmap = await db.mindMap.create({
            data: {
                workspaceId,
                creatorId: session.user.id,
                title: ""
            }
        })

        await db.mindMap.update({
            where: {
                id: mindmap.id
            },
            data: {
                updatedUserId: session.user.id
            }
        })

        if (!mindmap) {
            return NextResponse.json("No mindMap Found", { status: 403 })
        }
        return NextResponse.json(mindmap, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}