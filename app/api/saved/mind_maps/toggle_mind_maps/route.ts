import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import z from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const minMapSchema = z.object({
        mindMapId: z.string()
    })
    const body: unknown = await request.json();

    const result = minMapSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { mindMapId } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                savedMindMaps : true
            }
        })

        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        const existSavedMindMap = user.savedMindMaps.find((task) => task.id === mindMapId)

        if (existSavedMindMap) {
            await db.savedTask.delete({
                where: {
                    id: existSavedMindMap.id
                }
            })
        } else {
            await db.savedMindMaps.create({
                data: {
                    user: {
                        connect: { id: session.user.id }
                    },
                    mindMap: {
                        connect: { id: mindMapId }
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