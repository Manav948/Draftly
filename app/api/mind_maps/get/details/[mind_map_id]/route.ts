import { db } from "@/lib/db"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{
        mind_map_id: string;
    }>
}

export const GET = async (request: Request, { params }: Params) => {
    const {mind_map_id} = await params
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json("Error in user api function", { status: 404 })
    }
    try {
        const mindMap = await db.mindMap.findUnique({
           where :{
            id : mind_map_id
           }
        })
        if (!mindMap) {
            return NextResponse.json("mindMap not found", { status: 200 })
        }
        return NextResponse.json({mindMap}, { status: 202 })
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}