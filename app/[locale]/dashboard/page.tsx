import DashboardContainer from '@/components/dashboard/DashboardContainer'
import DashboardHeader from '@/components/header/DashboardHeader'
import Welcoming from '@/components/header/Welcoming'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard")
  return (
    <>
      <DashboardHeader />
      <div className="px-3">
        <DashboardContainer userId={session.user.id} username={session.user.name || ""} />
      </div>
    </>
  )
}

export default Dashboard
