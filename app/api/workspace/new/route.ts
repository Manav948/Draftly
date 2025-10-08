import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiWorkspaceSchema } from "@/schema/workSpaceSchema";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = apiWorkspaceSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { workspaceName, file } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
            include: {
                createdWorkspaces: {
                    select: {
                        id: true,
                        name: true
                    }
                }

            }
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        const theSameWorkspace = user.createdWorkspaces.find(
            (workspace) => workspace.name.toLowerCase() === workspaceName.toLowerCase()
        );

        if (theSameWorkspace) {
            return new NextResponse("Same WorkSpace Name Try something another one", { status: 403 })
        }

        const workspace = await db.workspace.create({
            data: {
                creatorId: user.id,
                name: workspaceName,
                image: file
            }
        })
        return NextResponse.json(workspace, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}