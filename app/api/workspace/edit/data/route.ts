import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiWorkspaceEditData } from "@/schema/workSpaceSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const body: unknown = await request.json()
    const result = apiWorkspaceEditData.safeParse(body);

    if (!result.success) {
        return NextResponse.json("Your Email is not Match Enter correct one", { status: 401 })
    }

    const { id, color, workspaceName } = result.data

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
                }
            }
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        if (user.subscriptions[0].userRole === "CAN_EDIT" || user.subscriptions[0].userRole === "READ_ONLY") {
            return NextResponse.json("You don't have permisson to delete a picture", { status: 403 })
        }

        await db.workspace.update({
            where: {
                id
            },
            data: {
                name: workspaceName,
                color
            }
        })
        return NextResponse.json(result.data, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}