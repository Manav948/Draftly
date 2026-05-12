import DashboardHeader from '@/components/header/DashboardHeader'
import Accountinfo from '@/components/settings/account/Accountinfo'
import DeleteAccount from '@/components/settings/account/DeleteAccount'
import Heading from '@/components/settings/account/Heading'
import { Separator } from '@/components/ui/separator'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Settings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings")

  return (
    <div className="h-full w-full bg-[#fafafa] dark:bg-[#0a0a0a]">
      <DashboardHeader />
      <div className="min-h-screen py-10 px-6 max-w-4xl mx-auto">
        {/* Page Heading */}
        <Heading />

        {/* Account Info Card */}
        <div className="mt-8">
          <Accountinfo session={session} />
        </div>

        {/* Separator */}
        <div className="my-10">
          <Separator className="bg-gray-200 dark:bg-[#222] w-full" />
        </div>

        {/* Delete Account Card */}
        <div className="mt-8">
          <DeleteAccount userEmail={session.user.email!} />
        </div>
      </div>
    </div>
  )
}

export default Settings
