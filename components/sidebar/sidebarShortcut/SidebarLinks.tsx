"use client"
import ActiveLink from '@/components/ui/active-link'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props {
    href: string,
    Icon: LucideIcon,
    hoverTextKey: string
}
const SidebarLinks = ({ hoverTextKey, Icon, href }: Props) => {
    return (
        <div>
            <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger asChild>
                    <ActiveLink variant={"ghost"} size={"icon"} href={href}>
                        <Icon />
                    </ActiveLink>
                </HoverCardTrigger>
                <HoverCardContent align='start'>
                    <span>{hoverTextKey}</span>
                </HoverCardContent>
            </HoverCard>

        </div>
    )
}

export default SidebarLinks
