"use client"
import React from 'react'
import ChangePassword from './ChangePassword'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import Warning from '@/components/ui/warning'

const SecurityCard = () => {
    const t = useTranslations("SETTINGS.SECURITY")
    return (
        <Card className=' dark:bg-[#0e0707] dark:text-[#f03d3d]  shadow-xl
        backdrop-blur-md transition-all border-0 border-white'>
            <CardHeader>
                <h1 className='font-bold text-3xl text-foreground'>
                    {t("TITLE")}
                </h1>
                <CardDescription className='text-white mt-2 text-md'>
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
