"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "../ui/dropdown-menu"
import { useLocale } from "next-intl"
import { startTransition, useState } from "react"
import { Button } from "../ui/button"
import { LoadingState } from "../ui/LoadingState"
import { usePathname, useRouter } from "next/navigation"

export const LocaleSwitcher = () => {
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
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={isLoading} onClick={() => setIsLoading(true)} variant={"outline"} size={"icon"}>
                    {isLoading ? <LoadingState className="mr-0" /> : locale?.toUpperCase()}
                    <span className="sr-only">Change Laguage</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                    changeLocale("hi")
                }}
                className="cursor-pointer">
                    HI
                </DropdownMenuItem>

                 <DropdownMenuItem onClick={() => {
                    changeLocale("en")
                }}
                className="cursor-pointer">
                    EN
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    )

}