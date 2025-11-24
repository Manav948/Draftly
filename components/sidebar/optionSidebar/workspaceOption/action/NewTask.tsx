"use client"
import { Button } from '@/components/ui/button'
import { LoadingState } from '@/components/ui/LoadingState'
import { Task } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
  workspaceId: string
}
const NewTask = ({ workspaceId }: Props) => {
  const router = useRouter()
  const { mutate: newTask, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/task/new`, {
        workspaceId
      })
      return data;
    },
    onError: (err: AxiosError) => {
      const error = err.response?.data ? err.response.data : "task not Created"
      toast.error("Task has not created")
    },
    onSuccess: (data: Task) => {
      toast.success("Task has been created")
      router.push(`/dashboard/workspace/${workspaceId}/tasks/task/${data.id}/edit`)
    },
    mutationKey: ["newTask"]
  })
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          newTask()
        }}
        className='justify-start items-center gap-3'
        variant={"ghost"}
        size={"sm"}
      >
        <Plus size={18} />
        {isPending ? <LoadingState /> : "Add Task"}
      </Button>
    </div>
  )
}

export default NewTask
