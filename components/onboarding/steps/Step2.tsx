"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useOnboardingForm } from "@/context/OnboardingForm"
import { AdditionalScheam2 } from "@/schema/AdditionalUserSchema2"
import { ActionType } from "@/types/onBoardingContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Briefcase, GraduationCap, UserCircle } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"

const useCaseOptions = [
  { case: "WORK", Title: "For Work", Icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
  { case: "STUDY", Title: "For Study", Icon: GraduationCap, color: "text-green-500", bg: "bg-green-500/10" },
  { case: "PERSONAL_USE", Title: "For Personal Use", Icon: UserCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Step2 = () => {
  const { currentStep, dispatch, useCase } = useOnboardingForm()

  const form = useForm<AdditionalScheam2>({
    resolver: zodResolver(AdditionalScheam2),
    mode: "onChange",
    defaultValues: { useCase: useCase as any }
  })

  const onSubmit = (data: AdditionalScheam2) => {
    dispatch({ type: ActionType.USECASE, payload: data.useCase })
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          How will you use Draftly?
        </motion.h2>
        <motion.p variants={itemVariants} className="text-gray-500 dark:text-gray-400">
          We’ll personalize your experience based on your choice.
        </motion.p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:px-4">
          <FormField
            control={form.control}
            name="useCase"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 gap-4"
                  >
                    {useCaseOptions.map((item, idx) => {
                      const Icon = item.Icon;
                      const isSelected = field.value === item.case;
                      return (
                        <motion.div key={item.case} variants={itemVariants}>
                          <FormItem className="relative">
                            <FormControl>
                              <RadioGroupItem id={item.case} value={item.case} className="sr-only" />
                            </FormControl>
                            <label 
                              htmlFor={item.case}
                              onClick={() => field.onChange(item.case)}
                              className={`
                              flex items-center p-4 cursor-pointer rounded-2xl border-2 transition-all duration-300
                              ${isSelected 
                                ? 'border-red-500 bg-red-50/50 dark:bg-red-900/10 shadow-[0_4px_20px_rgba(220,38,38,0.1)]' 
                                : 'border-gray-200 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-900/50 bg-white/50 dark:bg-black/30 hover:bg-gray-50 dark:hover:bg-gray-900/50'}
                            `}>
                              <div className={`p-3 rounded-xl mr-4 ${isSelected ? "bg-red-100 dark:bg-red-500/20" : item.bg}`}>
                                <Icon className={`w-6 h-6 ${isSelected ? "text-red-500" : item.color}`} />
                              </div>
                              <div className="flex-1">
                                <h3 className={`font-semibold text-lg ${isSelected ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                  {item.Title}
                                </h3>
                              </div>
                              <div className={`
                                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                ${isSelected ? 'border-red-500 bg-red-500' : 'border-gray-300 dark:border-gray-600'}
                              `}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                              </div>
                            </label>
                          </FormItem>
                        </motion.div>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <motion.div variants={itemVariants} className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
            >
              Continue <ArrowRight size={20} />
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}

export default Step2
