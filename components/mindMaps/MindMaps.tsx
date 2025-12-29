"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
    Panel,
    ReactFlowJsonObject
} from 'reactflow'

import "reactflow/dist/style.css"
import CustomBeziar from './labels/CustomBeziar'
import CustomStaraight from './labels/CustomStraight'
import CustomStepRounded from './labels/CustomStepRounded'
import CustomStepSharp from './labels/CustomStepSharp'
import { Sheet } from '../ui/sheet'
import { EdgeOptionSchema } from '@/schema/edgeOptionsSchema'
import { NodeColors } from '@/types/enum'
import { MindMap as MindMapType, Tag } from '@prisma/client'
import { useDebouncedCallback } from 'use-debounce'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { LoadingScreen } from '../common/LoadingScreen'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { PlusSquare, SaveIcon } from 'lucide-react'
import DeleteAllNodes from './DeleteAllNodes'
import { useAutoSaveMindMap } from '@/context/AutoSaveMindMap'
import { useSaveTaskState } from '@/context/TaskSavingContext'
import { Separator } from '../ui/separator'
import MindMapTagSelector from './MindMapTagSelector'
import EditInfo from './editInfo/EditInfo'
import { ExtendedMindMap } from '@/types/extended'
import { color } from '@/schema/workSpaceSchema'

interface Props {
    initialInfo: ExtendedMindMap,
    workspaceId: string
    canEdit: boolean
    initialActiveTag: Tag[]
}

const MindMaps = ({ initialInfo, workspaceId, canEdit, initialActiveTag }: Props) => {
    const [clickedEdge, setClickedEdge] = useState<Edge | null>(null)
    const [openSheet, setOpenSheet] = useState(false)
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const nodeTypes = useMemo(() => ({ textNode: TextNode }), [])
    const [isMounted, setIsMounted] = useState(false);
    const [isEdit, setIdEdit] = useState(canEdit)

    const { setRfInstance, onSaved, onSetIds } = useAutoSaveMindMap();
    const { onSetStatus } = useSaveTaskState()


    const debouncedMindMapInfo = useDebouncedCallback(() => {
        onSetStatus("pending")
        onSaved()
    }, 3000)

    const { mutate: updateMindMap } = useMutation({
        mutationFn: async (flow: ReactFlowJsonObject) => {
            await axios.post(`/api/mind_maps/update`, {
                content: flow,
                workspaceId,
                mindMapId: initialInfo.id
            })
        },
        onError: (err: AxiosError) => {
            console.log(err)
            toast.error("MindMap not Updated")
        },
        onSuccess: () => {
            toast.success("MindMap Updated Successfully")
        }
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {

        if (!initialInfo) return;

        const { content } = initialInfo;

        if (content) {
            const { nodes = [], edges = [] } =
                content as unknown as ReactFlowJsonObject;

            setNodes(nodes);
            setEdges(edges);
        }
        onSetIds(initialInfo.id, workspaceId)

    }, [initialInfo, onSetIds, workspaceId, initialInfo.id]);
    const AddNode = useCallback(() => {
        const newNode = {
            id: Math.random().toString(),
            type: "textNode",
            position: { x: 0, y: 0 },
            data: { text: "test", color : NodeColors.CYAN}
        }
        setNodes((nds) => nds.concat(newNode))
        onSetStatus("unsaved")
        debouncedMindMapInfo()
    }, [onSetStatus, debouncedMindMapInfo])

    const onNodeDrag = useCallback(() => {
        onSetStatus("unsaved")
        debouncedMindMapInfo()
    }, [])

    const onNodeDelete = useCallback(() => {
        onSetStatus("unsaved"),
            debouncedMindMapInfo()
    }, [])

    const onNodeChage = useCallback((changes: any) => {
        setNodes((nds) => {
            return applyNodeChanges(changes, nds)
        })
    }, [])

    useEffect(() => {
        setIdEdit(canEdit)
    }, [canEdit])

    const onEdgeChage = useCallback((changes: any) => {
        setEdges((eds) => {
            return applyEdgeChanges(changes, eds)
        })
    }, [])

    const onEdgeClick = useCallback((event: React.MouseEvent, edges: Edge) => {
        if (!isEdit) return
        setClickedEdge(edges)
        setOpenSheet(true)
    }, [isEdit])

    const onConnect: OnConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
        onSetStatus("unsaved")
        debouncedMindMapInfo()
    }, [onSetStatus, debouncedMindMapInfo])

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
        onSetStatus("unsaved")
        debouncedMindMapInfo()
    }, [debouncedMindMapInfo, onSetStatus]);

    const onDeleteEdge = useCallback((edgeId: string) => {
        setEdges((prev) => {
            const edges = prev.filter((edge) => edge.id !== edgeId)
            return edges
        })
        setOpenSheet(false)
        onSetStatus("unsaved")
        debouncedMindMapInfo()
    }, [onSetStatus, debouncedMindMapInfo])

    if (!isMounted) return <LoadingScreen />
    return (
        <div className='w-full h-full flex flex-col dark:text-white'>
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
            <div className='w-full h-full relative'>
                <ReactFlow
                    className='w-full h-full'
                    fitView
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    onInit={setRfInstance}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onNodesChange={onNodeChage}
                    onEdgesChange={onEdgeChage}
                    onConnect={onConnect}
                    onEdgeClick={onEdgeClick}
                    onNodeDrag={onNodeDrag}
                    onNodesDelete={onNodeDelete}
                    connectOnClick={isEdit}
                    edgesUpdatable={isEdit}
                    edgesFocusable={isEdit}
                    nodesDraggable={isEdit}
                    nodesConnectable={isEdit}
                    nodesFocusable={isEdit}
                    elementsSelectable={isEdit}
                >
                    {isEdit && (
                        <Panel position='top-left' className='bg-background z-50 shadow-sm border rounded-sm py-0.5 px-3' >
                            <div className='w-full flex gap-2'>
                                <HoverCard openDelay={250} closeDelay={250}>
                                    <HoverCardTrigger asChild>
                                        <Button variant={"ghost"} size={"icon"} onClick={AddNode}>
                                            <PlusSquare size={16} />
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent align='start'>Add Node</HoverCardContent>
                                </HoverCard>

                                <EditInfo
                                    workspaceId={workspaceId}
                                    icon={initialInfo.emoji}
                                    title={initialInfo.title}
                                    mapId={initialInfo.id}
                                />

                                <HoverCard openDelay={250} closeDelay={250}>
                                    <HoverCardTrigger asChild>
                                        <Button variant={"ghost"} size={"icon"} onClick={() => {
                                            onSetStatus("pending")
                                            onSaved()
                                        }}
                                        >
                                            <SaveIcon size={16} />
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent align='start'>Save</HoverCardContent>
                                </HoverCard>

                                <DeleteAllNodes workspaceId={workspaceId} mindMapId={initialInfo.id} />
                                <div>
                                    <Separator orientation='vertical' />
                                </div>
                                <MindMapTagSelector
                                    workspaceId={workspaceId}
                                    initialActiveTag={initialActiveTag}
                                    mindMapId={initialInfo.id}
                                    isMounted={isMounted}
                                />
                            </div>
                        </Panel>
                    )}
                    <Background />
                </ReactFlow>

            </div>
        </div>
    )
}

export default MindMaps
