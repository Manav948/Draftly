"use client"
import ActiveLink from '@/components/ui/active-link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { BrainCircuit, CalendarRange, Home } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

const Top = () => {
    const m = useTranslations("SIDEBAR")
    return (
        <div className='flex flex-col gap-2'>
            <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger asChild>
                    <ActiveLink variant={"ghost"} size={"icon"} href='/dashboard'>
                        <Home />
                    </ActiveLink>
                </HoverCardTrigger>
                <HoverCardContent align='start'>
                    <span>{m("MAIN.HOME_OVER")}</span>
                </HoverCardContent>
            </HoverCard>

            <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger asChild>
                    <ActiveLink include='pomodoro' variant={"ghost"} size={"icon"} href='/dashboard/pomodoro'>
                        <BrainCircuit />
                    </ActiveLink>
                </HoverCardTrigger>
                <HoverCardContent align='start'>
                    <span>Pomodoro</span>
                </HoverCardContent>
            </HoverCard>

             <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger asChild>
                    <ActiveLink variant={"ghost"} size={"icon"} href='/dashboard/calender'>
                        <CalendarRange />
                    </ActiveLink>
                </HoverCardTrigger>
                <HoverCardContent align='start'>
                    <span>Calendar</span>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default Top
