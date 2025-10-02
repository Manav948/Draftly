import Accountinfo from '@/components/settings/account/Accountinfo'
import DeleteAccount from '@/components/settings/account/DeleteAccount'
import Heading from '@/components/settings/account/Heading'
import { Separator } from '@/components/ui/separator'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Settings = async () => {
  const session = await checkIfUserCompletedOnboarding("/dashboard/settings")

  return (
    <div className="h-full w-full">
      <div
        className="
          min-h-screen py-6 
          bg-gradient-to-b from-white via-white to-gray-50
          dark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black 
          dark:text-gray-100
        "
      >
        {/* Page Heading */}
        <Heading />

        {/* Account Info Card */}
        <div className="mt-6">
          <Accountinfo session={session} />
        </div>

        {/* Separator */}
        <div className="my-6">
          <Separator className="bg-gray-200 dark:bg-gray-500 w-full" />
        </div>

        {/* Delete Account Card */}
        <div className="mt-6">
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}

export default Settings
