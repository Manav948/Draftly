import React from 'react'
import TaskContainer from '../container/TaskContainer'

interface Props {
    workspaceId: string
    taskId : string
}
const NewTask = ({ workspaceId , taskId }: Props) => {
    return (
        <div className=''>
            <TaskContainer workspaceId={workspaceId} initialActiveTags={[]} taskId={taskId} />
        </div>
    )
}

export default NewTask
