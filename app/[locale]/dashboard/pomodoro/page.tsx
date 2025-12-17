import DashboardHeader from '@/components/header/DashboardHeader'
import PomodoroContainer from '@/components/pomodoro/timer/PomodoroContainer'
import { getPomodoro } from '@/lib/api'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'
const PomodoroPage = async () => {
  const session = await checkIfUserCompletedOnboarding(`/dashboard/pomodoro`)
  const pomodoroSettings = await getPomodoro(session.user.id)
  return (
    <>
      <DashboardHeader />
      <main className='w-full h-full gap-2'>
        <PomodoroContainer pomodoroSettings={pomodoroSettings} />
      </main>
    </>
  )
}

export default PomodoroPage
