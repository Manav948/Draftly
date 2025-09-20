import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = z.object({
        profileImage: z.string(),
    }).safeParse(body);

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { profileImage } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        const updateUser = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                image: profileImage
            }
        })
        return NextResponse.json(updateUser, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}