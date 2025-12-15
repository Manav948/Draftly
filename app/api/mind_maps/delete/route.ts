import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteMindMapSchema } from "@/schema/mindMapSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = deleteMindMapSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId, mindMapId } = result.data;

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

        // if (user.subscriptions[0].userRole === "CAN_EDIT" || user.subscriptions[0].userRole === "READ_ONLY") {
        //     return NextResponse.json("You don't have permisson to delete a picture", { status: 403 })
        // }

        const mindMap = await db.mindMap.findUnique({
            where: {
                id: mindMapId
            },
        })

        if (!mindMap) {
            return NextResponse.json("No Task Found", { status: 403 })
        }
        await db.mindMap.delete({
            where: {
                id: mindMap.id
            }
        })
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}