import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateTaskActiveTagsSchema, updateTaskContentSchema } from "@/schema/updateTaskSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400 });
    }

    const body = await request.json();

    const result = updateTaskActiveTagsSchema.safeParse(body);
    if (!result.success) {
        return new NextResponse("Invalid payload", { status: 401 });
    }

    const { workspaceId, taskId, tagsId } = result.data;

    try {
        // Check permissions
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: {
                subscriptions: {
                    where: { workspaceId },
                    select: { userRole: true },
                },
            },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        // const role = user.subscriptions[0]?.userRole;
        // if (role === "CAN_EDIT" || role === "READ_ONLY") {
        //     return new NextResponse("No permission", { status: 403 });
        // }

        // Fetch task with date relation
        const task = await db.task.findUnique({
            where: { id: taskId },
            include: { date: true, Tag: true },
        });

        if (!task) {
            return new NextResponse("Task not found", { status: 404 });
        }


        // Update task metadata
        const updatedTask = await db.task.update({
            where: { id: taskId },
            data: {
                updatedUserId: session.user.id, 
                Tag: {
                    set : tagsId.map((id) => ({id}))
                }
            },
        });

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("Error updating task date:", error);
        return new NextResponse("Server error", { status: 500 });
    }
}
