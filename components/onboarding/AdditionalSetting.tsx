"use client";

import { useOnboardingForm } from "@/context/OnboardingForm";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import FromStep from "./FromStep";

const AdditionalSetting = () => {
  const { currentStep } = useOnboardingForm();

  return (
    <section
      className="
        rounded-3xl border border-border
        bg-card dark:bg-[#120808]
        shadow-2xl
        p-6 sm:p-10
        space-y-8
      "
    >
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Draftly
        </h1>
        <p className="text-muted-foreground">
          Let’s set up your workspace
        </p>
      </header>

      {/* Step Content */}
      <div className="min-h-[380px] flex items-center justify-center">
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {currentStep === 3 && <Step3 />}
        {currentStep === 4 && <Step4 />}
      </div>

      {/* Progress */}
      <FromStep />
    </section>
  );
};

export default AdditionalSetting;
