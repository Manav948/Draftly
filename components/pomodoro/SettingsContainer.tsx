"use client"
import { PomodoroSettings } from '@prisma/client'
import React from 'react'
import { Card, CardHeader } from '../ui/card'

interface Props {
    pomodoroSettings : PomodoroSettings
}
const SettingsContainer = ({pomodoroSettings} : Props) => {
  return (
    <div>
        <Card>
            <CardHeader>
                <h1>Pomodoro settings for fun </h1>
            </CardHeader>
        </Card>
    </div>
  )
}

export default SettingsContainer
