"use client"

import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Dashboard = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard")
    console.log(session)

    return (
        <div className="h-full w-full bg-gray-50 p-6">
            {/* Dashboard header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500">Welcome back! Here’s your overview.</p>
            </div>
        </div>
    )
}

export default Dashboard
    