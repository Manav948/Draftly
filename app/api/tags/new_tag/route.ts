import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { apiTagSchema } from "@/schema/TagSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }

    const body = await request.json();
    const result = apiTagSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json("Invalid tag inputs", { status: 400 });
    }

    const { id, color, workspaceId, tagName } = result.data;

    const subscription = await db.subscription.findFirst({
      where: {
        userId: session.user.id,
        workspaceId: workspaceId,
      },
    });

    if (!subscription) {
      return new NextResponse("Workspace subscription not found", { status: 404 });
    }

    if (subscription.userRole !== "OWNER" ) {
      return new NextResponse("You don't have permission to create a tag", {
        status: 403,
      });
    }

    const workspace = await db.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        tags: {
          where: { workspaceId },
          select: { name: true },
        },
      },
    });

    if (!workspace) {
      return new NextResponse("Workspace not found", { status: 404 });
    }

    const tagExist = workspace.tags.find(
      (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
    );

    if (tagExist) {
      return NextResponse.json(
        "Tag name already exists. Try another name.",
        { status: 405 }
      );
    }

    const newTag = await db.tag.create({
      data: {
        id,
        workspaceId,
        name: tagName,
        color,
      },
    });

    return NextResponse.json(newTag, { status: 200 });

  } catch (error) {
    console.log("Route Error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
