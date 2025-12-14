"use client"
import React, { useState } from 'react'
import { HoverCard, HoverCardContent } from '../ui/hover-card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import Warning from '../ui/warning'
import { useReactFlow } from 'reactflow'
import { useSaveTaskState } from '@/context/TaskSavingContext'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { LoadingState } from '../ui/LoadingState'

interface Props {
    workspaceId: string,
    mindMapId: string
}
const DeleteAllNodes = ({ workspaceId, mindMapId }: Props) => {
    const [open, setOpen] = useState(false)
    const { setNodes, getNodes } = useReactFlow()
    const { onSetStatus, status } = useSaveTaskState()

    const { mutate: updateMindMap, isPending } = useMutation({
        mutationFn: async () => {
            await axios.post(`/api/mind_maps/update`, {
                content: null,
                workspaceId,
                mindMapId
            })
        },
        onSuccess: () => {
            onSetStatus("saved")
            toast.success("All nodes deleted")
            setNodes([])
        },
        onError: () => {
            onSetStatus("unsaved")
            toast.error("Nodes not deleted")
        }
    })
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <HoverCard openDelay={250} closeDelay={250}>
                    <DialogTrigger>
                        <Button disabled={!getNodes().length || status !== "saved"} onClick={() => setOpen(true)} variant={"ghost"} size={"icon"}>
                            <Trash2 size={16} />
                        </Button>
                    </DialogTrigger>
                    <HoverCardContent align='start'>Delete</HoverCardContent>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete all Files</DialogTitle>
                            <DialogDescription> This action cannot be undone.</DialogDescription>
                            <Warning>
                                <p>
                                    All nodes and connections in this mind map will
                                    be permanently removed. Make sure everything is
                                    saved before continuing.
                                </p>
                            </Warning>
                            <Button disabled={isPending} onClick={() => updateMindMap()} size={"lg"} variant={"destructive"}>
                                {isPending ? (<LoadingState loadingText='Deleting...' />) : "Reset Nodes"}
                            </Button>
                        </DialogHeader>
                    </DialogContent>
                </HoverCard>
            </Dialog>
        </div>
    )
}

export default DeleteAllNodes
