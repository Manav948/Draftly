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

      if (res.status === 409) {
        toast.error(t("SIGN_UP.ERROR.EMAIL_EXISTS"));
        return;
      }

      if (!res.ok) {
        toast.error(t("SIGN_UP.ERROR.GENERIC"));
        return;
      }

      const signUPInfo = await res.json();
      if (res.status === 200) {
        toast.success(t("SIGN_UP.SUCCESS"));
      }

      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      router.push("/sign-in");
    } catch (error) {
      console.error("Error during sign-up", error);
      toast.error(t("SIGN_UP.ERROR.NETWORK"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="p-2 sm:p-4 pt-0 sm:pt-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          <ProviderSignInBtns onLoading={function (value: React.SetStateAction<boolean>): void {
            throw new Error("Function not implemented.");
          }} />

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
                      className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 focus-visible:ring-1 focus-visible:ring-red-500 rounded-xl"
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
                      className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 focus-visible:ring-1 focus-visible:ring-red-500 rounded-xl"
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
                      className="h-11 bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 focus-visible:ring-1 focus-visible:ring-red-500 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-3 mt-2">
            {/* Submit Button */}
            <Button
              disabled={loading}
              className="w-full font-medium h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-none transition-colors"
              type="submit"
            >
              {loading ? (
                <LoadingState loadingText={t("SIGN_UP.PENDING.LOADING")} />
              ) : (
                t("SIGN_UP.SUBMIT")
              )}
            </Button>

            {/* Terms & Conditions */}
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <Link
                href="/"
                className="text-red-500 font-medium hover:text-red-400 hover:underline transition-colors"
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
