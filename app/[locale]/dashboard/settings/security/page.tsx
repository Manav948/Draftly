import DashboardHeader from '@/components/header/DashboardHeader';
import SecurityCard from '@/components/settings/security/SecurityCard'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const SecuritySettings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");
  return (
    <div>
      <DashboardHeader />
      <SecurityCard />
    </div>
  )
}

export default SecuritySettings
