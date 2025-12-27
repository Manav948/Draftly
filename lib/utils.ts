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
  const firstDatOfMonth = dayjs(new Date(year, month, 1)).day()
  let currentMonthCount = 1 - firstDatOfMonth

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })
  if (firstDatOfMonth === 1) {
    const firstWeek = daysMatrix[0]
    const previousMonth = month === 0 ? 12 : month - 1;
    const previousYear = month === 0 ? year - 1 : year
    const lastDayOfPreviousMonth = dayjs(new Date(year, previousMonth + 1, 0)).date()

    for (let i = 7 - firstWeek.length; i > 0; i--) {
      const day = lastDayOfPreviousMonth - i - 1;
      firstWeek.unshift(dayjs(new Date(previousYear, previousMonth, day)))
    }
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