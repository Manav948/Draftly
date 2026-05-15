"use client";

import { useOnboardingForm } from "@/context/OnboardingForm";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import FromStep from "./FromStep";
import { motion, AnimatePresence } from "framer-motion";

const AdditionalSetting = () => {
  const { currentStep } = useOnboardingForm();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        relative w-full max-w-2xl mx-auto
        rounded-3xl border border-gray-200/60 dark:border-[#1f1f1f]
        bg-gradient-to-br from-white to-gray-50 dark:from-[#111] dark:to-[#0a0a0a]
        shadow-sm
        p-6 sm:p-12
        flex flex-col
      "
    >
      <header className="text-center space-y-3 z-10 mb-8 mt-2">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="mx-auto w-12 h-12 bg-red-600 rounded-xl shadow-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome to Draftly
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
            Let's customize your workspace to fit your needs.
          </p>
        </motion.div>
      </header>

      <div className="flex-1 relative z-10 w-full flex items-center justify-center min-h-[420px]">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full">
              <Step1 />
            </motion.div>
          )}
          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full">
              <Step2 />
            </motion.div>
          )}
          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="w-full">
              <Step3 />
            </motion.div>
          )}
          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="w-full">
              <Step4 />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="z-10 mt-10 pb-2">
        <FromStep />
      </div>
    </motion.section>
  );
};

export default AdditionalSetting;
