import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface Params {
    params: {
        invite_code: string;
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

interface inviteCodeValidWhere {
    inviteCode: string,
    adminCode?: string,
    readOnlyCode?: string,
    canEditCode?: string
}

const Workspace = async ({ searchParams, params: { invite_code } }: Params) => {

    const session = await checkIfUserCompletedOnboarding(`/dashboard/invite/${invite_code}`)
    const role = searchParams.role as "editor" | "viewer" | "admin" | null | undefined;
    const shareCode = searchParams.shareCode

    if (!invite_code || !role || !shareCode) {
        redirect("/dashboard/error?error=no-data")
    }

    if (!["admin", "editor", "viewer"].includes(role)) {
        redirect("/dashboard/error?error=invalid-role")
    }

    let inviteCodeValidWhere: inviteCodeValidWhere = {
        inviteCode: invite_code
    }

    switch (role) {
        case "admin":
            inviteCodeValidWhere.adminCode = shareCode as string;
            break;
        case "editor":
            inviteCodeValidWhere.canEditCode = shareCode as string;
            break;
        case "viewer":
            inviteCodeValidWhere.readOnlyCode = shareCode as string;
            break;
        default:
            return redirect("/dashboard/error?error=invalid-role")
    }

    const inviteCodeValid = await db.workspace.findUnique({
        where: inviteCodeValidWhere
    })

    if (!inviteCodeValid) {
        redirect("/dashboard/error?error=outdated-invalid-invite")
    }

    const existingWorkspace = await db.workspace.findFirst({
        where: {
            inviteCode: invite_code,
            Subscribers: {
                some: {
                    userId: session.user.id
                }
            }
        }
    })

    if (existingWorkspace) {
        redirect(`/dashboard/workspace/${existingWorkspace.id}`)
    }


    const userRole =
        role === "admin" ? "ADMIN" : role === "editor" ? "CAN_EDIT" : "READ_ONLY";
        
    await db.subscription.create({
        data: {
            userId: session.user.id,
            workspaceId: inviteCodeValid.id,
            userRole
        }
    })

    redirect(`/dashboard/workspace/${inviteCodeValid.id}`)
}

export default Workspace
