import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")
    if (!userId) {
        return NextResponse.json("User id not found", { status: 404 })
    }
    try {
        let pomodoroSettings = await db.pomodoroSettings.findFirst({
            where: {
                userId: userId
            }
        })

        return NextResponse.json(pomodoroSettings, { status: 200 })
    } catch (err) {
        console.error("Pomodoro settings error:", err)
        return NextResponse.json("Error during db connection", { status: 500 })
    }
}