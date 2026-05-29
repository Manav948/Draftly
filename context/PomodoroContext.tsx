"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { PomodoroSettings, PomodoroSoundEffect } from "@prisma/client"
import { useSession } from "next-auth/react"
import { Howl } from "howler"
import { pathsToSoundEffect } from "@/lib/utils"

interface PomodoroContextType {
    timeLeft: number
    isTimerRunning: boolean
    completedIntervals: number
    isBreakTime: boolean
    currentRounds: number
    settings: PomodoroSettings | null
    startTimer: () => void
    pauseTimer: () => void
    resetTimer: () => void
    skipTimer: () => void
    syncSettings: (settings: PomodoroSettings) => void
}

const PomodoroContext = createContext<PomodoroContextType | null>(null)

const defaultSettings: Omit<PomodoroSettings, "id" | "userId"> = {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 2,
    rounds: 3,
    soundEffect: PomodoroSoundEffect.BELL,
    soundEffectVolume: 0.5,
}

export const PomodoroProvider = ({ children }: { children: React.ReactNode }) => {
    const [timeLeft, setTimeLeft] = useState(defaultSettings.workDuration * 60)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [endTime, setEndTime] = useState<number | null>(null)
    const [completedIntervals, setCompletedIntervals] = useState(1)
    const [isBreakTime, setIsBreakTime] = useState(false)
    const [currentRounds, setCurrentRounds] = useState(1)
    const [settings, setSettings] = useState<PomodoroSettings | null>(null)
    const [hasLoaded, setHasLoaded] = useState(false)

    // Sync settings from client component
    const syncSettings = useCallback((newSettings: PomodoroSettings) => {
        setSettings(newSettings)
        
        // Only update timeLeft if the timer is not running
        if (!isTimerRunning) {
            if (isBreakTime) {
                if (completedIntervals === 0) {
                    setTimeLeft(newSettings.longBreakDuration * 60)
                } else {
                    setTimeLeft(newSettings.shortBreakDuration * 60)
                }
            } else {
                setTimeLeft(newSettings.workDuration * 60)
            }
        }
    }, [isTimerRunning, isBreakTime, completedIntervals])

    // Load state from localStorage on mount
    useEffect(() => {
        const savedState = localStorage.getItem("draftly_pomodoro_state")
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState)
                setIsBreakTime(parsed.isBreakTime ?? false)
                setCompletedIntervals(parsed.completedIntervals ?? 1)
                setCurrentRounds(parsed.currentRounds ?? 1)
                if (parsed.settings) {
                    setSettings(parsed.settings)
                }

                if (parsed.isTimerRunning && parsed.endTime) {
                    const now = Date.now()
                    if (parsed.endTime > now) {
                        setIsTimerRunning(true)
                        setEndTime(parsed.endTime)
                        setTimeLeft(Math.max(0, Math.round((parsed.endTime - now) / 1000)))
                    } else {
                        // Ended while away
                        setIsTimerRunning(false)
                        setEndTime(null)
                        const activeSettings = parsed.settings || defaultSettings
                        let nextTimeLeft = 0
                        if (parsed.isBreakTime) {
                            nextTimeLeft = activeSettings.workDuration * 60
                            setIsBreakTime(false)
                            setCompletedIntervals((parsed.completedIntervals ?? 1) + 1)
                            if (parsed.completedIntervals === 0) {
                                setCurrentRounds((parsed.currentRounds ?? 1) + 1)
                            }
                        } else {
                            setIsBreakTime(true)
                            if (parsed.completedIntervals === activeSettings.longBreakInterval) {
                                nextTimeLeft = activeSettings.longBreakDuration * 60
                                setCompletedIntervals(0)
                            } else {
                                nextTimeLeft = activeSettings.shortBreakDuration * 60
                            }
                        }
                        setTimeLeft(nextTimeLeft)
                    }
                } else {
                    setIsTimerRunning(false)
                    setEndTime(null)
                    setTimeLeft(parsed.timeLeft ?? (parsed.settings?.workDuration ?? defaultSettings.workDuration) * 60)
                }
            } catch (e) {
                console.error("Failed to parse pomodoro state", e)
            }
        }
        setHasLoaded(true)
    }, [])

    // Fetch user settings from server once userId is available
    const { data: session } = useSession()
    const userId = session?.user?.id

    useEffect(() => {
        if (!userId) return

        fetch(`/api/pomodoro/get_settings?userId=${userId}`)
            .then((res) => {
                if (res.ok) return res.json()
                throw new Error("Failed to fetch settings")
            })
            .then((data) => {
                if (data) {
                    syncSettings(data)
                }
            })
            .catch((err) => console.error("Error fetching settings in provider:", err))
    }, [userId, syncSettings])

    // Save state to localStorage on state change
    useEffect(() => {
        if (!hasLoaded) return
        localStorage.setItem(
            "draftly_pomodoro_state",
            JSON.stringify({
                timeLeft,
                isTimerRunning,
                endTime,
                completedIntervals,
                isBreakTime,
                currentRounds,
                settings,
            })
        )
    }, [timeLeft, isTimerRunning, endTime, completedIntervals, isBreakTime, currentRounds, settings, hasLoaded])

    // Play sounds & handle state transition when current phase ends
    const handleTimerComplete = useCallback(() => {
        setIsTimerRunning(false)
        setEndTime(null)

        const activeSettings = settings || defaultSettings
        let nextTimeLeft = 0

        if (isBreakTime) {
            nextTimeLeft = activeSettings.workDuration * 60
            setIsBreakTime(false)
            setCompletedIntervals((prev) => prev + 1)
            if (completedIntervals === 0) {
                setCurrentRounds((prev) => prev + 1)
            }
        } else {
            setIsBreakTime(true)
            if (completedIntervals === activeSettings.longBreakInterval) {
                nextTimeLeft = activeSettings.longBreakDuration * 60
                setCompletedIntervals(0)
            } else {
                nextTimeLeft = activeSettings.shortBreakDuration * 60
            }
        }

        setTimeLeft(nextTimeLeft)

        // Play sound
        try {
            const sound = new Howl({
                src: pathsToSoundEffect[activeSettings.soundEffect],
                html5: true,
                volume: activeSettings.soundEffectVolume,
            })
            sound.play()
        } catch (e) {
            console.error("Failed to play pomodoro sound:", e)
        }
    }, [isBreakTime, completedIntervals, settings])

    // Timer tick effect
    useEffect(() => {
        if (!isTimerRunning || !endTime) return

        const interval = setInterval(() => {
            const now = Date.now()
            const secondsRemaining = Math.max(0, Math.round((endTime - now) / 1000))

            if (secondsRemaining <= 0) {
                clearInterval(interval)
                handleTimerComplete()
            } else {
                setTimeLeft(secondsRemaining)
            }
        }, 200)

        return () => clearInterval(interval)
    }, [isTimerRunning, endTime, handleTimerComplete])

    const startTimer = useCallback(() => {
        if (isTimerRunning) return
        setIsTimerRunning(true)
        const end = Date.now() + timeLeft * 1000
        setEndTime(end)
    }, [isTimerRunning, timeLeft])

    const pauseTimer = useCallback(() => {
        if (!isTimerRunning) return
        setIsTimerRunning(false)
        setEndTime(null)
    }, [isTimerRunning])

    const resetTimer = useCallback(() => {
        setIsTimerRunning(false)
        setEndTime(null)
        setIsBreakTime(false)
        setCurrentRounds(1)
        setCompletedIntervals(1)
        const activeSettings = settings || defaultSettings
        setTimeLeft(activeSettings.workDuration * 60)
    }, [settings])

    const skipTimer = useCallback(() => {
        handleTimerComplete()
    }, [handleTimerComplete])

    return (
        <PomodoroContext.Provider
            value={{
                timeLeft,
                isTimerRunning,
                completedIntervals,
                isBreakTime,
                currentRounds,
                settings,
                startTimer,
                pauseTimer,
                resetTimer,
                skipTimer,
                syncSettings,
            }}
        >
            {children}
        </PomodoroContext.Provider>
    )
}

export const usePomodoro = () => {
    const ctx = useContext(PomodoroContext)
    if (!ctx) {
        throw new Error("usePomodoro must be used within a PomodoroProvider")
    }
    return ctx
}
