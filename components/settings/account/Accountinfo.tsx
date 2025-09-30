"use client"
import Profileimage from '@/components/onboarding/Profileimage'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { accountInfoSettingsSchema, AccountInfoSettingsSchema } from '@/schema/AccountInfoSettingsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Session } from 'next-auth'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'
import { useForm } from 'react-hook-form'

interface Props {
    session: Session
}

const languages = [
    {
        label: "English", value: "en"
    },
    {
        label: "Hindi", value: "hi"
    }
] as const

const Accountinfo = ({
    session: {
        user: { image, name, surname, username },
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
        },
    })

    return (
        <Card className="bg-background border-none shadow-none">
            <CardContent>
                <div className="space-y-2">
                    <p className="uppercase text-xs text-muted-foreground">
                        {t("ACCOUNT.IMAGE")}
                    </p>
                    <Profileimage
                        // className="w-20 h-20 md:w-24 md:h-24"
                        profileImage={image}
                    />
                </div>
                <Form {...form}>
                    <form
                        className="space-y-6 mt-6 w-full max-w-4xl"
                    >
                        <div className="space-y-2 sm:space-y-4 w-full">
                            <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-10">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="w-full sm:w-1/2">
                                            <FormLabel className="text-muted-foreground uppercase text-xs">
                                                {t("ACCOUNT.USERNAME")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-muted"
                                                    placeholder={t("ACCOUNT.USERNAME_PLACEHOLDER")}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="w-full sm:w-1/2">
                                            <FormLabel className="text-muted-foreground text-xs uppercase">
                                                {t("ACCOUNT.FIRST_NAME")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-muted"
                                                    placeholder={t("ACCOUNT.FIRST_NAME_PLACEHOLDER")}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-10">
                                <FormField
                                    control={form.control}
                                    name="surname"
                                    render={({ field }) => (
                                        <FormItem className="w-full sm:w-1/2">
                                            <FormLabel className="text-muted-foreground uppercase text-xs">
                                                {t("ACCOUNT.SURNAME")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="bg-muted"
                                                    placeholder={t("ACCOUNT.SURNAME_PLACEHOLDER")}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col mt-2 w-full sm:w-1/2">
                                            <FormLabel className="text-muted-foreground uppercase text-xs">
                                                {t("ACCOUNT.LANG")}
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            role="combobox"
                                                            className={cn(
                                                                "justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? languages.find(
                                                                    (language) => language.value === field.value
                                                                )?.label
                                                                : t("ACCOUNT.SELECT_LANGUAGE")}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent align="start" className="w-full p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder={t("ACCOUNT.SEARCH_LANGUAGE")}
                                                        />
                                                        <CommandEmpty>
                                                            {t("ACCOUNT.NO_LANGUAGE")}
                                                        </CommandEmpty>
                                                        <CommandGroup>
                                                            <CommandList>
                                                                {languages.map((language) => (
                                                                    <CommandItem
                                                                        value={language.label}
                                                                        key={language.value}
                                                                        onSelect={() => {
                                                                            form.setValue("language", language.value);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                language.value === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {language.label}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandList>
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/* <Button disabled={isPending} className="text-white" type="submit">
                            {isPending ? (
                                <LoadingState loadingText={t("ACCOUNT.PENDING_BTN")} />
                            ) : (
                                t("ACCOUNT.UPDATE_BTN")
                            )}
                        </Button> */}
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Accountinfo
