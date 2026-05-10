import DashboardContainer from '@/components/dashboard/DashboardContainer'
import DashboardHeader from '@/components/header/DashboardHeader'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard")
  return (
    <>
      <DashboardHeader />
      <DashboardContainer userId={session.user.id} username={session.user.name || ""} />
    </>
  )
}

export default Dashboard
