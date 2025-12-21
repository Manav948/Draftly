import { clsx, type ClassValue } from "clsx"
import { CalendarRange, Clock, Home, Star, User2 } from "lucide-react"
import { twMerge } from "tailwind-merge"

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
    href : "/dashboard",
    Icon : Home,
    hoverTextKey : "Home"
  },
  {
    href : "/dashboard/pomodoro",
    Icon : Clock,
    hoverTextKey : "Pomodoro"
  },
  {
    href : "/dashboard/calendar",
    Icon : CalendarRange,
    hoverTextKey : "Calendar"
  },
  {
    href : "/dashboard/assigned_to_me",
    Icon : User2,
    hoverTextKey : "Assigned-To-Me"
  },
  {
    href : "/dashboard/starred",
    Icon : Star,
    hoverTextKey : "Starred"
  }, 
]