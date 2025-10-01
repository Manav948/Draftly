"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "../ui/dropdown-menu"
import { useLocale, useTranslations } from "next-intl"
import { startTransition, useState } from "react"
import { Button } from "../ui/button"
import { LoadingState } from "../ui/LoadingState"
import { usePathname, useRouter } from "next/navigation"
import { HoverCard, HoverCardContent } from "../ui/hover-card"

interface Props {
    variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
    size?: "default" | "sm" | "lg" | "icon" | null
    alignHover?: "center" | "start" | "end"
    alignDropdown?: "center" | "start" | "end"
    textSize?: "text-lg" | "text-base" | "text-sm"
}

export const LocaleSwitcher = ({
    variant = "default",
    size = "default",
    alignHover = "center",
    alignDropdown = "center",
    textSize = "text-base"
}: Props) => {
    const [isLoading, setIsLoading] = useState(false)
    const locale = useLocale()
    const router = useRouter()
    const pathName = usePathname()

    function changeLocale(newLocale: "hi" | "en") {
        setIsLoading(true)
        startTransition(() => {
            const segments = pathName.split("/");
            if (segments[1] === "en" || segments[1] === "hi") {
                segments[1] = newLocale;
            } else {
                segments.splice(1, 0, newLocale);
            }
            const newPath = segments.join("/") || "/";
            router.replace(newPath);
        })
    }
    const m = useTranslations("COMMON");
    return (
        <HoverCard openDelay={250} closeDelay={250}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button disabled={isLoading}
                        onClick={() => setIsLoading(true)}
                        variant={variant}
                        size={size}
                        className={textSize}
                    >
                        {isLoading ? <LoadingState
                            className="mr-0" /> : locale?.toUpperCase()}
                        <span className="sr-only">{m("LANG_HOVER")}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={alignDropdown}>
                    {/* <DropdownMenuItem onClick={() => {
                    changeLocale("hi")
                }}
                className="cursor-pointer">
                    HI
                </DropdownMenuItem> */}

                    <DropdownMenuItem onClick={() => {
                        changeLocale("en")
                    }}
                        className="cursor-pointer">
                        EN
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
            <HoverCardContent align={alignHover}>
                <span>{m("LANG_HOVER")}</span>
            </HoverCardContent>
        </HoverCard>
    )

}