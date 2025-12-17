"use client"
import { pomodoroSettingsSchema, PomodoroSettingsSchema } from '@/schema/pomodoroSettingsSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { PomodoroSettings, PomodoroSoundEffect } from '@prisma/client'
import React, { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '../ui/form'
import { Clock, PlayCircle, Volume2 } from 'lucide-react'
import { Slider } from '../ui/slider'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { LoadingState } from '../ui/LoadingState'
import { pathsToSoundEffect } from '@/lib/utils'
import { Howl } from 'howler'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props {
    pomodoroSettings: PomodoroSettings
}
const SettingsForm = (
    { pomodoroSettings: {
        id,
        longBreakDuration,
        longBreakInterval,
        shortBreakDuration,
        workDuration,
        rounds,
        soundEffect,
        soundEffectVolume
    }

    }: Props) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const router = useRouter()

    const form = useForm<PomodoroSettingsSchema>({
        resolver: zodResolver(pomodoroSettingsSchema),
        defaultValues: {
            workDuration,
            shortBreakDuration,
            longBreakDuration,
            longBreakInterval,
            rounds,
            soundEffect,
            soundEffectVolume: soundEffectVolume * 100
        }
    })

    const { mutate: updatePomodoro, isPending: isUpdating } = useMutation({
        mutationFn: async (formData: PomodoroSettingsSchema) => {
            await axios.post(`/api/pomodoro/update`, formData)
        },
        onError: (err: AxiosError) => {
            const error = err.response?.data ? err.response.data : "Pomodoro not update"
            toast.error("Pomodoro not Updateing")
        },
        onSuccess: () => {
            toast.success("Pomodoro Updated Successfully")
            router.refresh()
        },
        mutationKey: ["updatePomodoro"]
    })

    const { mutate: resetPomodoro, isPending: isReseting } = useMutation({
        mutationFn: async () => {
            await axios.post(`/api/pomodoro/update`, {
                workDuration: 25,
                shortBreakDuration: 5,
                longBreakDuration: 15,
                longBreakInterval: 2,
                rounds: 3,
                soundEffect: PomodoroSoundEffect.BELL,
                soundEffectVolume: 50,
            })
        },
        onError: (err: AxiosError) => {
            const error = err.response?.data ? err.response.data : "Pomodoro not reset"
            toast.error("Pomodoro not Reset")
            console.log(error)
        },
        onSuccess: () => {
            toast.success("Pomodoro Reset Successfully")
            form.reset({
                workDuration: 25,
                shortBreakDuration: 15,
                longBreakDuration: 5,
                longBreakInterval: 2,
                rounds: 3,
                soundEffect: PomodoroSoundEffect.BELL,
                soundEffectVolume: 50,
            })
            router.refresh()
        },
        mutationKey: ["resetPomodoro"]
    })

    const isDefault = useMemo(() => {
        return (
            workDuration === 25 &&
            shortBreakDuration === 5 &&
            longBreakDuration === 15 &&
            longBreakInterval === 2 &&
            rounds === 3 &&
            soundEffect === PomodoroSoundEffect.BELL &&
            soundEffectVolume === 0.5
        )
    }, [
        workDuration,
        shortBreakDuration,
        longBreakDuration,
        longBreakInterval,
        rounds, soundEffect,
        soundEffectVolume
    ])

    const platSoundEffectHandler = useCallback((soundEffect: PomodoroSoundEffect) => {
        const currentPath = pathsToSoundEffect[soundEffect]

        const sound = new Howl({
            src: currentPath,
            html5: true,
            onend: () => {
                setIsPlaying(false)
            },
            volume: form.getValues("soundEffectVolume") / 100
        })
        sound.play()
        setIsPlaying(true)
    },
        [form])

    const onSubmit = (formData: PomodoroSettingsSchema) => {
        updatePomodoro(formData)
    }
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-8 ">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-12"
                >
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Clock className="h-6 w-6 text-muted-foreground" />
                            <h2 className="text-xl font-semibold tracking-tight">
                                Timer Settings
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="workDuration"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            <span>Work Duration</span>
                                            <span className="font-medium">{value} min</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={15}
                                                max={60}
                                                step={1}
                                                value={[value]}
                                                onValueChange={(vals) => onChange(vals[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Focus time for one work session.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="shortBreakDuration"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            <span>Short Break</span>
                                            <span className="font-medium">{value} min</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={1}
                                                max={15}
                                                step={1}
                                                value={[value]}
                                                onValueChange={(vals) => onChange(vals[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Quick recovery between work sessions.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="longBreakDuration"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            <span>Long Break</span>
                                            <span className="font-medium">{value} min</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={10}
                                                max={45}
                                                step={1}
                                                value={[value]}
                                                onValueChange={(vals) => onChange(vals[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Extended rest after multiple sessions.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rounds"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            <span>Rounds</span>
                                            <span className="font-medium">{value}</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={1}
                                                max={10}
                                                step={1}
                                                value={[value]}
                                                onValueChange={(vals) => onChange(vals[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Number of work sessions before a full cycle ends.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="longBreakInterval"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="flex justify-between">
                                            <span>Long Break Interval</span>
                                            <span className="font-medium">{value}</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={2}
                                                max={15}
                                                step={1}
                                                value={[value]}
                                                onValueChange={(vals) => onChange(vals[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            How many work sessions occur before a long break.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Volume2 className="h-6 w-6 text-muted-foreground" />
                            <h2 className="text-xl font-semibold tracking-tight">
                                Sound Settings
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="soundEffect"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Notification Sound</FormLabel>
                                        <div className="flex items-center gap-3">
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select sound" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Object.values(PomodoroSoundEffect).map((sound) => (
                                                        <SelectItem key={sound} value={sound}>
                                                            {sound}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                            <Button
                                                type="button"
                                                size="icon"
                                                variant="outline"
                                                disabled={isPlaying}
                                                onClick={() =>
                                                    platSoundEffectHandler(
                                                        field.value as PomodoroSoundEffect
                                                    )
                                                }
                                            >
                                                <PlayCircle />
                                            </Button>
                                        </div>
                                        <FormDescription>
                                            Sound played when the timer finishes.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="soundEffectVolume"
                                render={({ field: { value, onChange } }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between">
                                            <span>Volume</span>
                                            <span className="font-medium">{value}%</span>
                                        </FormLabel>
                                        <FormControl>
                                            <Slider
                                                min={0}
                                                max={100}
                                                step={1}
                                                value={[value]}
                                                onValueChange={(vals) => onChange(vals[0])}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Set to 0% to mute notifications.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </section>

                    <div className="flex justify-end gap-4 pt-6 border-t border-border">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isUpdating || isDefault}
                            onClick={() => resetPomodoro()}
                        >
                            {isReseting ? (
                                <LoadingState loadingText="Resetting..." />
                            ) : (
                                "Reset"
                            )}
                        </Button>

                        <Button type="submit" disabled={isReseting}>
                            {isUpdating ? (
                                <LoadingState loadingText="Saving..." />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>

    )
}

export default SettingsForm
