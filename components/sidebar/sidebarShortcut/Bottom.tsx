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
  const t = useTranslations("SIDEBAR")
  const lang = useLocale()

  const logoutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/${lang}`,
    })
  }

  return (
    <div className="flex flex-col h-full justify-end items-center gap-3">
      {/* Locale button */}
      <LocaleSwitcher
        textSize="text-sm"
        alignHover="start"
        alignDropdown="start"
        variant="ghost"
        size="icon"
      />

      {/* Logout button with hover */}
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <Button onClick={logoutHandler} variant="ghost" size="icon">
            <LogOutIcon className="w-5 h-5 text-gray-600 dark:text-white" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="px-2 py-1">
          <span>{t("MAIN.LOG_OUT_HOVER") || "Logout"}</span>
        </HoverCardContent>
      </HoverCard>

      {/* Settings button with hover */}
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger asChild>
          <ActiveLink
            include="settings"
            variant="ghost"
            size="icon"
            href="/dashboard/settings"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-white" />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="px-2 py-1 text-sm">
          <span>{t("MAIN.SETTINGS_HOVER")}</span>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default Bottom
