import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    if (!userId) {
        return NextResponse.json("User id not found", { status: 404 })
    }
    try {
        const pomodoroSettings = await db.pomodoroSettings.findFirst({
            where: {
                userId: userId
            }
        })
        if (!pomodoroSettings) {
            return NextResponse.json("Pomodoro Not Found", { status: 404 })
        }
        return NextResponse.json(pomodoroSettings, { status: 200 })
    } catch (err) {
        return NextResponse.json("Error during db connection", { status: 405 })
    }
}