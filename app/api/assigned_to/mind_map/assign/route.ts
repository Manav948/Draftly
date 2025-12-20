import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const assignToMindMapSchema = z.object({
        workspaceId: z.string(),
        mindMapId: z.string(),
        assignedToUserId: z.string()
    })

    const result = assignToMindMapSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId, mindMapId, assignedToUserId } = result.data;

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

        if (user.subscriptions[0].userRole === "READ_ONLY") {
            return NextResponse.json("You don't have permisson to delete a picture", { status: 403 })
        }

        const assgningUser = await db.user.findUnique({
            where: {
                id: assignedToUserId
            },
            include: {
                assignedToMindMaps: {
                    where: {
                        mindMapId
                    }
                }
            }
        })

        if (!assgningUser) {
            return NextResponse.json("No user Existed", { status: 404 })
        }

        if (!assgningUser?.assignedToMindMaps || assgningUser?.assignedToMindMaps.length === 0) {
            await db.assignedToMindMap.create({
                data: {
                    userId: assignedToUserId,
                    mindMapId
                }
            })
            return NextResponse.json("OK", { status: 200 })
        } else {
            await db.assignedToTask.delete({
                where: {
                    id: assgningUser.assignedToMindMaps[0].id
                }
            })
            return NextResponse.json("OK", { status: 200 })
        }
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}