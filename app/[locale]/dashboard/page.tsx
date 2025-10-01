import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Dashboard = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard")
    console.log(session)

    return (
        <div className="h-full w-fulldark:bg-gradient-to-b dark:from-gray-950 dark:via-gray-900 dark:to-black
      bg-gradient-to-b from-white via-white to-white p-6">
            {/* Dashboard header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p>Welcome back! Here’s your overview.</p>
            </div>
        </div>
    )
}

export default Dashboard
    