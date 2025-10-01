import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { accountInfoSettingsSchema } from "@/schema/AccountInfoSettingsSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body: unknown = await request.json();
    const result = accountInfoSettingsSchema.safeParse(body);

    if (!result.success) {
        return new NextResponse("Invalid data", { status: 400 });
    }

    const { username, name, surname, language } = result.data;

    try {
        const existingUser = await db.user.findUnique({ where: { username } });
        if (existingUser && existingUser.id !== session.user.id) {
            return new NextResponse("Username already taken", { status: 409 });
        }

        const updatedUser = await db.user.update({
            where: { id: session.user.id },
            data: { name, surname, username, language },
        });

        return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("DB update error:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}
