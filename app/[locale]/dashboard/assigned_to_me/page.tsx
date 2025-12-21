import DashboardHeader from '@/components/header/DashboardHeader'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const AssignToMePage = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard/assigned-to-me")
    return (
        <div>
            <DashboardHeader />
            <main className='flex flex-col gap-2 h-full items-center'>
                Assigned to me page
            </main>
        </div>
    )
}

export default AssignToMePage
