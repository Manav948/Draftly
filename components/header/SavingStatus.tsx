"use client"
import React, { useEffect, useState } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { useSaveTaskState } from '@/context/TaskSavingContext'
import { FileWarning, Save } from 'lucide-react'
import { LoadingState } from '../ui/LoadingState'
import { cn } from '@/lib/utils'

const SavingStatus = () => {
    const { status } = useSaveTaskState()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    return (
        <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
                <div className={cn(`px-3 h-9 justify-center items-center rounded-md font-semibold gap-2 text-sm bg-primary text-white ${status === "pending" ? "bg-yellow-400" : ""} ${status === "unsaved" ? "bg-red-500" : ""}`)}>
                    {status === "saved" && (
                        <>
                            <Save size={16} />
                            <p>Saved</p>
                        </>
                    )}

                    {status === "pending" && (
                        <>
                            <FileWarning size={16} />
                            <p>Not Saved</p>
                        </>
                    )}
                    {status === "unsaved" && (
                        <>
                            <LoadingState />
                            <p>Saving</p>
                        </>
                    )}
                </div>

            </HoverCardTrigger>
            <HoverCardContent>
                we Save Your Files Automatically
            </HoverCardContent>
        </HoverCard>
    )
}

export default SavingStatus
