import DashboardHeader from '@/components/header/DashboardHeader'
import StarredContainer from '@/components/starred/StarredContainer'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const AssignToMePage = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard/starred")
    return (
        <div>
            <DashboardHeader />
            <main className='w-full h-full flex items-center gap-2'>
                <StarredContainer userId={session.user.id} />
            </main>
        </div>
    )
}

export default AssignToMePage
