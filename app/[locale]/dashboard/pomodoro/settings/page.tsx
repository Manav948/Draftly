import DashboardHeader from '@/components/header/DashboardHeader'
import SettingsContainer from '@/components/pomodoro/SettingsContainer'
import { getPomodoro } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const PomodoroSettingsPage = async () => {
    const session = await checkIfUserCompletedOnboarding(`/dashboard/pomodoro`)
    const pomodoroSettings = await getPomodoro(session.user.id)
    console.log("pmododofsdofas", pomodoroSettings)
    return (
        <div>
            <DashboardHeader />
            <main>
                <SettingsContainer  pomodoroSettings={pomodoroSettings} />
            </main>
        </div>
    )
}

export default PomodoroSettingsPage
