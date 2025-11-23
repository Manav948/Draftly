import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import TaskContainer from '@/components/tasks/container/TaskContainer'
import NewTask from '@/components/tasks/newTask/NewTask'
import { getWorkspace, getWorkspaceRole } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
    params: Promise<{ workspace_id: string, task_id: string }>
}

const Tasks = async ({ params }: Params) => {
    const { workspace_id, task_id } = await params

    const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}/task/task/${task_id}`)
    const [workspace, userRole] = await Promise.all([getWorkspace(workspace_id, session.user.id), getWorkspaceRole(workspace_id, session.user.id)])
    return (
        <>
            <DashboardHeader addManualRoutes={["dashboard", workspace.name]} >
                {(userRole === "ADMIN" || userRole === "OWNER") && (
                    <InviteUsers workspace={workspace} />
                )}
            </DashboardHeader>
            <main className="flex flex-col gap-2">
                <TaskContainer
                    workspaceId={workspace_id}
                    taskId={task_id}
                    initialActiveTags={[]} />
            </main>
        </>
    )
}

export default Tasks
