import { db } from "@/lib/db";
import { StarredItem } from "@/types/saved";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const sort = searchParams.get("sort");

  const ascending = sort === "asc";

  if (!userId) {
    return NextResponse.json("ERRORS.WRONG_DATA", { status: 400 });
  }

  try {
    // Query savedMindMaps and savedTask directly instead of going through db.user.findUnique
    // with deep nested includes — avoids loading the full user row
    const [savedMindMapsRows, savedTaskRows] = await Promise.all([
      db.savedMindMaps.findMany({
        where: { userId },
        include: {
          mindMap: {
            select: {
              id: true,
              title: true,
              emoji: true,
              updatedAt: true,
              updatedBy: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  surname: true,
                  image: true,
                },
              },
              workspace: {
                select: { id: true, name: true },
              },
            },
          },
        },
      }),
      db.savedTask.findMany({
        where: { userId },
        include: {
          task: {
            select: {
              id: true,
              title: true,
              emoji: true,
              updatedAt: true,
              updatedBy: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  surname: true,
                  image: true,
                },
              },
              workspace: {
                select: { id: true, name: true },
              },
            },
          },
        },
      }),
    ]);

    //@ts-ignore
    const mindMaps: StarredItem[] = savedMindMapsRows
      .filter((e) => e.mindMap)
      .map((e) => ({
        id: `mindMap-${e.mindMap.id}`,
        itemId: e.mindMap.id,
        type: "mindMap",
        link: `/dashboard/workspace/${e.mindMap.workspace.id}/mind_maps/mind_map/${e.mindMap.id}`,
        title: e.mindMap.title,
        emoji: e.mindMap.emoji,
        workspaceName: e.mindMap.workspace.name,
        updated: {
          at: e.mindMap.updatedAt,
          by: e.mindMap.updatedBy,
        },
      }));

    //@ts-ignore
    const tasks: StarredItem[] = savedTaskRows
      .filter((e) => e.task)
      .map((e) => ({
        id: `task-${e.task.id}`,
        itemId: e.task.id,
        type: "task",
        link: `/dashboard/workspace/${e.task.workspace.id}/tasks/task/${e.task.id}`,
        title: e.task.title,
        emoji: e.task.emoji,
        workspaceName: e.task.workspace.name,
        updated: {
          at: e.task.updatedAt,
          by: e.task.updatedBy,
        },
      }));

    const mergedMap = new Map<string, StarredItem>();
    [...mindMaps, ...tasks].forEach((item) => mergedMap.set(item.id, item));

    const sorted = Array.from(mergedMap.values()).sort((a, b) =>
      compareDates(a, b, ascending)
    );

    return NextResponse.json(sorted, { status: 200 });
  } catch (error) {
    console.error("STARRED_GET_ERROR", error);
    return NextResponse.json("ERRORS.DB_ERROR", { status: 500 });
  }
};

function compareDates(
  a: StarredItem,
  b: StarredItem,
  ascending: boolean
): number {
  const factor = ascending ? 1 : -1;
  return (
    factor *
    (new Date(a.updated.at).getTime() - new Date(b.updated.at).getTime())
  );
}
