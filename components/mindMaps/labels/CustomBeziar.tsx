"use client"
import React from 'react'
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from 'reactflow'
import EdgeLabel from './EdgeLabel'

interface Props extends EdgeProps { }
const CustomBeziar = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }: Props) => {

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition
    })
    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <EdgeLabel labelX={labelX} labelY={labelY} label={data.label} />
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomBeziar
