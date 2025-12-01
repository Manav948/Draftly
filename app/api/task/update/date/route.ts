import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateTaskSchema } from "@/schema/updateTaskSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  const body = await request.json();

  const result = updateTaskSchema.safeParse(body);
  if (!result.success) {
    return new NextResponse("Invalid payload", { status: 401 });
  }

  const { workspaceId, taskId, date } = result.data;

  try {
    // Permission check
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        subscriptions: {
          where: { workspaceId },
          select: { userRole: true },
        },
      },
    });

    if (!user) return new NextResponse("User not found", { status: 404 });

    const role = user.subscriptions[0]?.userRole;
    if (role === "CAN_EDIT" || role === "READ_ONLY") {
      return new NextResponse("No permission", { status: 403 });
    }

    const task = await db.task.findUnique({
      where: { id: taskId },
      include: { date: true },
    });

    if (!task) {
      return new NextResponse("Task not found", { status: 404 });
    }

    // ✅ FIXED create/update logic
    if (task.date?.id) {
      await db.date.update({
        where: { id: task.date.id },
        data: {
          from: date?.from
            ? new Date(date.from).toISOString()
            : null,
          to: date?.to
            ? new Date(date.to).toISOString()
            : null,
        },
      });
    } else {
      await db.date.create({
        data: {
          from: date?.from
            ? new Date(date.from).toISOString()
            : null,
          to: date?.to
            ? new Date(date.to).toISOString()
            : null,
          Task: {
            connect: { id: taskId },
          },
        },
      });
    }

    // Touch task update
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        updatedUserId: session.user.id,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task date:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
