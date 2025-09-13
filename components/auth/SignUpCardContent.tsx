"use client";
import React from "react";
import { CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { signUpSchema } from "@/schema/SignUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProviderSignInBtns } from "./ProviderSignInBtns";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { z } from "zod";
import Link from "next/link";

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpCardContent = () => {
  const t = useTranslations("Auth");

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });


  const onSubmit = (values: SignUpValues) => {
    console.log("Form Submitted:", values);
  };

  return (
    <CardContent className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >

          <ProviderSignInBtns />

          {/* Inputs */}
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("EMAIL")}
                      type="email"
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t("USERNAME")}
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("PASSWORD")}
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3">
            {/* Submit Button */}
            <Button className="w-full font-medium">
              {t("SIGN_UP.SUBMIT")}
            </Button>

            {/* Terms & Conditions */}
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <Link
                href="/"
                className="text-primary font-medium hover:underline transition-colors"
              >
                {t("SIGN_UP.TERMS.SECOND")}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};

export default SignUpCardContent;
