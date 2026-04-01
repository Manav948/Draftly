import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    const workspaceId = url.searchParams.get("workspaceId")

    if (!userId || !workspaceId) {
        return NextResponse.json("User ID is missing. Please try again.", { status: 400 })
    }
    try {
        // Query subscription directly — no need to join through the user table
        const subscription = await db.subscription.findFirst({
            where: { userId, workspaceId },
            select: { userRole: true },
        })

        if (!subscription) {
            return NextResponse.json("No subscription found", { status: 404 })
        }
        return NextResponse.json(subscription.userRole, { status: 200 })
    } catch (error) {
        console.error("Error fetching user role:", error);
        return NextResponse.json(
            { error: "Failed to fetch user role. Please try again later." },
            { status: 500 }
        );
    }
}