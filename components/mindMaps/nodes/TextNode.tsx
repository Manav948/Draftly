"use client"
import React from 'react'
import { NodeProps } from 'reactflow'
import NodeWrapper from './NodeWrapper'

type NodeData = {
    value: number
}

const TextNode = ({ data }: NodeProps<NodeData>) => {
    return <NodeWrapper>
        <div>
            <p> 
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt accusantium ut, provident recusandae corrupti nemo asperiores necessitatibus quas eos in, autem debitis laborum illum vero error nihil odit nostrum exercitationem.
            </p>
        </div>
    </NodeWrapper>
}

export default TextNode
