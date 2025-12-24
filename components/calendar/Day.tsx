"use client"

import dayjs, { Dayjs } from "dayjs"
import { CalendarItem } from "@/types/extended"
import { cn } from "@/lib/utils"
import CalendarTask from "./CalendarTask"

interface Props {
  day: Dayjs
  monthIndex: number
  calendarItems: CalendarItem[]
}

const Day = ({ day, monthIndex, calendarItems }: Props) => {
  const isToday = day.isSame(dayjs(), "day")
  const isWeekend = day.day() === 0 || day.day() === 6

  return (
    <div
      className={cn(
        "relative min-h-[140px] p-2",
        "border border-gray-500",
        "dark:bg-gray-900",
        isWeekend && "bg-muted/40"
      )}
    >
      <div className="flex justify-end">
        <span
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-full text-sm",
            isToday && "bg-primary text-primary-foreground font-semibold"
          )}
        >
          {day.date()}
        </span>
      </div>

      <div className="relative mt-1">
        {calendarItems.map((item, index) => {
          if (!item.date?.from) return null

          const start = dayjs(item.date.from)
          const end = item.date.to ? dayjs(item.date.to) : start

          if (!start.isSame(day, "day")) return null

          const span = Math.min(end.diff(start, "day") + 1, 7)
          const startCol = day.day() === 0 ? 7 : day.day()

          return (
            <CalendarTask
              key={item.taskId}
              item={item}
              span={span}
              startCol={startCol}
              top={index * 22}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Day
