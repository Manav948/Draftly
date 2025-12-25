import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import LeaveWorkspace from '@/components/leaveworkspace/LeaveWorkspace'
import WorkspaceContainer from '@/components/workspace/WorkspaceContainer'
import { getWorkspace, getWorkspaceRole, getWorkspaces } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
  params: Promise<{ workspace_id: string }>
}

const page = async ({ params }: Params) => {
  const { workspace_id } = await params
  const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}`)
  const [workspace, userRole,] = await Promise.all([getWorkspace(workspace_id, session.user.id), getWorkspaceRole(workspace_id, session.user.id)])
  const [userWorkspaces] = await Promise.all([getWorkspaces(session.user.id)])
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
        }
      ]} >
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
        {(userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />)}
      </DashboardHeader>
      <main className="flex flex-col gap-2 h-full">
        <WorkspaceContainer
          userId={session.user.id}
          workspaceId={workspace.id}
          userWorkspace={userWorkspaces}
          href='/dashboard/workspace'
          workspace={workspace}
        />
      </main>
    </>
  )
}

export default page
