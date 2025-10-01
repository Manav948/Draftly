"use client"

import ActiveLink from '@/components/ui/active-link'
import { LockKeyhole, SunMoon, User2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

const Settings = () => {
    const settingsField = [
        { href: "/dashboard/settings", icon: <User2 size={20} />, title: "SETTINGS.ACCOUNT" },
        { href: "/dashboard/settings/security", icon: <LockKeyhole size={20} />, title: "SETTINGS.SECURITY" },
        { href: "/dashboard/settings/theme", icon: <SunMoon size={20} />, title: "SETTINGS.Theme" }
    ]

    const m = useTranslations("SIDEBAR")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div>
            <div>
                {/* <p>{m("SETTINGS.GENERAL")}</p> */}
                <div className='flex flex-col gap-2 w-full mt-2'>
                    {mounted && settingsField.map((field, i) => (
                        <ActiveLink
                            key={i}
                            variant={"ghost"}
                            size={"sm"}
                            href={field.href}
                            className='flex justify-start w-full items-center gap-2 '
                        >
                            {field.icon}
                            {m(field.title)}
                        </ActiveLink>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Settings
