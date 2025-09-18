"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { AdditionalScheam2 } from '@/schema/AdditionalUserSchema2';
import { ActionType } from '@/types/onBoardingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

const useCase = [
  { case: "WORK", Title: "For Work" },
  { case: "STUDY", Title: "For Study" },
  { case: "PERSONAL_USE", Title: "For Personal Use" },
];

const Step2 = () => {
  const { currentStep, dispatch } = useOnboardingForm();

  const form = useForm<AdditionalScheam2>({
    resolver: zodResolver(AdditionalScheam2),
    mode: "onChange",
  });

  const onSubmit = (data: AdditionalScheam2) => {
    dispatch({ type: ActionType.USECASE, payload: data.useCase });
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          How Will You Use Draftly?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          We’ll personalize your experience based on your choice.
        </p>
      </div>

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
                    {useCase.map((item) => (
                      <FormItem
                        key={item.case}
                        className={`flex items-center space-x-3 p-3 border rounded-lg transition ${
                          field.value === item.case
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        <FormControl>
                          <RadioGroupItem value={item.case} />
                        </FormControl>
                        <FormLabel className="cursor-pointer text-gray-800 dark:text-gray-200">
                          {item.Title}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Button */}
          <Button
            // disabled={!form.formState.isValid}
            type="submit"
            className="w-full flex justify-center items-center gap-2"
          >
            Continue
            <ArrowRight width={18} height={18} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Step2;
