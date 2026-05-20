import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { onboardingSchema } from "@/schema/onboardingSchema";
import { UseCase as UseCaseType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getAuthSession();

    if (!session?.user) {
        return new NextResponse("Unauthorized", { status: 400, statusText: "Unauthorized User" })
    }
    const body: unknown = await request.json();

    const result = onboardingSchema.safeParse(body)

    if (!result.success) {
        return new NextResponse("Something went wrong", { status: 401 })
    }

    const { useCase, workspaceName, name, surname, workspaceImage } = result.data
    try {
        // Single transaction: all writes succeed or all fail, fewer round-trips
        await db.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({
                where: { id: session.user.id },
                data: {
                    completeOnboarding: true,
                    name,
                    surname,
                    useCase: useCase as UseCaseType,
                },
            });

            // Nested create: workspace + subscription in one query
            await tx.workspace.create({
                data: {
                    creatorId: updatedUser.id,
                    name: workspaceName,
                    image: workspaceImage,
                    Subscribers: {
                        create: {
                            userId: updatedUser.id,
                            userRole: "OWNER",
                        },
                    },
                },
            });

            await tx.pomodoroSettings.create({
                data: { userId: updatedUser.id },
            });
        });

        return NextResponse.json("OK", { status: 200 })
    } catch (error) {
        console.error("Error during onboarding:", error)
        return new NextResponse("Error during onboarding", { status: 500 })
    }
}