"use client"
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { enIN, enUS } from 'date-fns/locale'
import { Calendar1 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import React, { useMemo } from 'react'

interface Props {
    from?: Date
    to?: Date
}

const ReadOnlyCalender = ({ from, to }: Props) => {
    const lang = useLocale()
    const t = useTranslations("READ_ONLY")

    const currentLocale = useMemo(() => {
        if (lang === "en") return enUS
    }, [lang])

    return (
        <div className=''>
            <Badge>
                <Calendar1 size={16} />
                {
                    from ? (
                        to ? (
                            <>
                                {format(new Date(from), "dd LLL y", {
                                    locale: currentLocale
                                })}{" "}
                                -{" "}
                                {format(new Date(to), "dd LLL y", {
                                    locale: currentLocale
                                })}
                            </>
                        ) : (
                            format(new Date(from), "dd LLL y", {
                                locale: currentLocale
                            })
                        )
                    ) : (
                        <span>
                            {t("NO_DATE")}
                        </span>
                    )
                }
            </Badge>
        </div>
    )
}

export default ReadOnlyCalender
