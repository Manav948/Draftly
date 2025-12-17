import { clsx, type ClassValue } from "clsx"
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