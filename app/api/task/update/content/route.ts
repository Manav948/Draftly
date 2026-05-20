import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { updateTaskContentSchema } from "@/schema/updateTaskSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await getAuthSession();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  const body = await request.json();

  const result = updateTaskContentSchema.safeParse(body);
  if (!result.success) {
    return new NextResponse("Invalid payload", { status: 401 });
  }

  const { workspaceId, taskId, content } = result.data;

  try {
    // Single lightweight permission check via Subscription table
    const subscription = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        workspaceId,
      },
      select: { userRole: true },
    });

    if (!subscription || subscription.userRole === "READ_ONLY") {
      return new NextResponse("No permission", { status: 403 });
    }

    // Direct update — no need to fetch the task first
    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: { updatedUserId: session.user.id, content },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error updating task content:", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
