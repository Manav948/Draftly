"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoadingState } from '@/components/ui/LoadingState'
import { changePasswordSchema, ChangePasswordSchema } from '@/schema/changePasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const ChangePassword = () => {
    const t = useTranslations("SETTINGS.SECURITY.FORM")
    const router = useRouter()
    const form = useForm<ChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            repeat_password: "",
        }
    })

    const { mutate: changedPassword, isPending } = useMutation({
        mutationFn: async (formData: ChangePasswordSchema) => {
            const { data } = await (axios.post(
                "/api/profile/changePassword"
                , formData
            )) as AxiosResponse<User>;
            return data
        },
        onError: (err: AxiosError) => {
            const error = err?.response?.data ? err.response.data : "Something went wrong"
            toast.error("Password not Match")
        },
        onSuccess: async () => {
            toast.success("Password Changed Successfully");
            router.refresh();
            form.reset();
        },
        mutationKey: ["changedPassword"]
    })

    const onSubmit = (data: ChangePasswordSchema) => {
        changedPassword(data);
    }

    return (
        <div className="w-full max-w-lg mx-auto 
                        bg-white
                        dark:bg-gradient-to-br from-gray-900 via-gray-900 to-black
                        border rounded-2xl shadow-xl p-6 md:p-8
                        text-gray-100">
            <h2 className="text-2xl font-bold text-center 
                           bg-clip-text text-transparent 
                           bg-gradient-to-b from-primary to-destructive mb-6">
                {t("TITLE")}
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* current password */}
                    <FormField
                        control={form.control}
                        name='current_password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium dark:text-gray-300 text-black">
                                    {t("CURRENT.LABLE")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        className='dark:bg-gray-800/70 border dark:border-gray-700 
                                                  rounded-xl focus:ring-2 
                                                  focus:ring-primary focus:border-primary 
                                                  text-gray-100 placeholder:text-gray-400 
                                                  transition-all'
                                        placeholder={t("CURRENT.PLACEHOLDER")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-destructive mt-1" />
                            </FormItem>
                        )}
                    />

                    {/* new password */}
                    <FormField
                        control={form.control}
                        name='new_password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium dark:text-gray-300 text-black">
                                    {t("NEW.LABLE")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        className='dark:bg-gray-800/70 border dark:border-gray-700 
                                                  rounded-xl focus:ring-2 
                                                  focus:ring-primary focus:border-primary 
                                                  text-gray-100 placeholder:text-gray-400 
                                                  transition-all'
                                        placeholder={t("NEW.PLACEHOLDER")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-destructive mt-1" />
                            </FormItem>
                        )}
                    />

                    {/* repeat password */}
                    <FormField
                        control={form.control}
                        name='repeat_password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium dark:text-gray-300 text-black">
                                    {t("REPEAT.LABLE")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='password'
                                        className='dark:bg-gray-800/70 border dark:border-gray-700 
                                                  rounded-xl focus:ring-2 
                                                  focus:ring-primary focus:border-primary 
                                                  text-gray-100 placeholder:text-gray-400 
                                                  transition-all'
                                        placeholder={t("REPEAT.PLACEHOLDER")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-xs text-destructive mt-1" />
                            </FormItem>
                        )}
                    />

                    {/* submit button */}
                    <div className="flex justify-center pt-4">
                        <Button
                            disabled={isPending}
                            type="submit"
                            size="lg"
                            className="w-full md:w-auto px-8 py-2 rounded-xl shadow-md 
                                    bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                                  text-white font-semibold hover:opacity-90 transition-all cursor-pointer"
                        >
                            {isPending ? <LoadingState loadingText='Loading...' /> : t("BTN")}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default ChangePassword
