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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProviderSignInBtns } from "./ProviderSignInBtns";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { z } from "zod";
import Link from "next/link";
import { signInSchema } from "@/schema/siginInSchema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast"
import { LoadingState } from "../ui/LoadingState";

type SignInValues = z.infer<typeof signInSchema>;

const SignInCardContent = () => {
    const t = useTranslations("Auth");

    const form = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [loading, isLoading] = useState(false)
    const router = useRouter();



    const onSubmit = async (values: signInSchema) => {
        isLoading(true)
        try {
            const account = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false
            })
            if (!account) throw new Error("Something went wrong!")
            if (account.error) {
                toast.error(t("SIGN_IN.ERROR.INVALID_CREDENTIALS"));
            } else {
                toast.success(t("SIGN_IN.SUCCESS"));
                router.push("/onboarding");
                router.refresh();
            }
        } catch (error) {
            console.error("Sign-in failed:", error);
            toast.error(t("SIGN_IN.ERROR.GENERIC"));
        } finally {
            isLoading(false)
        }
    };

    return (
        <CardContent className="p-2 sm:p-4 pt-0 sm:pt-0">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >

                    <ProviderSignInBtns SignInCard onLoading={isLoading} />

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
                        <Button disabled={loading} className="w-full font-medium h-11 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-none transition-colors">
                            {loading ? <LoadingState loadingText={t("SIGN_IN.PENDING.LOADING")} /> : t("SIGN_IN.SUBMIT")}
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                            {t("SIGN_IN.FORGOT_PASSWORD")}
                        </p>
                    </div>
                </form>
            </Form>
        </CardContent>
    );
};

export default SignInCardContent;
