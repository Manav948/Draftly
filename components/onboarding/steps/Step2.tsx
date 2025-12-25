"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useOnboardingForm } from "@/context/OnboardingForm"
import { AdditionalScheam2 } from "@/schema/AdditionalUserSchema2"
import { ActionType } from "@/types/onBoardingContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"

const useCase = [
  { case: "WORK", Title: "For Work" },
  { case: "STUDY", Title: "For Study" },
  { case: "PERSONAL_USE", Title: "For Personal Use" },
]

const Step2 = () => {
  const { currentStep, dispatch } = useOnboardingForm()

  const form = useForm<AdditionalScheam2>({
    resolver: zodResolver(AdditionalScheam2),
    mode: "onChange",
  })

  const onSubmit = (data: AdditionalScheam2) => {
    dispatch({ type: ActionType.USECASE, payload: data.useCase })
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto space-y-8 p-6 rounded-2xl shadow-lg 
                dark:bg-[#0e0707] dark:text-[#f03d3d]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          How Will You Use Draftly?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          We’ll personalize your experience based on your choice.
        </p>
      </motion.div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="useCase"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    {useCase.map((item, idx) => (
                      <motion.div
                        key={item.case}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * (idx + 1) }}
                      >
                        <FormItem
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-300
                          ${field.value === item.case
                              ? "border-blue-500 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 shadow-md"
                              : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                            }`}
                        >
                          <FormControl>
                            <RadioGroupItem value={item.case} />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-gray-800 dark:text-gray-200">
                            {item.Title}
                          </FormLabel>
                        </FormItem>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <Button
              type="submit"
              className="w-full rounded-lg py-3 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all"
            >
              Continue
              <ArrowRight />
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}

export default Step2
