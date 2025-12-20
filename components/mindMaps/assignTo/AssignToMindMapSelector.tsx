"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LoadingState } from '@/components/ui/LoadingState'
import { cn } from '@/lib/utils'
import { UserAssigningToMindMapInfo, UserAssigningToTaskInfo } from '@/types/extended'
import { useQuery } from '@tanstack/react-query'
import { Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import CommandContainer from './CommandContainer'

interface Props {
    className?: string,
    plusIconSize?: number,
    dropDownsideOffSet?: number
    workspaceId: string,
    mindMapId: string
}
const AssignedToMindMapSelector = ({ className, plusIconSize = 16, dropDownsideOffSet, workspaceId, mindMapId }: Props) => {

    const router = useRouter()

    const { data: assignedToUserInfo, isLoading: isLoadingInfo } = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/assigned_to/mind_map/get?workspaceId=${workspaceId}&mindMapId=${mindMapId}`)
            if (!res.ok) return {} as UserAssigningToMindMapInfo;

            const data = await res.json()
            return data as UserAssigningToMindMapInfo
        },
        queryKey: ["getAssignedToTaskInfo"]
    })
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        className={cn(`w-fit h-fit text-xs justify-start text-left px-2.5 py-0.5`, className)}
                    >
                        <Users size={plusIconSize} className='mr-1' />
                        Assign Users
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    sideOffset={dropDownsideOffSet && dropDownsideOffSet}
                >
                    {isLoadingInfo && (
                        <div>
                            <LoadingState />
                        </div>
                    )}
                    {!isLoadingInfo && assignedToUserInfo ? (
                        <CommandContainer users={assignedToUserInfo.Subscribers}
                            mindMapId={mindMapId}
                            workspaceId={workspaceId}
                        />
                    ) : (<>
                        <div className='p-3 items-center justify-center flex flex-col gap-4 text-sm'>
                            <p>Error</p>
                            <Button
                                className='w-full'
                                size={"sm"}
                                variant={"default"}
                                onClick={() => router.refresh()}
                            >
                                Reset
                            </Button>
                        </div>
                    </>)}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default AssignedToMindMapSelector
