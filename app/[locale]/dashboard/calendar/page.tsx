import Calendar from '@/components/calendar/Calendar'
import DashboardHeader from '@/components/header/DashboardHeader'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const calendarpage = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard/calendar")
    return (
        <div>
            <DashboardHeader />
            <main className='h-full'>
                <Calendar userId={session.user.id} />
            </main>
        </div>
    )
}

export default calendarpage
