import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    const workspaceId = url.searchParams.get("workspaceId")

    if (!userId || !workspaceId) {
        return NextResponse.json("User ID is missing. Please try again.", { status: 400 })
    }
    try {
        const user = await db.user.findUnique({
            where: {
                id: userId
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
            return NextResponse.json("No User Api", { status: 404 })
        }
        const userRole = user.subscriptions[0].userRole
        return NextResponse.json(userRole, { status: 200 })
    } catch (error) {
        console.error("Error fetching user workspaces:", error);
        return NextResponse.json(
            { error: "Failed to fetch workspaces. Please try again later." },
            { status: 500 }
        );
    }
}