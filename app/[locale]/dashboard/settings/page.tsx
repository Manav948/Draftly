"use client"
import { checkIfUserCompletedOnboarding } from '@/lib/checkIfUserCompletedOnboarding'
import React from 'react'

const Settings = async () => {
    const session = await checkIfUserCompletedOnboarding("/dashboard/settings")

    return (
        <div className="h-full w-full bg-gray-50 p-6">
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-500 mt-2">Manage your preferences and account here.</p>
            </div>
        </div>
    )
}

export default Settings
