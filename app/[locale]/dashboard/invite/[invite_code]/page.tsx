import { checkIfUserCompletedOnboarding } from "@/lib/checkIfUserCompletedOnboarding";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { use } from "react";

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

    if (role !== "admin" && role !== "editor" && role !== "viewer") {
        redirect("/dashboard/error?error=invalid-role")
    }

    let inviteCodeValidWhere: inviteCodeValidWhere = {
        inviteCode: invite_code
    }

    switch (role) {
        case "admin": {
            inviteCodeValidWhere = {
                ...inviteCodeValidWhere,
                adminCode: shareCode as string
            };
            break;
        }
        case "editor": {
            inviteCodeValidWhere = {
                ...inviteCodeValidWhere,
                canEditCode: shareCode as string
            };
            break;
        }
        case "viewer": {
            inviteCodeValidWhere = {
                ...inviteCodeValidWhere,
                readOnlyCode: shareCode as string
            };
            break;
        }
        default:
            return redirect("/dashboard/error?error=invalid-role")
    }

    const inviteCodeValid = await db.workspace.findUnique({
        where: {
            ...inviteCodeValidWhere
        }
    })

    if (!inviteCodeValid) {
        redirect("/dashboard/error?error=outdated-invalid-invite")
    }

    const existingWorkspace = await db.workspace.findUnique({
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


    const userRole = () => {
        switch (role) {
            case "admin":
                return "ADMIN"
            case "editor":
                return "CAN_EDIT"
            case "viewer":
                return "READ_ONLY"
            default:
                return redirect("/dashboard/error?error=invalid-role");
        }
    }
    await db.subscription.create({
        data: {
            userId: session.user.id,
            workspaceId: inviteCodeValid.id,
            userRole: userRole()
        }
    })

    redirect(`/dashboard/workspace/${inviteCodeValid.id}`)
}

export default Workspace
