"use client"
import { useOnboardingForm } from '@/context/OnboardingForm';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

const steps = [1, 2, 3, 4];

const FromStep = () => {
  const { currentStep } = useOnboardingForm();

  return (
    <div className="flex items-center justify-center w-full max-w-sm mx-auto px-4">
      {steps.map((s, index) => {
        const isCompleted = currentStep > s;
        const isActive = currentStep === s;
        const isUpcoming = currentStep < s;

        return (
          <React.Fragment key={s}>
            {/* Step Circle */}
            <div className="relative flex flex-col items-center justify-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isActive || isCompleted ? '#dc2626' : 'transparent', // red-600
                  borderColor: isActive || isCompleted ? '#dc2626' : '#52525b', // zinc-600
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`
                  z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 
                  ${isUpcoming ? "border-muted-foreground/30 bg-muted/20 text-muted-foreground" : "text-white shadow-lg"}
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm font-bold">{s}</span>
                )}
              </motion.div>
              
              {/* Optional: Label below the circle (could be hidden on small screens) */}
              <div className="absolute top-12 whitespace-nowrap">
                <span className={`text-xs font-semibold ${isActive ? 'text-red-500' : isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
                  {s === 1 && "Profile"}
                  {s === 2 && "Usage"}
                  {s === 3 && "Workspace"}
                  {s === 4 && "Done"}
                </span>
              </div>
            </div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 px-2 h-1 overflow-hidden">
                <div className="relative h-1 w-full rounded bg-muted-foreground/20">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-y-0 left-0 bg-red-600 rounded"
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FromStep;
