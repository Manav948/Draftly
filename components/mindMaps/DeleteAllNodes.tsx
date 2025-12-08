"use client"
import React, { useState } from 'react'
import { HoverCard, HoverCardContent } from '../ui/hover-card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import Warning from '../ui/warning'

const DeleteAllNodes = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <HoverCard openDelay={250} closeDelay={250}>
                    <DialogTrigger>
                        <Button onClick={() => setOpen(true)} variant={"ghost"} size={"icon"}>
                            <Trash2 size={16} />
                        </Button>
                    </DialogTrigger>
                    <HoverCardContent align='start'>Delete all nodes</HoverCardContent>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete</DialogTitle>
                            <DialogDescription>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quae eius praesentium perferendis deleniti? Qui?</DialogDescription>
                            <Warning>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, unde. Ea quidem minima labore quibusdam.
                                </p>
                            </Warning>
                        </DialogHeader>
                    </DialogContent>
                </HoverCard>
            </Dialog>
        </div>
    )
}

export default DeleteAllNodes
