import { ExtendedMindMap, ExtendedTask, SettingsWorkspace } from "@/types/extended"
import { PomodoroSettings, UserPermission, Workspace } from "@prisma/client"
import { notFound } from "next/navigation"
import { db } from "./db"

// ─── NOTE ─────────────────────────────────────────────────────────────────────
// These helpers are only called from Server Components / Route Handlers.
// Instead of HTTP round-trips to our own API routes we query the DB directly.
// This removes 1–3 s of latency per call that was caused by the extra HTTP hop.
// ─────────────────────────────────────────────────────────────────────────────

export const domain =
  process.env.NODE_ENV !== "production" ? "http://localhost:3000" : "https://draftly.manavvalani.in"

export const getWorkspace = async (workspace_id: string, userId: string) => {
  const workspace = await db.workspace.findUnique({
    where: {
      id: workspace_id,
      Subscribers: { some: { userId } },
    },
  })
  if (!workspace) return notFound()
  return workspace as Workspace
}

export const getWorkspaces = async (userId: string) => {
  const subscriptions = await db.subscription.findMany({
    where: { userId },
    include: { workspace: true },
  })
  return subscriptions.map((s) => s.workspace) as Workspace[]
}

export const getUserAdminWorkspaces = async (userId: string) => {
  const subscriptions = await db.subscription.findMany({
    where: {
      userId,
      OR: [{ userRole: "ADMIN" }, { userRole: "OWNER" }],
    },
    include: { workspace: true },
  })
  return subscriptions.map((s) => s.workspace) as Workspace[]
}

export const getWorkspaceSettings = async (workspace_id: string, userId: string) => {
  const workspace = await db.workspace.findUnique({
    where: {
      id: workspace_id,
      Subscribers: { some: { userId } },
    },
    include: {
      Subscribers: {
        include: { user: true },
      },
    },
  })
  if (!workspace) return notFound()
  return workspace as unknown as SettingsWorkspace
}

export const getWorkspaceRole = async (workspace_id: string, userId: string) => {
  const subscription = await db.subscription.findFirst({
    where: { workspaceId: workspace_id, userId },
    select: { userRole: true },
  })
  return subscription?.userRole as UserPermission | null
}

export const getTask = async (task_id: string, userId: string) => {
  const task = await db.task.findUnique({
    where: { id: task_id, creatorId: userId },
    include: {
      workspace: true,
      Tag: true,
      date: true,
      assignedToTasks: { include: { user: true } },
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          surname: true,
          image: true
        }
      },
      updatedBy: {
        select: {
          id: true,
          name: true,
          username: true,
          surname: true,
          image: true
        }
      }
    },
  })
  if (!task) return notFound()
  return {
    ...task,
    tags: task.Tag,
  } as unknown as ExtendedTask
}

export const getMindMap = async (mind_map_id: string) => {
  const mindMap = await db.mindMap.findUnique({
    where: { id: mind_map_id },
    include: {
      workspace: true,
      tags: true,
      assignedToMindMaps: { include: { user: true } },
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          surname: true,
          image: true
        }
      },
      updatedBy: {
        select: {
          id: true,
          name: true,
          username: true,
          surname: true,
          image: true
        }
      }
    },
  })
  if (!mindMap) return notFound()
  return mindMap as unknown as ExtendedMindMap
}

export const getPomodoro = async (userId: string) => {
  const pomodoro = await db.pomodoroSettings.findFirst({
    where: { userId },
  })
  return pomodoro as PomodoroSettings | null
}