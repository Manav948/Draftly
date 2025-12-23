import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import LeaveWorkspace from '@/components/leaveworkspace/LeaveWorkspace'
import ReadOnlyContent from '@/components/tasks/readOnly/ReadOnlyContent'
import { getTask, getWorkspace, getWorkspaceRole } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
    params: Promise<{ workspace_id: string, task_id: string }>
}

const Tasks = async ({ params }: Params) => {
    const { workspace_id, task_id } = await params

    const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}/task/task/${task_id}`)
    const [workspace, userRole, task] = await Promise.all([getWorkspace(workspace_id, session.user.id), getWorkspaceRole(workspace_id, session.user.id), getTask(task_id, session.user.id)])
    const isSavedByUser = task?.savedTask?.some((s) => s.userId === session.user.id) ?? false;
    return (
        <>
            <DashboardHeader addManualRoutes={[
                {
                    name: "DASHBOARD",
                    href: "/dashboard",
                    useTranslate: true
                },
                {
                    name: workspace.name,
                    href: `/dashboard/workspace/${workspace_id}`
                },
                {
                    name: `${task?.emoji} ${task?.title}`,
                    href: "/"
                }
            ]} >
                {(userRole === "ADMIN" || userRole === "OWNER") && (
                    <InviteUsers workspace={workspace} />
                )}
                {(userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />)}
            </DashboardHeader>
            <main className="flex flex-col gap-2">
                <ReadOnlyContent
                    userRole={userRole}
                    task={task}
                    isSavedByUser={isSavedByUser}
                    workspaceId={workspace_id}
                />

            </main>
        </>
    )
}

export default Tasks
