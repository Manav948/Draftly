import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json("User ID is missing. Please try again.", { status: 400 })
    }
    try {
        const workspace = await db.workspace.findMany({
            where: {
                creatorId: userId
            }
        })
        if (!workspace || workspace.length === 0) {
            return NextResponse.json([], { status: 200 })
        }
        return NextResponse.json(workspace, { status: 202 })
    } catch (error) {
        console.error("Error fetching user workspaces:", error);
        return NextResponse.json(
            { error: "Failed to fetch workspaces. Please try again later." },
            { status: 500 }
        );
    }
}