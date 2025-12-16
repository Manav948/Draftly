import DashboardHeader from '@/components/header/DashboardHeader'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'
const PomodoroPage = async () => {
  const session = await checkIfUserCompletedOnboarding(`/dashboard/pomodoro`)
  return (
    <>
      <DashboardHeader />
      <main>Pomodoro for fun createdAt</main>
    </>
  )
}

export default PomodoroPage
