"use client"
import React from 'react'
import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getSmoothStepPath
} from 'reactflow'
import EdgeLabel from './EdgeLabel'

interface Props extends EdgeProps { }
const CustomStepSharp = ({ id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    style = {},
    markerEnd }: Props) => {

    const [edgePath, labelX, labelY] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    })
    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <EdgeLabel labelX={labelX} labelY={labelY} label={data.label} />
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomStepSharp
