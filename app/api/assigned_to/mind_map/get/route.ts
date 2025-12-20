import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")
    const mindMapId = url.searchParams.get("mindMapId")

    if (!workspaceId || !mindMapId) {
        return NextResponse.json("Workspace and task not found", { status: 404 })
    }
    try {

        const user = await db.workspace.findUnique({
            where: {
                id: workspaceId
            },
            include: {
                Subscribers: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                image: true,
                                assignedToMindMaps: {
                                    where: {
                                        mindMapId
                                    },
                                    select: {
                                        userId: true
                                    },
                                }
                            }
                        }
                    }
                }
            }
        })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}