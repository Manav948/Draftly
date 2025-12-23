import AssignedToMeContainer from '@/components/assigned_to_me/AssignedToMeContainer'
import DashboardHeader from '@/components/header/DashboardHeader'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const AssignToMePage = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard/assigned-to-me")
    return (
        <div>
            <DashboardHeader />
            <main className=''>
                <AssignedToMeContainer userId={session.user.id} />
            </main>
        </div>
    )
}

export default AssignToMePage
