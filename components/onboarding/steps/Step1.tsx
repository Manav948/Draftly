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
import { User } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"

const Step1 = () => {
  const { currentStep, name, surname, dispatch } = useOnboardingForm()
  const form = useForm<AdditionalScheam>({
    resolver: zodResolver(AdditionalScheam),
    defaultValues: {
      name: name ? name : "",
      surname: surname ? surname : "",
    },
  })

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Profile Upload */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-muted flex items-center justify-center bg-muted/30">
          <User className="w-10 h-10 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Add profile photo</p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form className="w-full max-w-md space-y-6">
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
                    className="rounded-lg"
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
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Continue Button */}
          <div className="flex justify-end">
            <Button
              type="button"
              className="px-6 rounded-lg"
              onClick={() =>
                dispatch({
                  type: ActionType.CHANGE_SITE,
                  payload: currentStep + 1,
                })
              }
            >
              Continue →
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Step1
