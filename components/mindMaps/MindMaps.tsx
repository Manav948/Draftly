"use client"
import React, { useCallback, useMemo, useState } from 'react'
import { Dialog } from '../ui/dialog'
import { Button } from '../ui/button'
import EdgeOptions from './EdgeOptions'
import TextNode from './nodes/TextNode'
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    Edge,
    EdgeTypes,
    Node,
    OnConnect
} from 'reactflow'

import "reactflow/dist/style.css"
import { CupSoda } from 'lucide-react'
import CustomBeziar from './labels/CustomBeziar'
import customStaraight from './labels/CustomStraight'
import CustomStaraight from './labels/CustomStraight'
import CustomStepRounded from './labels/CustomStepRounded'
import CustomStepSharp from './labels/CustomStepSharp'
import { Sheet } from '../ui/sheet'
import { EdgeOptionSchema } from '@/schema/edgeOptionsSchema'

const initialNodes: Node[] = [
    {
        id: "1",
        data: { label: "Node 1" },
        position: { x: 5, y: 5 }
    },
    {
        id: "2",
        data: { label: "Node 2" },
        position: { x: 5, y: 100 }
    },
    {
        id: "node-1",
        type: "textNode",
        data: { value: 123 },
        position: { x: 0, y: 0 }
    }
];

const initialEdges: Edge[] = [
    {
        id: "1-2", source: "1", target: "2", label: "to-the", type: "step", animated: true
    }
]

const MindMaps = () => {
    const [clickedEdge, setClickedEdge] = useState<Edge | null>(null)
    const [openSheet, setOpenSheet] = useState(false)
    const [nodes, setNodes] = useState<Node[]>(initialNodes)
    const [edges, setEdges] = useState<Edge[]>(initialEdges)
    const nodeTypes = useMemo(() => ({ textNode: TextNode }), [])

    const onAddNode = useCallback(() => {
        setNodes((prev) => {
            return [
                ...prev,
                {
                    id: Math.random().toString(),
                    type: "textNode",
                    position: { x: 0, y: 0 },
                    data: { label: "test" }

                }
            ]
        })
    }, [])

    const onNodeChage = useCallback((changes: any) => {
        setNodes((nds) => {
            return applyNodeChanges(changes, nds)
        })
    }, [])

    const onEdgeChage = useCallback((changes: any) => {
        setEdges((eds) => {
            return applyEdgeChanges(changes, eds)
        })
    }, [])

    const onEdgeClick = useCallback((event: React.MouseEvent, edges: Edge) => {
        setClickedEdge(edges)
        setOpenSheet(true)
    }, [])

    const onConnect: OnConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    }, [])

    const edgeTypes: EdgeTypes = {
        customBeziar: CustomBeziar,
        customStaraight: CustomStaraight,
        customStepRounded: CustomStepRounded,
        customStepSharp: CustomStepSharp
    }
    const nodeType = { textNode: TextNode }

    const onSaveChange = useCallback((data: EdgeOptionSchema) => {
        console.log(data)
    }, [])

    const onDeleteChange = useCallback((edgeId: string) => {
        console.log(edgeId)
    }, [])

    return (
        <div className='w-full h-full flex flex-col'>
            {clickedEdge && (
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <EdgeOptions
                        clickedEdge={clickedEdge}
                        isOpen={openSheet}
                        onSave={onSaveChange}
                        onDeleteLabel={onDeleteChange}
                    />
                </Sheet>
            )}
            <div>
                <Button>Add</Button>
            </div>
            <div className='h-full'>
                <ReactFlow
                    fitView
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodeChage}
                    onEdgesChange={onEdgeChage}
                    onConnect={onConnect}
                    onEdgeClick={onEdgeClick}
                >
                    <Background />
                    <Controls />
                </ReactFlow>

            </div>
        </div>
    )
}

export default MindMaps
