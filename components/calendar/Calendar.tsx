"use client"

import { getMonth } from "@/lib/utils"
import dayjs from "dayjs"
import React, { useCallback, useEffect, useState } from "react"
import CalendarHeader from "./CalendarHeader"
import CalendarGrid from "./CalendarGrid"
import { useQuery } from "@tanstack/react-query"
import { CalendarItem } from "@/types/extended"
import { LoadingScreen } from "../common/LoadingScreen"
import ErrorPage from "@/components/ui/IsError"

interface Props {
    userId: string
}
const Calendar = ({ userId }: Props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month())
    const [currMonth, setCurrMonth] = useState(getMonth(monthIndex))

    useEffect(() => {
        setCurrMonth(getMonth(monthIndex))
    }, [monthIndex])

    const changeMonthHandler = useCallback((change: "prev" | "next") => {
        setMonthIndex((prev) => (change === "next" ? prev + 1 : prev - 1))
    }, [])

    const resetHandler = useCallback(() => {
        if (monthIndex === dayjs().month()) return
        setMonthIndex(dayjs().month())
    }, [monthIndex])

    const { data: calendarItem, isError, isLoading, refetch } = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/calendar/get`)
            if (!res.ok) throw new Error()
            const data = (await res.json()) as CalendarItem[]
            return data
        },
        queryKey: ["getCalendarItem", userId],
        staleTime: 5 * 60 * 1000,
    })
    if (isLoading) return <LoadingScreen />
    if (isError)   return <ErrorPage onRetry={refetch} />
    
    return (
        <section className="w-full h-full px-2 sm:px-4 flex flex-col gap-8 mt-7 mb-2">
            <CalendarHeader
                monthIndex={monthIndex}
                onChangeMonthHandler={changeMonthHandler}
                onResetMonthHandler={resetHandler}
            />

            <CalendarGrid currMonth={currMonth} monthIndex={monthIndex} calendarItem={calendarItem || []} />
        </section>
    )
}

export default Calendar
