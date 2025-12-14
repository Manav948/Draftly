import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { mindMapSchema, updateMindMapSchema, updateTaskAndEmojiSchema } from "@/schema/mindMapSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();
    const result = updateTaskAndEmojiSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceId, mapId , icon , title } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                subscriptions: {
                    where: {
                        workspaceId: workspaceId
                    },
                    select: {
                        userRole: true
                    }
                }
            }
        })

        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        const mindmap = await db.mindMap.findUnique({
            where: {
                id: mapId
            },
        })

        if (!mindmap) {
            return NextResponse.json("mindmap not Found", { status: 403 })
        }

        const updatedMindMap = await db.mindMap.update({
            where: {
                id: mindmap.id
            },
            data : {
                updatedUserId : session.user.id,
                emoji : icon,
                title
            }
        })
        return NextResponse.json(updatedMindMap, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}