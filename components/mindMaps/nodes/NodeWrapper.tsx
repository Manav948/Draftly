"use client"
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { NodeColors } from '@/types/enum';
import { CheckCheck, MoreHorizontal, Pencil } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { Handle, Position, useReactFlow } from 'reactflow';

interface Props {
    nodeId: string
    children: React.ReactNode;
    className?: string;
    color?: NodeColors,
    isEditing: boolean
    onIsEdit: () => void
}

const colors = [
    NodeColors.BLUE,
    NodeColors.CYAN,
    NodeColors.DEFAULT,
    NodeColors.FUCHSIA,
    NodeColors.GREEN,
    NodeColors.INDIGO,
    NodeColors.LIME,
    NodeColors.ORANGE,
    NodeColors.PINK,
    NodeColors.PURPLE,
    NodeColors.RED,
    NodeColors.YELLOW
]
const NodeWrapper = ({ children, className, color, onIsEdit, isEditing, nodeId }: Props) => {

    const { setNodes } = useReactFlow()

    const onSaveNode = useCallback((color: NodeColors) => {
        setNodes((prevNodes) => {
            const nodes = prevNodes.map((node) => node.id === nodeId ? { ...node, data: { ...node.data, color } } : node)

            return nodes
        })
    }, [])
    const [currentColor, setCurrentColor] = useState<NodeColors | undefined>(color)
    const nodeColor = useCallback((color: NodeColors) => {
        switch (color) {
            case NodeColors.PURPLE:
                return "!bg-purple-600 hover:bg-pruple-500 text-white"
            case NodeColors.BLUE:
                return "!bg-blue-600 hover:bg-blue-500 text-white"
            case NodeColors.CYAN:
                return "!bg-cyan-600 hover:bg-cyan-500 text-white"
            case NodeColors.FUCHSIA:
                return "!bg-fuchsia-600 hover:bg-fuchsia-500 text-white"
            case NodeColors.GREEN:
                return "!bg-green-600 hover:bg-green-500 text-white"
            case NodeColors.INDIGO:
                return "!bg-indigo-600 hover:bg-indigo-500 text-white"
            case NodeColors.LIME:
                return "!bg-lime-600 hover:bg-lime-500 text-white"
            case NodeColors.ORANGE:
                return "!bg-orange-600 hover:bg-orange-500 text-white"
            case NodeColors.PINK:
                return "!bg-pink-600 hover:bg-pink-500 text-white"
            case NodeColors.RED:
                return "!bg-red-600 hover:bg-red-500 text-white"
            case NodeColors.YELLOW:
                return "!bg-yellow-600 hover:bg-yellow-500 text-white"
            default:
                return "!bg-secondary hover:bg-secondary-500"
        }
    }, [])

    const onColorSet = useCallback((newColor: NodeColors) => {
        setCurrentColor(newColor)
        onSaveNode(newColor)
    }, [])

    return (
        <div className={cn(`max-w-md text-xs px-3 py-1.5 rounded-sm flex items-start justify-between transition-colors duration-200 gap-2 ${nodeColor(currentColor!)}`, className)}>
            <div className='w-full'>
                {children}
                <>
                    <Handle type='target' position={Position.Left} className={`transition-colors !border-popover duration-200 p-1`} />
                    <Handle type='source' position={Position.Right} className={`transition-colors !border-popover duration-200 p-1`} />
                </>
            </div>
            {isEditing && (

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            className={`w-6 h-6 hover:bg-transparent ${currentColor === NodeColors.DEFAULT ? "" : "text-white hover:text-white"}`}
                        >
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={-10} align='start'>
                        <DropdownMenuItem onClick={() => { onIsEdit() }} className='cursor-pointer gap-2'>
                            <Pencil size={16} />
                        </DropdownMenuItem>
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className='cursor-pointer'>
                                    <span>Color</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className='hover:bg-popover' sideOffset={10}>
                                        <DropdownMenuItem className='grid grid-cols-3 gap-2 focus:bg-popover'>
                                            {colors.map((clr, i) => (
                                                <Button
                                                    key={i}
                                                    onClick={() => onColorSet(clr)}
                                                    className={`w-5 h-5 p-1 rounded-full ${nodeColor(clr)}`}
                                                >
                                                    {clr === currentColor && <CheckCheck size={16} className={`${clr !== NodeColors.DEFAULT ? "text-white" : ""}`} />}
                                                </Button>
                                            ))}
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            More
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default NodeWrapper
