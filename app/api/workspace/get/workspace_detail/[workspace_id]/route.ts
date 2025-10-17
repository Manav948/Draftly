import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface Params {
    params: {
        workspace_id: string;
    }
}

export const GET = async (request: Request, { params: { workspace_id } }: Params) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json("Error in user api function", { status: 404 })
    }
    try {
        const workspace = await db.workspace.findUnique({
            where: {
                id: workspace_id,
                Subscribers: {
                    some: {
                        userId
                    }
                }
            }
        })
        if (!workspace) {
            return NextResponse.json("Workspace not found", { status: 200 })
        }
        return NextResponse.json(workspace, { status: 202 })
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}