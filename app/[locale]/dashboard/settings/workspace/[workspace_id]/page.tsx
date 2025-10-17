import DashboardHeader from '@/components/header/DashboardHeader';
import WorkspaceTab from '@/components/settings/workspace/WorkspaceTab';
import { getWorkspaceSettings } from '@/lib/api';
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding';
import React from 'react'
interface Props {
    params: {
        workspace_id: string;
    };
}

const workspace = async ({ params: { workspace_id } }: Props) => {
    const session = await checkIfUserCompletedOnboarding(`/dashboard/settings/workspace/${workspace_id}`)
    const workspace = await getWorkspaceSettings(workspace_id, session.user.id)
    return (
        <>
            <DashboardHeader addManualRoutes={["dashboard", "settings", workspace.name]} />
            <main className='flex flex-col gap-2'>
            <WorkspaceTab workspace={workspace} />
            </main>
        </>
    )
}

export default workspace
