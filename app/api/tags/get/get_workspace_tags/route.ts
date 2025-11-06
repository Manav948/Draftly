import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const workspaceId = url.searchParams.get("workspaceId")

    if (!workspaceId) {
        return NextResponse.json("There is no Workspace,Try again", { status: 404 })
    }

    try {
        const tags = await db.tag.findMany({
            where: {
                workspaceId,
            }
        })

        if (!tags) {
            return NextResponse.json("Tag not Found, Please Try again", { status: 401 })
        }
        return NextResponse.json([], { status: 200 })
    } catch (_) {
        return NextResponse.json("SomeThing Went Wrong in database, try sometime latter", { status: 404 })
    }
}