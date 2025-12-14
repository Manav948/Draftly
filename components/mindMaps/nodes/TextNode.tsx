"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NodeProps, useReactFlow } from 'reactflow'
import NodeWrapper from './NodeWrapper'
import { useForm } from 'react-hook-form'
import { nodeSchema, NodeSchema } from '@/schema/nodeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import TextAreaAutoSize from "react-textarea-autosize"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NodeColors } from '@/types/enum'
import { useSaveTaskState } from '@/context/TaskSavingContext'
import { useAutoSaveMindMap } from '@/context/AutoSaveMindMap'
import { useDebouncedCallback } from 'use-debounce'

type NodeData = {
    text: string
    colors: NodeColors
    onDelete : () => void
}

const TextNode = ({ data, id }: NodeProps<NodeData>) => {

    const { setNodes } = useReactFlow()
    const { onSaved } = useAutoSaveMindMap();
    const { onSetStatus } = useSaveTaskState()

    const debouncedMindMapInfo = useDebouncedCallback(() => {
        onSetStatus("pending")
        onSaved()
    }, 3000)

    const onSaveNode = useCallback((nodeId: string, nodeText: string) => {
        setNodes((prevNodes) => {
            const nodes = prevNodes.map((node) => node.id === nodeId
                ? { ...node, data: { ...node.data, text: nodeText } } : node
            )
            return nodes
        })
        onSetStatus("unsaved")
        debouncedMindMapInfo()
    }, [setNodes , onSetStatus , debouncedMindMapInfo])

    const [isEdit, setIsEdit] = useState(false);
    const _nodeText = useRef<HTMLTextAreaElement>(null)

    const form = useForm<NodeSchema>({
        resolver: zodResolver(nodeSchema),
        defaultValues: ({
            text: "Add new Text",
        })
    })

    const onIsEdit = () => {
        setIsEdit((prev) => !prev)
    }
    const onSubmit = (data: NodeSchema) => {
        onSaveNode(id, data.text)
        onIsEdit();

    }
    useEffect(() => {
        form.reset({
            text: data.text ? data.text.toString() : "Add new Text"
        })
    }, [data.text, form, isEdit])

    const { ref: nodeText, ...rest } = form.register("text")

    return <NodeWrapper nodeId={id} color={data.colors} isEditing={true} onIsEdit={onIsEdit} onDelete={data.onDelete}>
        <div className={cn(
            "relative w-[220px] rounded-lg border px-3 py-2 transition-all duration-200",
        )}>
            {isEdit ? (
                <form
                    id="node-text-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-2 animate-in fade-in zoom-in-95'
                >
                    <div className='space-y-1.5'>
                        <TextAreaAutoSize {...rest}
                            ref={(e) => {
                                nodeText(e)
                                _nodeText.current = e
                            }}
                            placeholder='Enter a Text'
                            className=' w-full resize-none bg-transparent border-none text-sm font-semibold leading-relaxed focus:outline-none placeholder:text-muted-foreground'
                        />
                    </div>
                    <div className='w-full flex justify-end pt-1 gap-2'>
                        <Button
                            type='button'
                            onClick={onIsEdit}
                            variant={"ghost"}
                            className='h-7 px-2'
                            size={"sm"}
                        >
                            Cancel
                        </Button>

                        <Button
                            type='submit'
                            className='h-7 px-3'
                            size={"sm"}
                            variant={"ghost"}
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            ) :
                <p
                    className=' text-sm font-medium break-words leading-relaxed cursor-pointer'>
                    {data.text ? data.text : "Add new Text"}
                </p>
            }
        </div>
    </NodeWrapper>
}

export default TextNode
