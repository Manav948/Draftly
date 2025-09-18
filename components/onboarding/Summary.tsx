"use client"
import React from 'react'
import { useOnboardingForm } from '@/context/OnboardingForm'

const Summary = () => {
    const { name, surname, useCase } = useOnboardingForm()
    return (
        <section className='hidden lg:w-1/2 bg-primary lg:flex justify-center items-center'>
            <div className='bg-card rounded-2xl w-96 min-h-[10rem] shadow-sm flex flex-col items-center p-4 py-8 gap-5'>
                <div className='w-32 h-32 rounded-full shadow-sm bg-muted mt-[-5rem]'>
                </div>
                <div className='text-center space-y-1.5 text-3xl break-words max-w-xs font-semibold'>
                    {name && <p>{name}</p>}
                    {surname && <p>{surname}</p>}
                </div>
                {!useCase && <span className='bg-muted rounded-md w-24 h-8'></span>}
                {useCase && (
                    <p>
                        {useCase === "WORK" && "Use For Work"}
                        {useCase === "STUDY" && "Use For Study"}
                        {useCase === "PERSONAL_USE" && "Use For Personal_use"}
                    </p>
                )}
            </div>
        </section>
    )
}

export default Summary
