import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import { getWorkspace, getWorkspaceRole } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
  params: Promise<{ workspace_id: string }>
}

const page = async ({ params }: Params) => {
  const { workspace_id } = await params

  const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}`)
  const [workspace, userRole] = await Promise.all([getWorkspace(workspace_id, session.user.id), getWorkspaceRole(workspace_id, session.user.id)])

  console.log("user Role = ",userRole)
  return (
    <>
      <DashboardHeader addManualRoutes={["dashboard", workspace.name]} >
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
      </DashboardHeader>
      <main className="flex flex-col gap-2">
        {workspace.name}
      </main>
    </>
  )
}

export default page
