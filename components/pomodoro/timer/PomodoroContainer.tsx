"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { pathsToSoundEffect } from "@/lib/utils"
import { PomodoroSettings } from "@prisma/client"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Howl } from "howler"
import { Button } from "@/components/ui/button"
import { SkipForward } from "lucide-react"
import clsx from "clsx"

interface Props {
    pomodoroSettings: PomodoroSettings
}

const PomodoroContainer = ({
    pomodoroSettings: {
        workDuration,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
        rounds,
        soundEffect,
        soundEffectVolume,
    },
}: Props) => {
    const [timer, setTimer] = useState({ minute: workDuration, seconds: 0 })
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [completedIntervals, setCompletedIntervals] = useState(1)
    const [isBreakTime, setIsBreakTime] = useState(false)
    const [currentRounds, setCurrentRounds] = useState(1)

    const handleTimer = useCallback(() => {
        setIsTimerRunning(false)

        if (isBreakTime) {
            setTimer({ minute: workDuration, seconds: 0 })
            setIsBreakTime(false)
            setCompletedIntervals((prev) => prev + 1)
            completedIntervals === 0 && setCurrentRounds((prev) => prev + 1)
        } else {
            setIsBreakTime(true)

            if (completedIntervals === longBreakInterval) {
                setTimer({ minute: longBreakDuration, seconds: 0 })
                setCompletedIntervals(0)
            } else {
                setTimer({ minute: shortBreakDuration, seconds: 0 })
            }
        }

        const sound = new Howl({
            src: pathsToSoundEffect[soundEffect],
            html5: true,
            volume: soundEffectVolume,
        })

        sound.play()
    }, [
        isBreakTime,
        completedIntervals,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
        workDuration,
        soundEffect,
        soundEffectVolume,
    ])

    useEffect(() => {
        if (!isTimerRunning) return

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev.minute === 0 && prev.seconds === 0) {
                    clearInterval(interval)
                    handleTimer()
                    return prev
                }

                if (prev.seconds === 0) {
                    return { minute: prev.minute - 1, seconds: 59 }
                }

                return { ...prev, seconds: prev.seconds - 1 }
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [isTimerRunning,
        handleTimer,
        timer,
        isBreakTime,
        currentRounds,
        completedIntervals,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
        workDuration,
        handleTimer,
        rounds
    ])

    const formattedMinutes = useMemo(
        () => String(Math.max(timer.minute, 0)).padStart(2, "0"),
        [timer.minute]
    )

    const formattedSeconds = useMemo(
        () => String(Math.max(timer.seconds, 0)).padStart(2, "0"),
        [timer.seconds]
    )

    const resetPomodoro = useCallback(() => {
        setTimer({ minute: workDuration, seconds: 0 })
        setIsBreakTime(false)
        setCurrentRounds(1)
        setCompletedIntervals(1)
    }, [workDuration])

    return (
        <div className="flex justify-center">
            <Card
                className={clsx(
                    "mt-8 w-full max-w-xl rounded-3xl border",
                    "bg-background/60 backdrop-blur",
                    "shadow-lg transition-all"
                )}
            >
                <CardHeader className="items-center gap-3">
                    <CardTitle
                        className={clsx(
                            "font-mono tracking-tight",
                            "text-6xl sm:text-8xl",
                            isBreakTime
                                ? "text-emerald-500"
                                : "text-primary"
                        )}
                    >
                        {formattedMinutes}:{formattedSeconds}
                    </CardTitle>

                    <CardDescription className="text-lg sm:text-xl">
                        {isBreakTime ? "Break Time 🌿" : "Focus Time 🎯"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => setIsTimerRunning((p) => !p)}
                            className={clsx(
                                "px-10 text-lg font-semibold",
                                isTimerRunning
                                    ? "bg-destructive hover:bg-destructive/90"
                                    : "bg-primary hover:bg-primary/90"
                            )}
                        >
                            {isTimerRunning ? "Stop" : "Start"}
                        </Button>

                        {isTimerRunning && (
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={handleTimer}
                                className="h-12 w-12 rounded-full"
                            >
                                <SkipForward className="h-5 w-5" />
                            </Button>
                        )}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Round {currentRounds} / {rounds}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default PomodoroContainer
