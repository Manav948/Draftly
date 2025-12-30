"use client"
import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { UserAvatar } from '@/components/ui/user-avatar'
import { AssignedToTaskUser } from '@/types/extended'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CheckCheckIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
    user: AssignedToTaskUser
    taskId: string,
    workspaceId: string
}
const CommandUser = ({ user, taskId, workspaceId }: Props) => {
    const router = useRouter()
    const [isActiveUser, setIsActiveUser] = useState(
        user.user.assignedToTasks?.length === 1 ? true : false
    )
    const queryClient = useQueryClient()

    const { mutate: hadndleTaskAssignment } = useMutation({
        mutationFn: async () => {
            await axios.post(`/api/assigned_to/tasks/assign`, {
                taskId,
                workspaceId,
                assignedToUserId: user.user.id
            })
        },
        onMutate: async () => {
            //@ts-ignore
            await queryClient.cancelQueries(["getAssignedToTaskInfo"])
            setIsActiveUser((prev) => !prev)
        },
        onError: (err: AxiosError) => {
            setIsActiveUser((prev) => !prev)
            const error = err.response?.data ? err.response.data : "User not Found"
            console.log(err)
            toast.error("Task not Assigned")
        },
        onSuccess: () => {
            toast.success("Task Assigned SuccessFully")
            router.refresh()
        }, onSettled: () => {
            // @ts-ignore
            queryClient.invalidateQueries(["getAssignedToTaskInfo"])
        }
    })
    return (
        <div>
            <CommandItem className='p-0'>
                <Button
                    onClick={() => {
                        hadndleTaskAssignment()
                    }}
                    size={"sm"}
                    variant={"ghost"}
                    className='w-full h-fit justify-between px-2 py-1.5 text-xs'
                >
                    <div className='flex items-center gap-2'>
                        <UserAvatar
                            profileImage={user.user.image}
                            className='w-10 h-10'
                            size={40}
                        />
                        <p className='text-secondary-foreground text-[15px] pl-3'>{user.user.username}</p>
                    </div>
                    {isActiveUser && <CheckCheckIcon className='text-primary' size={16}     />}
                </Button>
            </CommandItem>
        </div>
    )
}

export default CommandUser
