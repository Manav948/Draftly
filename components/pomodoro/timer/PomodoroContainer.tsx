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
import { SkipForward, Play, Pause, RotateCcw, Brain, Coffee } from "lucide-react"
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
        setIsTimerRunning(false)
    }, [workDuration])

    // Calculate progress for the SVG circle
    const totalDuration = isBreakTime
        ? (completedIntervals === 0 ? longBreakDuration : shortBreakDuration) // Note: completedIntervals is 0 before long break because of line 52
        : workDuration;
    const currentSeconds = timer.minute * 60 + timer.seconds;
    const totalSeconds = totalDuration * 60;
    const progress = totalSeconds > 0 ? currentSeconds / totalSeconds : 0;
    
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="flex justify-center items-center h-full w-full px-6 ">
            <div className={clsx(
                "relative w-full max-w-[420px] rounded-2xl p-8",
                "bg-[#fafafa] dark:bg-[#111111]",
                "border border-gray-200 dark:border-[#222222]",
                "shadow-sm transition-colors duration-300 overflow-hidden"
            )}>
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 text-center w-full">
                        <div className={clsx(
                            "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest",
                            isBreakTime ? "text-emerald-600 dark:text-emerald-500" : "text-gray-900 dark:text-gray-300"
                        )}>
                            {isBreakTime ? <Coffee className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />}
                            {isBreakTime ? "Break Time" : "Deep Focus"}
                        </div>
                        <div className="h-px w-full bg-gray-200 dark:bg-[#222] mt-2" />
                    </div>

                    {/* Timer Circle */}
                    <div className="relative flex items-center justify-center">
                        <svg className="w-[260px] h-[260px] transform -rotate-90">
                            {/* Background track */}
                            <circle
                                cx="130"
                                cy="130"
                                r={radius}
                                className="stroke-gray-100 dark:stroke-[#1a1a1a]"
                                strokeWidth="4"
                                fill="transparent"
                            />
                            {/* Progress track */}
                            <circle
                                cx="130"
                                cy="130"
                                r={radius}
                                className={clsx(
                                    "transition-all duration-1000 ease-linear",
                                    isBreakTime ? "stroke-emerald-500" : "stroke-gray-900 dark:stroke-white"
                                )}
                                strokeWidth="4"
                                fill="transparent"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Time Display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className={clsx(
                                "font-mono tracking-tighter text-6xl tabular-nums",
                                "text-gray-900 dark:text-white font-medium"
                            )}>
                                {formattedMinutes}:{formattedSeconds}
                            </span>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-500 mt-2 uppercase tracking-widest">
                                {isTimerRunning ? "Running" : "Paused"}
                            </span>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 w-full justify-center">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={resetPomodoro}
                            className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500 dark:text-gray-400"
                            disabled={isTimerRunning && !isBreakTime}
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>

                        <Button
                            size="icon"
                            onClick={() => setIsTimerRunning((p) => !p)}
                            className={clsx(
                                "h-14 w-14 rounded-full transition-colors duration-200",
                                isTimerRunning
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : (isBreakTime ? "bg-emerald-500 text-white hover:bg-emerald-600" : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200")
                            )}
                        >
                            {isTimerRunning ? (
                                <Pause className="h-5 w-5" fill="currentColor" />
                            ) : (
                                <Play className="h-5 w-5 ml-1" fill="currentColor" />
                            )}
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleTimer}
                            className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500 dark:text-gray-400"
                        >
                            <SkipForward className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Rounds Indicator */}
                    <div className="flex items-center justify-between w-full mt-2 pt-6 border-t border-gray-200 dark:border-[#222]">
                        <span className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-widest font-medium">Session Progress</span>
                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: rounds }).map((_, i) => (
                                <div
                                    key={i}
                                    className={clsx(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i < currentRounds - 1
                                            ? "w-4 bg-gray-900 dark:bg-white opacity-40" // Completed
                                            : i === currentRounds - 1
                                                ? "w-6 bg-gray-900 dark:bg-white" // Current
                                                : "w-1.5 bg-gray-200 dark:bg-[#333]" // Upcoming
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PomodoroContainer

