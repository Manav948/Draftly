import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { mindMapSchema } from "@/schema/mindMapSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();
    const result = mindMapSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId, mindMapId, content } = result.data;    

    try {
        // Single lightweight permission check via Subscription table
        const subscription = await db.subscription.findFirst({
            where: {
                userId: session.user.id,
                workspaceId,
            },
            select: { userRole: true },
        });

        if (!subscription) {
            return new NextResponse("No permission", { status: 403 })
        }

        // Direct update — Prisma will throw if mindMapId doesn't exist
        const updatedMindMap = await db.mindMap.update({
            where: { id: mindMapId },
            data: {
                updatedUserId: session.user.id,
                content
            }
        })
        return NextResponse.json(updatedMindMap, { status: 200 })
    } catch (error) {
        console.error("Error updating mind map:", error)
        return new NextResponse("Server error", { status: 500 })
    }
}