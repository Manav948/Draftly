"use client"
import React, { useEffect, useRef, useState } from 'react'
import { NodeProps } from 'reactflow'
import NodeWrapper from './NodeWrapper'
import { useForm } from 'react-hook-form'
import { nodeSchema, NodeSchema } from '@/schema/nodeSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import TextAreaAutoSize from "react-textarea-autosize"
import { Button } from '@/components/ui/button'
import useOnEditNode from '@/hooks/react-flow/useOnEditNode'
import { cn } from '@/lib/utils'

type NodeData = {
    text: string
}

const TextNode = ({ data, id }: NodeProps<NodeData>) => {
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
        onEditNode(id, data.text)
        onIsEdit();

    }
    useEffect(() => {
        form.reset({
            text: data.text ? data.text.toString() : "Add new Text"
        })
    }, [data.text, form, isEdit])

    const { ref: nodeText, ...rest } = form.register("text")

    const { onEdit: onEditNode } = useOnEditNode()

    return <NodeWrapper isEditing={true} onIsEdit={onIsEdit}>
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
