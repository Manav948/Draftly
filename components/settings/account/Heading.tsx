"use client"
import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { useTranslations } from 'next-intl'
import React from 'react'

const Heading = () => {
  const t = useTranslations("SETTINGS")
  return (
    <Card className="bg-transparent border-none shadow-none mb-6">
      <CardHeader className="px-0">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("ACCOUNT.TITLE")}
        </h1>
        <CardDescription className="text-muted-foreground mt-1">
          {t("ACCOUNT.DESC")}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default Heading
