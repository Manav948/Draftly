"use client"
import { LocaleSwitcher } from '@/components/switcher/LocaleSwitcher'
import ActiveLink from '@/components/ui/active-link'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { LogOutIcon, Settings } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

const Bottom = () => {
    const m = useTranslations("SIDEBAR");
    const lang = useLocale()
    const logoutHandler = () => {
        signOut({
            callbackUrl: `${window.location.origin}/${lang}`
        })
    }
    return (
        <div className='flex flex-col h-full justify-end '>
            
            {/* locale button */}
            <LocaleSwitcher textSize='text-lg' alignHover='start' alignDropdown="start" variant={"ghost"} size={"icon"} />

            {/* logout button */}
            <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger tabIndex={1}>
                    <Button onClick={() => logoutHandler} variant={"ghost"} size={"icon"}>
                        <LogOutIcon />
                    </Button>
                </HoverCardTrigger>
            </HoverCard>

            {/* settings button */}
            <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger tabIndex={1}>
                    <ActiveLink
                        include='settings'
                        variant={"ghost"}
                        size={"icon"}
                        href='/dashboard/settings'>
                        <Settings />
                    </ActiveLink>
                </HoverCardTrigger>
                <HoverCardContent>
                    <span>{m("MAIN.SETTINGS_HOVER")}</span>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default Bottom
