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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full xl:w-[500px] max-w-[95%] sm:max-w-lg mx-auto p-6 sm:p-8 space-y-6 sm:space-y-8 rounded-2xl shadow-lg bg-white dark:bg-[#0a0505] border border-gray-200 dark:border-red-900/30 my-4 sm:mt-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          How Will You Use Draftly?
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
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
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * (idx + 1) }}
                      >
                        <FormItem
                          className={`flex items-center space-x-3 p-4 rounded-xl border cursor-pointer transition-all duration-300
                          ${field.value === item.case
                              ? "border-red-500 bg-red-50 dark:bg-red-900/20 shadow-md"
                              : "border-gray-300 dark:border-gray-700 hover:border-red-400 dark:bg-[#110505] dark:hover:bg-red-900/10"
                            }`}
                        >
                          <FormControl>
                            <RadioGroupItem value={item.case} />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-gray-800 dark:text-gray-200 text-sm sm:text-base w-full">
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
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
              type="submit"
              className="w-full rounded-lg py-6 text-base font-semibold transition-all mt-2"
            >
              Continue
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}

export default Step2
