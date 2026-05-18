"use client"

import dayjs, { Dayjs } from "dayjs"
import React, { useMemo } from "react"
import Day from "./Day"
import CalendarTask from "./CalendarTask"
import { CalendarItem } from "@/types/extended"
import { cn } from "@/lib/utils"

interface Props {
  currMonth: dayjs.Dayjs[][]
  monthIndex: number
  calendarItem: CalendarItem[]
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

/** A task that is active during a given week, with its assigned lane */
interface WeekTask {
  item: CalendarItem
  /** Which days of this week the task covers (0=Mon ... 6=Sun) */
  activeDays: boolean[]
  /** Vertical lane index for stacking */
  lane: number
}

/**
 * For a given week, determine which tasks are active and on which days,
 * then assign non-overlapping lanes for vertical stacking.
 */
function computeWeekTasks(week: Dayjs[], items: CalendarItem[]): WeekTask[] {
  const weekStart = week[0].startOf("day")
  const weekEnd = week[6].endOf("day")

  // Find tasks that overlap this week
  const overlapping: { item: CalendarItem; startIdx: number; endIdx: number }[] = []

  for (const item of items) {
    if (!item.date?.from) continue

    const taskStart = dayjs(item.date.from).startOf("day")
    const taskEnd = item.date.to
      ? dayjs(item.date.to).startOf("day")
      : taskStart

    // Skip tasks that don't overlap this week
    if (taskEnd.isBefore(weekStart) || taskStart.isAfter(weekEnd)) continue

    // Clamp to week boundaries
    const segStart = taskStart.isBefore(weekStart) ? weekStart : taskStart
    const segEnd = taskEnd.isAfter(week[6].startOf("day"))
      ? week[6].startOf("day")
      : taskEnd

    const startIdx = segStart.diff(weekStart, "day")
    const endIdx = segEnd.diff(weekStart, "day")

    overlapping.push({ item, startIdx, endIdx })
  }

  // Sort by start day, then by wider span first (for consistent lane packing)
  overlapping.sort(
    (a, b) => a.startIdx - b.startIdx || (b.endIdx - b.startIdx) - (a.endIdx - a.startIdx)
  )

  // Greedy lane assignment
  const laneEnds: number[] = [] // tracks the last endIdx placed in each lane
  const result: WeekTask[] = []

  for (const { item, startIdx, endIdx } of overlapping) {
    // Build activeDays array
    const activeDays = Array(7).fill(false)
    for (let d = startIdx; d <= endIdx; d++) {
      activeDays[d] = true
    }

    // Find first lane where this task fits (no overlap)
    let lane = -1
    for (let i = 0; i < laneEnds.length; i++) {
      if (laneEnds[i] < startIdx) {
        laneEnds[i] = endIdx
        lane = i
        break
      }
    }
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(endIdx)
    }

    result.push({ item, activeDays, lane })
  }

  return result
}

const DAY_NUMBER_HEIGHT = 32
const TASK_BAR_HEIGHT = 26
const TASK_BAR_GAP = 4

const CalendarGrid = ({ currMonth, monthIndex, calendarItem }: Props) => {
  const rowData = useMemo(() => {
    return currMonth.map((week) => {
      const weekTasks = computeWeekTasks(week, calendarItem)
      const maxLane =
        weekTasks.length > 0 ? Math.max(...weekTasks.map((t) => t.lane)) + 1 : 0
      return { week, weekTasks, maxLane }
    })
  }, [currMonth, calendarItem])

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
          "rounded-xl overflow-hidden",
          "border border-border",
          "bg-white",
          "dark:bg-[#0c0c0c]"
        )}
      >
        {rowData.map(({ week, weekTasks, maxLane }, rowIndex) => {
          const taskAreaHeight = maxLane * (TASK_BAR_HEIGHT + TASK_BAR_GAP)
          const minRowHeight = DAY_NUMBER_HEIGHT + taskAreaHeight + 12

          return (
            <div
              key={rowIndex}
              className="relative grid grid-cols-7"
              style={{ minHeight: Math.max(100, minRowHeight) }}
            >
              {/* Day cells (background + day number) */}
              {week.map((day, colIdx) => (
                <Day
                  key={`${rowIndex}-${colIdx}`}
                  day={day}
                  monthIndex={monthIndex}
                />
              ))}

              {/* Render individual per-day task boxes */}
              {weekTasks.map((wt) =>
                wt.activeDays.map((active, colIdx) => {
                  if (!active) return null

                  const leftPercent = (colIdx / 7) * 100
                  const widthPercent = 100 / 7
                  const topPx =
                    DAY_NUMBER_HEIGHT + wt.lane * (TASK_BAR_HEIGHT + TASK_BAR_GAP)

                  return (
                    <CalendarTask
                      key={`${wt.item.taskId}-${rowIndex}-${colIdx}`}
                      item={wt.item}
                      style={{
                        position: "absolute",
                        left: `calc(${leftPercent}% + 3px)`,
                        width: `calc(${widthPercent}% - 6px)`,
                        top: topPx,
                        height: TASK_BAR_HEIGHT,
                      }}
                    />
                  )
                })
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
