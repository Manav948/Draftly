"use client"
import React from 'react'
import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getStraightPath
} from 'reactflow'
import EdgeLabel from './EdgeLabel'

interface Props extends EdgeProps { }
const CustomStaraight = ({ id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    data,
    style = {},
    markerEnd }: Props) => {

    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
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

export default CustomStaraight
