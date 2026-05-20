import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { newTaskSchema } from "@/schema/newTaskSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = newTaskSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId } = result.data;

    try {
        // Lightweight permission check via Subscription table
        const subscription = await db.subscription.findFirst({
            where: {
                userId: session.user.id,
                workspaceId,
            },
            select: { userRole: true },
        });

        if (!subscription) {
            return new NextResponse("Not a member", { status: 404 })
        }

        if (subscription.userRole === "CAN_EDIT" || subscription.userRole === "READ_ONLY") {
            return NextResponse.json("You don't have permission to create tasks", { status: 403 })
        }

        // Single query: nested create for task + date
        const task = await db.task.create({
            data: {
                title: "",
                creator: { connect: { id: session.user.id } },
                workspace: { connect: { id: workspaceId } },
                updatedBy: { connect: { id: session.user.id } },
                date: {
                    create: {}
                }
            }
        })

        return NextResponse.json(task, { status: 200 })
    } catch (error) {
        console.error("Error creating task:", error)
        return new NextResponse("Server error", { status: 500 })
    }
}