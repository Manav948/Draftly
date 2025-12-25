"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'

import { UserAvatar } from '../ui/user-avatar'
import { Check, Globe2, Moon, Settings2, Sun, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import useChangeLocale from '@/hooks/useChangeLocale'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { signOut, useSession } from 'next-auth/react'

const User = () => {
    const { theme, setTheme } = useTheme()
    const { onChange } = useChangeLocale()
    const lang = useLocale()
    const m = useTranslations("COMMON")
    const { data: session } = useSession()
    const user = session?.user

    const logOutHandler = () => {
        signOut({ callbackUrl: `${window.location.origin}/${lang}` })
    }

    return (
        <DropdownMenu>
            {/* Avatar Trigger */}
            <DropdownMenuTrigger asChild>
                <div className="relative z-50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary">
                    <UserAvatar
                        className="w-10 h-10 ring-2 ring-gray-200 dark:ring-gray-700 cursor-pointer"
                        profileImage={user?.image ?? null}
                    />
                </div>
            </DropdownMenuTrigger>

            {/* Dropdown Content */}
            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="z-[9999] w-56 p-2 rounded-xl shadow-lg bg-white dark:bg-[#0e0707] border border-gray-200 dark:border-gray-700"
            >
                {/* User Info */}
                <div className="flex">
                    <UserAvatar className="w-full h-full object-cover" profileImage={user?.image ?? null} />
                    <div>
                        <DropdownMenuLabel className="font-semibold">{user?.username ?? "Guest"}</DropdownMenuLabel>
                        <DropdownMenuLabel className="text-xs text-gray-500">
                            {user?.email ?? "guest@example.com"}
                        </DropdownMenuLabel>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* Theme Switch */}
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer gap-2">
                            <Moon size={16} className="hidden dark:inline-block" />
                            <Sun size={16} className="dark:hidden" />
                            <span>{m("THEME_HOVER")}</span>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent sideOffset={10}>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    {m("DARK")}
                                    {theme === "dark" && <Check size={16} className="ml-auto" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    {m("LIGHT")}
                                    {theme === "light" && <Check size={16} className="ml-auto" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    {m("SYSTEM")}
                                    {theme === "system" && <Check size={16} className="ml-auto" />}
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    {/* Language Switch */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="cursor-pointer gap-2">
                            <Globe2 size={16} />
                            <span>{m("LANG_HOVER")}</span>
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                            <DropdownMenuSubContent sideOffset={10}>
                                <DropdownMenuItem onClick={() => onChange("EN")}>
                                    English
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>

                    {/* Settings */}
                    <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" className="flex items-center gap-2">
                            <Settings2 size={16} /> {m("SETTINGS")}
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                    onClick={logOutHandler}
                    className="cursor-pointer flex items-center gap-2 text-red-600 dark:text-red-400"
                >
                    <LogOut size={16} /> {m("LOG_OUT")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default User
