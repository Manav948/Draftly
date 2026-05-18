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
import { ArrowRight, User } from "lucide-react";

type FormType = z.infer<typeof AdditionalScheam>;

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

const Step1 = () => {
  const { dispatch, currentStep, name, surname, profileImage } = useOnboardingForm();

  const form = useForm<FormType>({
    resolver: zodResolver(AdditionalScheam),
    defaultValues: { name: name || "", surname: surname || "" },
  });

  const onSubmit = (data: FormType) => {
    dispatch({ type: ActionType.NAME, payload: data.name });
    dispatch({ type: ActionType.SURNAME, payload: data.surname });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="flex justify-center mb-6 ">
        <motion.div variants={itemVariants} className="relative group cursor-pointer inline-block">
           <Profileimage profileImage={profileImage} />
           <div className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none" />
        </motion.div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 px-1 sm:px-4">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300 font-medium">First name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        {...field} 
                        placeholder="" 
                        className="pl-10 h-12 bg-white/50 dark:bg-black/40 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-500 transition-all shadow-sm rounded-xl" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              name="surname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300 font-medium">Last name</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input 
                        {...field} 
                        placeholder="" 
                        className="pl-10 h-12 bg-white/50 dark:bg-black/40 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-500 transition-all shadow-sm rounded-xl" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>

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
  );
};

export default Step1;
