"use client"
import SecurityCard from '@/components/settings/security/SecurityCard'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const SecuritySettings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings");
  return (
    <div>
      <SecurityCard />
    </div>
  )
}

export default SecuritySettings
