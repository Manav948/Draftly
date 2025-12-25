"use client"
import { useOnboardingForm } from '@/context/OnboardingForm';
import React from 'react';

const steps = [1, 2, 3, 4];

const FromStep = () => {
  const { currentStep } = useOnboardingForm();

  return (
    <div className="flex items-center justify-center gap-6">
      {steps.map((s, index) => (
        <div key={s} className="flex items-center">
          <span
            className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300
              ${currentStep >= s 
                ? "bg-primary text-white  dark:text-black shadow-md" 
                : "bg-muted text-gray-500 dark:text-gray-400"
              }`}
          >
            {s}
          </span>

          {index < steps.length - 1 && (
            <div
              className={`h-1 w-12 mx-2 rounded transition-all duration-300 
                ${currentStep > s ? "bg-primary" : "bg-muted"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FromStep;
