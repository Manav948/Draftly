import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { deleteAccountSchema } from "@/schema/deleteAccountSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }

    const { email: userEmail } = session.user
    const body: unknown = await request.json()
    const result = deleteAccountSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json("Your Email is not Match Enter correct one", { status: 401 })
    }

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        await db.user.delete({
            where: {
                id: session.user.id
            },
        })
        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}