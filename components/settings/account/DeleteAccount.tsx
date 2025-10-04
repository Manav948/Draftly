"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingState } from '@/components/ui/LoadingState'
import Warning from '@/components/ui/warning'
import { deleteAccountSchema, DeleteAccountSchema } from '@/schema/deleteAccountSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast"


interface Props {
    userEmail: string;
}
const DeleteAccount = ({ userEmail }: Props) => {
    const t = useTranslations("SETTINGS.ACCOUNT")
    const lang = useLocale();

    const form = useForm<DeleteAccountSchema>({
        resolver: zodResolver(deleteAccountSchema),
        defaultValues: {
            email: ""
        },
    });

    const { mutate: deleteProfile, isPending } = useMutation({
        mutationFn: async (formData: DeleteAccountSchema) => {
            const { data } = await (axios.post(`/api/profile/delete`, formData)) as AxiosResponse<DeleteAccountSchema>
            return data;
        },
        onError: (err: AxiosError) => {
            const error = err?.response?.data ? err.response.data : "Something went wrong"
            toast.error("Email was not Correct Account not Deleted")
        },
        onSuccess: async () => {
            toast.success("Accounted Deleted Successfully");
            signOut({
                callbackUrl: `${window.location.origin}/${lang}`
            })
        }, mutationKey: ["deleteProfile"]
    })

    const onSubmit = (data: DeleteAccountSchema) => {
        deleteProfile(data);
    }

    return (
        <Card className="
      max-w-3xl mx-auto
      border-none shadow-md rounded-xl overflow-hidden
      bg-gradient-to-b from-white via-gray-50 to-gray-100
      dark:from-gray-950 dark:via-gray-900 dark:to-black
    ">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-red-600 dark:text-red-500">
                    {t("DELETE_TITLE")}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {t("DELETE_DESC")}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">
                                        {t("DELETE_LABLE")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={t("DELETE_PLACEHOLDER")}
                                            className="
                        border-gray-300 dark:border-gray-700
                        bg-white dark:bg-gray-950
                        focus:ring-2 focus:ring-red-500
                      "
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="lg"
                                    className="w-full font-semibold shadow-sm cursor-pointer"
                                >
                                    {t("DELETE_BTN")}
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-red-600 dark:text-red-500">
                                        {t("DIALOG.TITLE")}
                                    </DialogTitle>
                                    <DialogDescription className="text-gray-600 dark:text-gray-400">
                                        {t("DIALOG.DESC")}
                                    </DialogDescription>
                                </DialogHeader>

                                <Warning>
                                    <p>{t("DIALOG.WARNING")}</p>
                                </Warning>

                                <Button
                                    disabled={isPending}
                                    onClick={form.handleSubmit(onSubmit)}
                                    size="lg"
                                    variant="destructive"
                                    className="w-full mt-4 cursor-pointer"
                                >
                                    {isPending ? <LoadingState loadingText={t("DIALOG.PENDING_BTN")} /> : t("DIALOG.BUTTON")}
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default DeleteAccount
