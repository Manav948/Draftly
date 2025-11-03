import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { editUserRoleSchema } from "@/schema/editUserRoleSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const body: unknown = await request.json()
    const result = editUserRoleSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json("Invalid role data provided", { status: 401 })
    }

    const { userId, workspaceId, new_role } = result.data

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                subscriptions: {
                    where: {
                        workspaceId
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
            return NextResponse.json("You don't have permisson to delete a Workspace", { status: 403 })
        }

        const updatedUser = await db.subscription.update({
            where: {
                userId_workspaceId: {
                    userId,
                    workspaceId
                }
            },
            data: {
                userRole: new_role
            }
        })
        return NextResponse.json(updatedUser.userRole, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}