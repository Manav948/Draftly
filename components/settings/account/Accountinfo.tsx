"use client"
import Profileimage from '@/components/onboarding/Profileimage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { accountInfoSettingsSchema, AccountInfoSettingsSchema } from '@/schema/AccountInfoSettingsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Session } from 'next-auth'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
    session: Session
}

const Accountinfo = ({
    session: {
        user: {
            image,
            name,
            surname,
            username,
        },
    },
}: Props) => {
    const t = useTranslations("SETTINGS")
    const lang = useLocale()
    const form = useForm<AccountInfoSettingsSchema>({
        resolver: zodResolver(accountInfoSettingsSchema),
        defaultValues: {
            username: username!,
            language: lang,
            name: name ? name : "",
            surname: surname ? surname : "",

        }
    })
    return (
        <Card>
            <CardContent>
                <div>
                    <p>{t("ACCOUNT.IMAGE")}</p>
                    <Profileimage />
                </div>
                <Form {...form} >
                    <form className=''>
                        <div>
                            <div className='space-y-3.5'>
                                <FormField control={form.control} name='username' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("ACCOUNT.USERNAME")}</FormLabel>
                                        <FormControl >
                                            <Input
                                                placeholder={t("ACCOUNT.USERNAME_PLACEHOLDER")}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField control={form.control} name='name' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("ACCOUNT.FIRST_NAME")}</FormLabel>
                                        <FormControl >
                                            <Input
                                                placeholder={t("ACCOUNT.FIRST_NAME_PLACEHOLDER")}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />


                                <FormField control={form.control} name='surname' render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("ACCOUNT.SURNAME")}</FormLabel>
                                        <FormControl >
                                            <Input
                                                placeholder={t("ACCOUNT.SURNAME_PLACEHOLDER")}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                                <Button />
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Accountinfo
