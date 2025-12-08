"use client"
import React from 'react'
import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getSmoothStepPath
} from 'reactflow'
import EdgeLabel from './EdgeLabel'
import { EdgeColors } from '@/types/enum'

interface Props extends EdgeProps { }
const CustomStepRounded = ({ id,
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
        borderRadius: 0,


    })
    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <EdgeLabel labelX={labelX} labelY={labelY} label={data?.label}   color={data?.color ?? EdgeColors.DEFAULT} />
            </EdgeLabelRenderer>
        </>
    )
}

export default CustomStepRounded
