"use client"
import React from 'react'
import { useOnboardingForm } from '@/context/OnboardingForm'
import { UserAvatar } from '../ui/user-avatar'

const Summary = () => {
    const { name, surname, profileImage, useCase, currentStep } = useOnboardingForm()

    return (
        <section className="hidden lg:flex w-1/2 bg-primary justify-center items-center rounded-4xl">
            {currentStep < 3 && (
                <div className="relative dark:bg-[#0e0707] text-white w-96 min-h-[14rem] shadow-md flex flex-col items-center p-6 gap-6 rounded-2xl">

                    {/* Avatar */}
                    <div className="relative -mt-20">
                        <UserAvatar
                            className="w-32 h-32 rounded-full shadow-2xl border-2 border-black dark:border-white bg-muted cursor-pointer"
                            size={64}
                            profileImage={profileImage}
                        />
                    </div>

                    {/* Name + Surname */}
                    <div className="text-center space-y-1">
                        {(name || surname) ? (
                            <p className="text-2xl font-semibold text-foreground">
                                {name} {surname}
                            </p>
                        ) : (
                            <span className="bg-muted rounded-md w-40 h-6 block mx-auto animate-pulse"></span>
                        )}
                    </div>

                    {/* Use Case */}
                    <div className="text-center">
                        {!useCase ? (
                            <span className="bg-muted rounded-md w-28 h-6 block mx-auto animate-pulse"></span>
                        ) : (
                            <p className="text-sm font-medium text-muted-foreground">
                                {useCase === "WORK" && "Using for Work"}
                                {useCase === "STUDY" && "Using for Study"}
                                {useCase === "PERSONAL_USE" && "Using for Personal Use"}
                            </p>
                        )}
                    </div>
                </div>
            )}

        </section>
    )
}

export default Summary
