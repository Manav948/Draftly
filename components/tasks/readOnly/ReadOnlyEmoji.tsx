"use client"
import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
    selectedEmoji?: string
    className?: string
}
const ReadOnlyEmoji = ({selectedEmoji , className} : Props) => {
  return (
    <div className={cn( `w-12 h-12 rounded-lg dark:bg-blue-500 bg-gray-900 flex items-center justify-center text-3xl px-3 mb-5`,className)}>
        {selectedEmoji}
    </div>
  )
}

export default ReadOnlyEmoji
