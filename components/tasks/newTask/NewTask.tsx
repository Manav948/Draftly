import Editor from '@/components/editor/Editor'
import React from 'react'

interface Props {
    workspaceId: string
}
const NewTask = ({ workspaceId }: Props) => {
    return (
        <div>
            <Editor workspaceId={workspaceId} initialActiveTags={[]} />
        </div>
    )
}

export default NewTask
