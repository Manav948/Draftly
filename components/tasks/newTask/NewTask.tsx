import React from 'react'
import TaskContainer from '../container/TaskContainer'

interface Props {
    workspaceId: string
}
const NewTask = ({ workspaceId }: Props) => {
    return (
        <div className=''>
            <TaskContainer workspaceId={workspaceId} initialActiveTags={[]} />
        </div>
    )
}

export default NewTask
