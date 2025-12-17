"use client"

import { PomodoroSettings } from "@prisma/client"
import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import SettingsForm from "./SettingsForm"

interface Props {
  pomodoroSettings: PomodoroSettings
}

const SettingsContainer = ({ pomodoroSettings }: Props) => {
  return (
    <div className="">
      <Card className=" border-none shadow-none rounded-none  bg-gradient-to-b from-white/0 to-black">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            Pomodoro Settings
          </CardTitle>

          <CardDescription className="text-base leading-relaxed">
            Manage your settings, Personalize youe Pomodoro as you wish.You can change the number of rounds, work , break durations , as well as customize notification sounds.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <SettingsForm pomodoroSettings={pomodoroSettings} />
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsContainer
