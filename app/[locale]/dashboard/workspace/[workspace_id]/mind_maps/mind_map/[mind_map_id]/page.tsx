import DashboardHeader from '@/components/header/DashboardHeader'
import InviteUsers from '@/components/inviteUsers/InviteUsers'
import MindMaps from '@/components/mindMaps/MindMaps'
import { SaveTaskStateProvider } from '@/context/TaskSavingContext'
import { AutoSaveMindMapProvider } from '@/context/AutoSaveMindMap'
import { getMindMap, getWorkspace, getWorkspaceRole } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'
import { changeCodeToEmoji } from '@/lib/changeCodetoEmoji'
import PreviewCardWrapper from '@/components/mindMaps/preview/PreviewCardWrapper'

interface Params {
  params: Promise<{ mind_map_id: string; workspace_id: string }>
}

const ViewMindMapPage = async ({ params }: Params) => {
  const { mind_map_id, workspace_id } = await params

  const session = await checkIfUserCompletedOnboarding(
    `/dashboard/workspace/${workspace_id}/mind_maps/mind_map/${mind_map_id}`
  )

  const [workspace, userRole, mindMap] = await Promise.all([
    getWorkspace(workspace_id, session.user.id),
    getWorkspaceRole(workspace_id, session.user.id),
    getMindMap(mind_map_id, session.user.id)
  ])

  const canEdit = userRole === 'ADMIN' || userRole === 'OWNER'
  const isSavedByUser = mindMap.savedMindMaps?.some((mindMap) => mindMap.userId === session.user.id)
  console.log("saved by User", isSavedByUser)

  return (
    <SaveTaskStateProvider>
      <AutoSaveMindMapProvider>
        <DashboardHeader
          addManualRoutes={[
            {
              name: "DASHBOARD",
              href: "/dashboard",
              useTranslate: true
            },
            {
              name: workspace.name,
              href: `/dashboard/workspace/${workspace.id}`,
            },
            {
              name: `${mindMap.title ? mindMap.title : "Untitled Mind Map"}`,
              href: "/",
              useTranslate: mindMap.title ? false : true
            }
          ]}
        >
          {canEdit && <InviteUsers workspace={workspace} />}
        </DashboardHeader>

        <main className="flex flex-col gap-2">
          <PreviewCardWrapper
            mindMap={mindMap}
            userRole={userRole}
            isSavedByUser={isSavedByUser || true}
          >
            <div className='h-full'>
              <MindMaps
                initialInfo={mindMap}
                workspaceId={workspace.id}
                canEdit={canEdit}
                initialActiveTag={mindMap.tags || []}
              />
            </div>
          </PreviewCardWrapper>
        </main>
      </AutoSaveMindMapProvider>
    </SaveTaskStateProvider>
  )
}

export default ViewMindMapPage
