"use client"

import dayjs from "dayjs"
import React, { Fragment } from "react"
import Day from "./Day"
import { CalendarItem } from "@/types/extended"
import { cn } from "@/lib/utils"

interface Props {
  currMonth: dayjs.Dayjs[][]
  monthIndex: number
  calendarItem: CalendarItem[]
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const CalendarGrid = ({ currMonth, monthIndex, calendarItem }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {DAYS.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar body */}
      <div
        className={cn(
          "grid grid-cols-7 gap-px rounded-xl overflow-hidden",
          "border border-border",
          "bg-white",
          "dark:bg-zinc-800"
        )}
      >
        {currMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, idx) => (
              <Day
                key={`${i}-${idx}`}
                day={day}
                monthIndex={monthIndex}
                calendarItems={calendarItem}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default CalendarGrid
