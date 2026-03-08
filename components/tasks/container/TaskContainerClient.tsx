"use client"

import dynamic from 'next/dynamic'

const TaskContainerClient = dynamic(() => import('./TaskContainer'), {
  ssr: false
})

export default TaskContainerClient
