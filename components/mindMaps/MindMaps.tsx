"use client"
import React, { useCallback, useMemo, useState } from 'react'
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
    OnConnect,
    Panel
} from 'reactflow'

import "reactflow/dist/style.css"
import CustomBeziar from './labels/CustomBeziar'
import CustomStaraight from './labels/CustomStraight'
import CustomStepRounded from './labels/CustomStepRounded'
import CustomStepSharp from './labels/CustomStepSharp'
import { Sheet } from '../ui/sheet'
import { EdgeOptionSchema } from '@/schema/edgeOptionsSchema'
import { EdgeColors } from '@/types/enum'


const MindMaps = () => {
    const [clickedEdge, setClickedEdge] = useState<Edge | null>(null)
    const [openSheet, setOpenSheet] = useState(false)
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const nodeTypes = useMemo(() => ({ textNode: TextNode }), [])

    const AddNode = useCallback(() => {
        const newNode = {
            id: Math.random().toString(),
            type: "textNode",
            position: { x: 0, y: 0 },
            data: { text: "test", color: EdgeColors.DEFAULT }
        }
        setNodes((nds) => nds.concat(newNode))
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
        const { animate, label, edgeId, color, type } = data;

        setEdges((prev) =>
            prev.map((edge) =>
                edge.id === edgeId
                    ? {
                        ...edge,
                        type,
                        animated: animate,
                        data: {
                            ...(edge.data ?? {}),
                            label,
                            color,
                        },
                    }
                    : edge
            )
        );

        setOpenSheet(false);
    }, []);


    const onDeleteEdge = useCallback((edgeId: string) => {
        setEdges((prev) => {
            const edges = prev.filter((edge) => edge.id !== edgeId)
            return edges
        })
        setOpenSheet(false)
    }, [])

    return (
        <div className='w-full h-full flex flex-col'>
            {clickedEdge && (
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                    <EdgeOptions
                        clickedEdge={clickedEdge}
                        isOpen={openSheet}
                        onSave={onSaveChange}
                        onDeleteEdge={onDeleteEdge}
                    />
                </Sheet>
            )}
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
                    <Panel position='top-left' className='w-1/2 z-50' >
                    <Button onClick={AddNode}>Add</Button>
                    </Panel>
                    <Background />
                    <Controls />
                </ReactFlow>

            </div>
        </div>
    )
}

export default MindMaps
