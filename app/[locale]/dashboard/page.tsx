import Welcoming from '@/components/header/Welcoming'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Dashboard = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard")
  console.log(session)

  return (
    <div className="flex items-start justify-between px-6 py-4">
      <Welcoming hideOnMobile showOnlyOnPath="/dashboard" />
    </div>
  )
}

export default Dashboard
