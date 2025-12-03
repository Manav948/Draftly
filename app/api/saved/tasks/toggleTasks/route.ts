import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { newTaskSchema } from "@/schema/newTaskSchema";
import { updateTaskSchema } from "@/schema/updateTaskSchema";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const taskSchema = z.object({
        taskId: z.string()
    })
    const body: unknown = await request.json();

    const result = taskSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { taskId } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                savedTask: true
            }
        })

        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        const existSavedTask = user.savedTask.find((task) => task.id === taskId)

        if (existSavedTask) {
            await db.savedTask.delete({
                where: {
                    id: existSavedTask.id
                }
            })
        } else {
            await db.savedTask.create({
                data: {
                    user: {
                        connect: { id: session.user.id }
                    },
                    task: {
                        connect: { id: taskId }
                    }

                }
            })
        }
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}