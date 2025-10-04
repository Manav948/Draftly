import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { changePasswordSchema } from "@/schema/changePasswordSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = changePasswordSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }
    const { new_password, current_password } = result.data;

    try {
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        if (!user) {
            return new NextResponse("User Not Found", { status: 404, statusText: "User not Found" })
        }

        if (!user.hashedPassword) return new NextResponse("User have no Password", { status: 406 })

        const passwordMatch = await bcrypt.compare(current_password, user.hashedPassword)

        if (!passwordMatch) {
            return new NextResponse("Password Mismatch", { status: 402 })
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);

        const updateUser = await db.user.update({
            where: {
                id: session.user.id
            },
            data: {
                hashedPassword,
            }
        })
        return NextResponse.json(updateUser, { status: 200 })
    } catch (error) {
        console.log("Error in db connection : ", error)
        return new NextResponse("Error during db connection", { status: 405 })
    }
}