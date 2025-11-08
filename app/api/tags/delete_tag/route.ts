import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiTagSchema, deleteTagScheam } from "@/schema/TagSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new NextResponse("Unauthorized User", { status: 401 });
        }

        const body = await request.json();
        const result = deleteTagScheam.safeParse(body);

        if (!result.success) {
            return NextResponse.json("Invalid tag inputs", { status: 400 });
        }

        const { id, workspaceId } = result.data;


        const subscription = await db.subscription.findFirst({
            where: {
                userId: session.user.id,
                workspaceId: workspaceId,
            },
        });

        if (!subscription) {
            return new NextResponse("Workspace subscription not found", { status: 404 });
        }

        if (subscription.userRole !== "OWNER") {
            return new NextResponse("You don't have permission to create a tag", {
                status: 403,
            });
        }

        const workspace = await db.workspace.findUnique({
            where: { id: workspaceId },
            include: {
                tags: {
                    where: {
                        workspaceId
                    },
                    select: {
                        name: true
                    }
                }
            }
        });

        if (!workspace) {
            return new NextResponse("Workspace not found", { status: 404 });
        }

        const tag = await db.tag.findUnique({
            where: {
                id
            }
        })

        if (!tag) {
            return NextResponse.json("Tag not Found.", { status: 401 })
        }

        const deleteTag = await db.tag.delete({
            where: {
                id
            },
        });

        return NextResponse.json(deleteTag, { status: 200 });

    } catch (error) {
        console.log("Route Error:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
