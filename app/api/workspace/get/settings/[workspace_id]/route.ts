import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Props {
  params: Promise<{
    workspace_id: string;
  }>;
}

export const GET = async (request: Request, { params }: Props) => {
  const { workspace_id } = await params; // ✅ Await the params object

  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json("User ID is missing. Please try again.", {
      status: 400,
    });
  }

  try {
    const workspace = await db.workspace.findFirst({
      where: {
        id: workspace_id, // ✅ already awaited above
        Subscribers: {
          some: {
            userId,
          },
        },
      },
      include: {
        Subscribers: {
          select: {
            userRole: true,
            user: {
              select: {
                id: true,
                image: true,
                username: true,
              },
            },
          },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json("Workspace Not Found", { status: 404 });
    }

    return NextResponse.json(workspace, { status: 200 });
  } catch (error) {
    console.error("Error fetching user workspaces:", error);
    return NextResponse.json(
      { error: "Failed to fetch workspaces. Please try again later." },
      { status: 500 }
    );
  }
};
