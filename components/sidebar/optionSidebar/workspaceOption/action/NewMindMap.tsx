"use client"
import { Button } from '@/components/ui/button'
import { LoadingState } from '@/components/ui/LoadingState'
import { MindMap, Task } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface Props {
  workspaceId: string
}
const NewMindMap = ({ workspaceId }: Props) => {
  const router = useRouter()
  const { mutate: newMindMap, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/mind_maps/new`, {
        workspaceId
      })
      return data;
    },
    onError: (err: AxiosError) => {
      const error = err.response?.data ? err.response.data : "MindMap not Created"
      toast.error("MindMap has not created")
    },
    onSuccess: (data: MindMap) => {
      toast.success("MindMap has been created")
      router.push(`/dashboard/workspace/${workspaceId}/mind_maps/mind_map/${data.id}/edit`)
    },
    mutationKey: ["newMindMap"]
  })
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={() => {
          newMindMap()
        }}
        className='justify-start items-center'
        variant={"ghost"}
        size={"sm"}
      >
        <Plus size={18} />
        {isPending ? <LoadingState /> : "Add MindMap"}
      </Button>
    </div>
  )
}

export default NewMindMap
