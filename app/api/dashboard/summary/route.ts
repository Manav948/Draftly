import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { ratelimit } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  // Rate limiting (IP-based, fallback to generic if IP is missing)
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
  try {
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 })
    }
  } catch (err) {
    // Redis might fail if not configured, fallback gracefully or let it pass
    console.warn("Rate limit check failed, likely missing Redis env vars", err)
  }

  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  const [
    totalTasks,
    workspaces,
    starred,
    assigned,
    recentActivityRaw,
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

  // Transform null emoji to undefined for type compatibility
  const recentActivity = recentActivityRaw.map(item => ({
    ...item,
    emoji: item.emoji ?? undefined,
  }))

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
