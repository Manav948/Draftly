import DashboardHeader from '@/components/header/DashboardHeader'
import { getWorkspace } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

interface Params {
  params: Promise<{ workspace_id: string }>
}

const page = async ({ params }: Params) => {
  const { workspace_id } = await params

  const session = await checkIfUserCompletedOnboarding(`/dashboard/workspace/${workspace_id}`)
  const workspace = await getWorkspace(workspace_id, session.user.id)

  return (
    <>
      <DashboardHeader addManualRoutes={["dashboard", workspace.name]} />
      <main className="flex flex-col gap-2">
        {workspace.name}
      </main>
    </>
  )
}

export default page
