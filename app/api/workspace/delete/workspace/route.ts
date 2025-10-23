import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiWorkspaceDelete } from "@/schema/workSpaceSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const body: unknown = await request.json()
    const result = apiWorkspaceDelete.safeParse(body);

    if (!result.success) {
        return NextResponse.json("Your Email is not Match Enter correct one", { status: 401 })
    }

    const { id, workspaceName } = result.data

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            },
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        const workspace = await db.workspace.findUnique({
            where: {
                id
            }
        })

        if (!workspace) {
            return new NextResponse("Workspace Not Found", { status: 404, statusText: "Workspace not Found" })
        }

        if (workspace.name !== workspaceName) {
            return NextResponse.json("Wrong Workspace name", { status: 403 })
        }
        await db.workspace.delete({
            where: {
                id
            }
        })
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}