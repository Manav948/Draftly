import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import MindMaps from '@/components/mindMaps/MindMaps'
import { SaveTaskStateProvider } from '@/context/TaskSavingContext'
import { AutoSaveMindMapProvider } from '@/context/AutoSaveMindMap'
import { getMindMap, getWorkspace, getWorkspaceRole } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import { redirect } from 'next/navigation'
import React from 'react'
import LeaveWorkspace from '@/components/leaveworkspace/LeaveWorkspace'

interface Params {
  params: Promise<{ mind_map_id: string; workspace_id: string }>
}

const EditMindMapPage = async ({ params }: Params) => {
  const { mind_map_id, workspace_id } = await params

  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}/mind_maps/mind_map/${mind_map_id}/edit`
  )

  const [workspace, userRole, mindMap] = await Promise.all([
    getWorkspace(workspace_id, session.user.id),
    getWorkspaceRole(workspace_id, session.user.id),
    getMindMap(mind_map_id, session.user.id)
  ])

  const canEdit = userRole === 'ADMIN' || userRole === 'OWNER'

  if (!canEdit) {
    return redirect(
      `/dashboard/workspace/${workspace_id}/mind_maps/mind_map/${mind_map_id}`
    )
  }

  return (
    <SaveTaskStateProvider>
      <AutoSaveMindMapProvider>
        <DashboardHeader>
          {canEdit && <InviteUsers workspace={workspace} />}
          {(userRole !== "OWNER" && <LeaveWorkspace workspace={workspace} />)}
        </DashboardHeader>

        <main className="flex flex-col gap-2 h-full">
          <MindMaps
            initialInfo={mindMap}
            workspaceId={workspace.id}
            canEdit={canEdit}
            initialActiveTag={mindMap.tags || []}
          />
        </main>
      </AutoSaveMindMapProvider>
    </SaveTaskStateProvider>
  )
}

export default EditMindMapPage
