"use client"
import { useOnboardingForm } from '@/context/OnboardingForm'
import React from 'react'

function Step4() {
    const { currentStep, workspaceName, workspaceImage } = useOnboardingForm()
    return (
        <div className='flex flex-col justify-center items-center gap-4 w-full mt-10 text-center'>
            <h2 className='font-bold text-4xl md:text-5xl max-w-xs'>
                this is final stepsp
            </h2>
        </div>
    )
}

export default Step4
