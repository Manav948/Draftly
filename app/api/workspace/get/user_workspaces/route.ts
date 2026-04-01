import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json("User ID is missing. Please try again.", { status: 400 })
    }
    try {
        const subscriptions = await db.subscription.findMany({
            where: { userId },
            include: { workspace: true },
        })

        const workspaces = subscriptions.map((subscription) => subscription.workspace)
        return NextResponse.json(workspaces, { status: 200 })
    } catch (error) {
        console.error("Error fetching user workspaces:", error);
        return NextResponse.json(
            { error: "Failed to fetch workspaces. Please try again later." },
            { status: 500 }
        );
    }
}