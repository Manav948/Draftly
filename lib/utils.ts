import { clsx, type ClassValue } from "clsx"
import { CalendarRange, Clock, Home, Star, User2 } from "lucide-react"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pathsToSoundEffect = {
  ANALOG: "/music/analog.mp3",
  BELL: "/music/bell.mp3",
  BIRD: "/music/bird.mp3",
  CHURCH_BELL: "/music/churchBell.mp3",
  DIGITAL: "/music/digital.mp3",
  FENCY: "/music/fancy.mp3"
} as const

export const topSidebarLinks = [
  {
    href: "/dashboard",
    Icon: Home,
    hoverTextKey: "Home"
  },
  {
    href: "/dashboard/pomodoro",
    Icon: Clock,
    include: "dashboard/pomodoro",
    hoverTextKey: "Pomodoro"
  },
  {
    href: "/dashboard/calendar",
    Icon: CalendarRange,
    hoverTextKey: "Calendar"
  },
  {
    href: "/dashboard/assigned_to_me",
    Icon: User2,
    hoverTextKey: "Assigned-To-Me"
  },
  {
    href: "/dashboard/starred",
    Icon: Star,
    hoverTextKey: "Starred"
  },
]

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year()
  const firstOfMonth = dayjs(new Date(year, month, 1))

  // Convert to Monday-start: Mon=0, Tue=1, ... Sun=6
  const startDow = (firstOfMonth.day() + 6) % 7

  // First day shown on the grid (could be from previous month)
  let current = firstOfMonth.subtract(startDow, "day")

  // Determine number of rows needed (5 or 6)
  const lastOfMonth = firstOfMonth.endOf("month")
  const lastDow = (lastOfMonth.day() + 6) % 7
  const totalDays = startDow + firstOfMonth.daysInMonth() + (6 - lastDow)
  const numRows = Math.ceil(totalDays / 7)

  const daysMatrix: dayjs.Dayjs[][] = []
  for (let row = 0; row < numRows; row++) {
    const week: dayjs.Dayjs[] = []
    for (let col = 0; col < 7; col++) {
      week.push(current)
      current = current.add(1, "day")
    }
    daysMatrix.push(week)
  }

  return daysMatrix
}

export const scrollToHash = (elementId: string) => {
  const element = document.getElementById(elementId);
  element?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};