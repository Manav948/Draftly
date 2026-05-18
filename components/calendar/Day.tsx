"use client"

import dayjs, { Dayjs } from "dayjs"
import { cn } from "@/lib/utils"

interface Props {
  day: Dayjs
  monthIndex: number
}

const Day = ({ day, monthIndex }: Props) => {
  const isToday = day.isSame(dayjs(), "day")
  const isWeekend = day.day() === 0 || day.day() === 6

  return (
    <div
      className={cn(
        "min-h-[100px] p-2",
        "border border-border",
        "dark:bg-[#0c0c0c]",
        "cursor-pointer hover:bg-muted/50 transition-colors",
        isWeekend && "bg-muted/30"
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
    </div>
  )
}

export default Day
