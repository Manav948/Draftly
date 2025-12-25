"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useOnboardingForm } from "@/context/OnboardingForm"
import { AdditionalScheam } from "@/schema/AdditionalUserSchema"
import { ActionType } from "@/types/onBoardingContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import Profileimage from "../Profileimage"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { ArrowBigRight, ArrowRight } from "lucide-react"

type AdditionalSchemaType = z.infer<typeof AdditionalScheam>

const Step1 = () => {
  const session = useSession()
  const { currentStep, name, surname, profileImage, dispatch } = useOnboardingForm()

  const form = useForm<AdditionalSchemaType>({
    resolver: zodResolver(AdditionalScheam),
    defaultValues: {
      name: name || "",
      surname: surname || "",
    },
  })

  useEffect(() => {
    if (session.data?.user?.image) {
      dispatch({
        type: ActionType.PROFILEIMAGE,
        payload: session.data.user.image,
      })
    }
  }, [session.data?.user?.image, dispatch])

  const onSubmit = (data: AdditionalSchemaType) => {
    dispatch({ type: ActionType.NAME, payload: data.name })
    dispatch({ type: ActionType.SURNAME, payload: data.surname })
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 })
  }

  return (
    <section className="min-h-screen flex items-center justify-center dark:bg-[#0e0707] dark:text-white transition-colors duration-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg dark:bg-[#0e0707] rounded-2xl shadow-xl sm:p-10 border border-border dark:border-white"
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Let’s Get Started 🚀
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Tell us a little about yourself to personalize your experience
          </p>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Profileimage profileImage={profileImage} />
        </motion.div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Manav"
                      {...field}
                      className="rounded-lg bg-muted/40 focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Valani"
                      {...field}
                      className="rounded-lg bg-muted/40 focus:ring-2 focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
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
    </section>
  )
}

export default Step1
