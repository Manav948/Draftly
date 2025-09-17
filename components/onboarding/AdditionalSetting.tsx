"use client"
import { useOnboardingForm } from '@/context/OnboardingForm'
import React from 'react'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

const AdditionalSetting = () => {
    const { currentStep } = useOnboardingForm()
    return (
        <section>
            <div>
                <div>
                    <h1>Draftly</h1>
                </div>
                <h2>Application</h2>
                {currentStep === 1 && <Step1 />}
                {currentStep === 2 && <Step2 />}
                {currentStep === 3 && <Step3 />}
            </div>

        </section>
    )
}

export default AdditionalSetting
