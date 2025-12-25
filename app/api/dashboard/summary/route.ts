import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const [
    totalTasks,
    workspaces,
    starred,
    assigned,
    recentActivity,
  ] = await Promise.all([
    db.task.count({ where: { creatorId: userId } }),
    db.workspace.count({ where: { Subscribers: { some: { userId } } } }),
    db.savedTask.count({ where: { userId } }),
    db.assignedToTask.count({ where: { userId } }),
    db.task.findMany({
      where: { updatedBy: { id: userId } },
      orderBy: { updatedAt: "desc" },
      take: 5,
      include: { workspace: true },
    }),
  ])

  return NextResponse.json({
    stats: {
      totalTasks,
      workspaces,
      starred,
      assigned,
    },
    recentActivity,
  })
}
