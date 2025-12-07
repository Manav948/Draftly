"use client"
import React from 'react'
import { EdgeLabelRenderer } from 'reactflow'

interface Props {
  label?: string,
  labelX: number
  labelY: number
}

const EdgeLabel = ({ label, labelX, labelY }: Props) => {
  return (
    <EdgeLabelRenderer>
      <div
        style={{
          position: "absolute",
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`
        }}
        className="bg-red-400"
      >
        {label}
      </div>
    </EdgeLabelRenderer>
  )
}
export default EdgeLabel