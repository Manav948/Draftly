"use client"
import { cn } from '@/lib/utils'
import { EdgeColors } from '@/types/enum'
import React, { useMemo } from 'react'
import { EdgeLabelRenderer } from 'reactflow'

interface Props {
  label?: string,
  labelX: number
  labelY: number
  color: EdgeColors
}

const EdgeLabel = ({ label, labelX, labelY, color }: Props) => {
  const edgeColor = useMemo(() => {
    switch (color) {
      case EdgeColors.PURPLE:
        return "bg-purple-600 hover:bg-purple-500 text-white"
      case EdgeColors.BLUE:
        return "bg-blue-600 hover:bg-blue-500 text-white"
      case EdgeColors.CYAN:
        return "bg-cyan-600 hover:bg-cyan-500 text-white"
      case EdgeColors.FUCHSIA:
        return "bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
      case EdgeColors.GREEN:
        return "bg-green-600 hover:bg-green-500 text-white"
      case EdgeColors.INDIGO:
        return "bg-indigo-600 hover:bg-indigo-500 text-white"
      case EdgeColors.LIME:
        return "bg-lime-600 hover:bg-lime-500 text-white"
      case EdgeColors.ORANGE:
        return "bg-orange-600 hover:bg-orange-500 text-white"
      case EdgeColors.PINK:
        return "bg-pink-600 hover:bg-pink-500 text-white"
      case EdgeColors.RED:
        return "bg-red-600 hover:bg-red-500 text-white"
      case EdgeColors.YELLOW:
        return "bg-yellow-600 hover:bg-yellow-500 text-white"
      default:
        return "bg-secondary hover:bg-secondary-500"
    }
  }, [color])
  return (
    <EdgeLabelRenderer>
      <div
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`
        }}
        className={cn(`${edgeColor} font-semibold text-sm px-3 py-1.5 rounded-sm max-w-[13rem]`)}
      >
        {label}
      </div>
    </EdgeLabelRenderer>
  )
}
export default EdgeLabel