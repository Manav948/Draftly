"use client"
import React from 'react'
import ChangePassword from './ChangePassword'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import Warning from '@/components/ui/warning'

const SecurityCard = () => {
    const t = useTranslations("SETTINGS.SECURITY")
    return (
        <Card className='bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-white shadow-xl transition-all border border-gray-100 dark:border-[#1f1f1f] rounded-xl'>
            <CardHeader>
                <h1 className='font-bold text-3xl text-gray-900 dark:text-[#f0f0f0]'>
                    {t("TITLE")}
                </h1>
                <CardDescription className='text-gray-500 dark:text-[#444] mt-2 text-md'>
                    {t("DESC")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Warning yellow>
                    <p>{t("WARNING.FIRST")}</p>
                    <span>{t("WARNING.SECOND")}</span>
                    {t("WARNING.THIRD")}
                    <span>{t("WARNING.FORTH")}</span>
                </Warning>
                <ChangePassword />
            </CardContent>
        </Card>
    )
}

export default SecurityCard
