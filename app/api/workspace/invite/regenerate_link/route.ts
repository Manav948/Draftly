import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const body: unknown = await request.json()
    const result = z.object({
        id: z.string()
    }).safeParse(body);

    if (!result.success) {
        return NextResponse.json("Your Email is not Match Enter correct one", { status: 401 })
    }

    const { id } = result.data

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

        const workspace = await db.workspace.update({
            where: {
                id
            },
            data: {
                inviteCode: uuidv4(),
                canEditCode: uuidv4(),
                readOnlyCode: uuidv4(),
                adminCode: uuidv4()

            }
        })
        return NextResponse.json(workspace, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}