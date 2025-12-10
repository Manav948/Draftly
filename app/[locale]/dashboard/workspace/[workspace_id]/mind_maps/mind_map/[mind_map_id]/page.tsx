import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import MindMaps from '@/components/mindMaps/MindMaps'
import { SaveTaskStateProvider } from '@/context/TaskSavingContext'
import { getMindMap, getWorkspace, getWorkspaceRole } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
  params: Promise<{ mind_map_id: string, workspace_id: string }>
}

const MindMapPage = async ({ params }: Params) => {
  const { mind_map_id, workspace_id } = await params

  const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}/mind_maps/mind_map/${mind_map_id}`)
  const [workspace, userRole, mindMap] = await Promise.all(
    [getWorkspace(workspace_id, session.user.id),
    getWorkspaceRole(workspace_id, session.user.id),
    getMindMap(mind_map_id, session.user.id)])

  console.log("MindMap id : ", mind_map_id)
  console.log("MindMap : ", mindMap)
  return (
    <SaveTaskStateProvider>
      <DashboardHeader>
        {(userRole === "ADMIN" || userRole === "OWNER") && (
          <InviteUsers workspace={workspace} />
        )}
      </DashboardHeader>

      <main className="flex flex-col gap-2 h-full">
        <MindMaps initialInfo={mindMap} workspaceId={workspace_id} />
      </main>
    </SaveTaskStateProvider>
  )
}

export default MindMapPage
