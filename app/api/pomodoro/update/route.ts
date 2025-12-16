import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { pomodoroSettingsSchema } from "@/schema/pomodoroSettingsSchema";
import { updateTaskContentSchema } from "@/schema/updateTaskSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400 });
    }

    const body = await request.json();

    const result = pomodoroSettingsSchema.safeParse(body);
    if (!result.success) {
        return new NextResponse("Invalid payload", { status: 401 });
    }

    const { workDuration,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
        rounds } = result.data;

    try {
        // Check permissions
        const user = await db.user.findUnique({
            where: { id: session.user.id },
            include: {
                pomodoroSettings: {
                    select: {
                        userId: true,
                        id: true
                    }
                }
            },
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        const pomodoro = user.pomodoroSettings.find(
            (settings) => settings.userId === user.id
        )

        if (!pomodoro) {
            return new NextResponse("pomodoro not found", { status: 404 });
        }

        await db.pomodoroSettings.update({
            where: { id: pomodoro.id },
            data: { workDuration, shortBreakDuration, longBreakDuration, longBreakInterval, rounds },
        });

        return NextResponse.json("OK", { status: 200 });
    } catch (error) {
        console.error("Error updating task date:", error);
        return new NextResponse("Server error", { status: 500 });
    }
}
