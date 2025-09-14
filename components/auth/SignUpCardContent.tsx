"use client";
import React, { useState } from "react";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingState } from "../ui/LoadingState";

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpCardContent = () => {
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const t = useTranslations("Auth");

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (values: SignUpValues) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const signUPInfo = await res.json();
      if (res.status === 200) {
        toast.success("Sign-Up Successfully ! Please sign-in");
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      router.push("/sign-in");
    } catch (error) {
      console.error("Error during sign-up", error);
      toast.error("Error In Sign-Up function");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <CardContent className="p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
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
            <Button
              disabled={loading}
              className="w-full font-bold"
              type="submit"
            >
              {loading ? (
                <LoadingState loadingText={t("PENDING.LOADING")} /> 
              ) : (
                t("SIGN_UP.SUBMIT")
              )}
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
