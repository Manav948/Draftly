"use client"
import { LocaleSwitcher } from "@/components/switcher/LocaleSwitcher"
import { ThemeSwitcher } from "@/components/switcher/ThemeSwitcher"
import React from "react"

const OnBoarding = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex justify-end items-center gap-4 p-4 border-b border-border">
        <LocaleSwitcher alignDropdown={"end"} alignHover={"end"} size={"icon"} variant={"outline"} />
        <ThemeSwitcher alignDropdown={"end"} alignHover={"end"} size={"icon"} variant={"outline"} />
      </div>

      <div className="container mx-auto px-6 py-10">{children}</div>
    </main>
  )
}

export default OnBoarding
