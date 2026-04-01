import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

interface Params {
    params: Promise<{
        task_id: string;
    }>
}

export const GET = async (request: Request, { params }: Params) => {
    const { task_id } = await params
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    if (!userId) {
        return NextResponse.json("Error in user api function", { status: 404 })
    }
    try {
        const task = await db.task.findUnique({
            where: {
                id: task_id,
            },
            select: {
                id: true,
                title: true,
                Tag: true,
                date: true,
                emoji: true,
                content: true,
                savedTask: true,
                creator: {
                    select: {
                        id: true,
                        username: true,
                        image: true,
                        name: true,
                        surname: true
                    }
                },
                updatedBy: {
                    select: {
                        id: true,
                        username: true,
                        image: true,
                        name: true,
                        surname: true
                    }
                }
            },
        })
        if (!task) {
            return NextResponse.json("Task not found", { status: 404 })
        }
        return NextResponse.json({ ...task, tags: task.Tag }, { status: 200 })
    } catch (error) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}