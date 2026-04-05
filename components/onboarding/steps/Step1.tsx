"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/OnboardingForm";
import { AdditionalScheam } from "@/schema/AdditionalUserSchema";
import { ActionType } from "@/types/onBoardingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Profileimage from "../Profileimage";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type FormType = z.infer<typeof AdditionalScheam>;

const Step1 = () => {
  const { dispatch, currentStep, name, surname, profileImage } = useOnboardingForm();

  const form = useForm<FormType>({
    resolver: zodResolver(AdditionalScheam),
    defaultValues: { name : "", surname : "" },
  });

  const onSubmit = (data: FormType) => {
    dispatch({ type: ActionType.NAME, payload: data.name });
    dispatch({ type: ActionType.SURNAME, payload: data.surname });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full xl:w-[500px] max-w-[95%] sm:max-w-lg mx-auto p-6 sm:p-8 space-y-6 rounded-2xl shadow-lg bg-white dark:bg-[#0a0505] border border-gray-200 dark:border-red-900/30 my-4 sm:mt-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Your Profile</h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          This helps personalize Draftly
        </p>
      </div>

      <div className="flex justify-center py-2">
        <Profileimage profileImage={profileImage} />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">First name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Manav" className="dark:bg-[#110505] dark:border-red-900/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="surname"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-200">Last name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Valani" className="dark:bg-[#110505] dark:border-red-900/40" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full gap-2 py-6 text-base font-semibold mt-4">
            Continue <ArrowRight size={18} />
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default Step1;
