"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

interface Props {
    workspaceId : string
}
const NewTask = () => {
  return (
    <div>
      <Button>
        <Plus size={18} />
      </Button>
    </div>
  )
}

export default NewTask
