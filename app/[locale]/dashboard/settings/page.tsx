import Accountinfo from '@/components/settings/account/Accountinfo'
import Heading from '@/components/settings/account/Heading'
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Settings = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard/settings")

    return (
        <div className="h-full w-full">
            <div className="p-6 bg-white text-black dark:bg-gray-950 dark:text-white">
                <Heading />
                <Accountinfo session={session} />
            </div>
        </div>
    )
}

export default Settings
