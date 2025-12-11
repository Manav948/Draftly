import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async (request: Request,) => {
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")

    if (!workspaceId) {
        return NextResponse.json("No Workspace Found", { status: 404 })
    }
    try {
        const workspaceShortCuts = await db.workspace.findUnique({
            where: {
                id: workspaceId,
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
                        title : true
                    }
                }
            }
        })
        if (!workspaceShortCuts) {
            return NextResponse.json("WorkspaceShortcuts not found", { status: 200 })
        }
        return NextResponse.json({ tasks: workspaceShortCuts.Task,mindMaps : workspaceShortCuts.mindMaps }, { status: 202 })
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}