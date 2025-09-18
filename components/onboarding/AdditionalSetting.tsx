"use client";
import { useOnboardingForm } from "@/context/OnboardingForm";
import React from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import FromStep from "./FromStep";

const AdditionalSetting = () => {
  const { currentStep } = useOnboardingForm();

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Draftly
        </h1>
        <h2 className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Application Setup
        </h2>
      </div>

      {/* Steps */}
      <div className="bg-muted/40 p-6 rounded-xl shadow-sm">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
      </div>

      {/* Progress */}
      <div className="flex justify-center">
        <FromStep />
      </div>
    </section>
  );
};

export default AdditionalSetting;
