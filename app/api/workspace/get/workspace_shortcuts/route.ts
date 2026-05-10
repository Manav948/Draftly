import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const GET = async (request: Request,) => {
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
        return NextResponse.json("Unauthorized", { status: 401 })
    }
    const userId = session.user.id

    if (!workspaceId) {
        return NextResponse.json("No Workspace Found", { status: 404 })
    }
    try {
        const workspaceShortCuts = await db.workspace.findUnique({
            where: {
                id: workspaceId,
                Subscribers: { some: { userId } }
            },
            include: {
                Task: {
                    select: {
                        id: true,
                        title: true,
                        emoji: true
                    }
                },
                mindMaps : {
                    select : {
                        id : true,
                        title : true,
                        emoji : true
                    }
                }
            }
        })
        if (!workspaceShortCuts) {
            return NextResponse.json("WorkspaceShortcuts not found", { status: 200 })
        }
        return NextResponse.json({ tasks: workspaceShortCuts.Task, mindMaps: workspaceShortCuts.mindMaps }, { status: 200 })
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}