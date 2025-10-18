import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { SettingsWorkspace } from '@/types/extended'
import React from 'react'
import EditworkspaceImage from './EditworkspaceImage'

interface Props {
    workspace: SettingsWorkspace
}

const EditWorkspaceCard = ({ workspace }: Props) => {
    return (
        <Card>
            <CardHeader>
                <h1 className='text-2xl font-semibold leading-none tracking-tight'>Edit Workspace</h1>
                <CardDescription className='text-base break-words'>
                    some content to edit the workspace details
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <EditworkspaceImage workspace={workspace} />
            </CardContent>
        </Card>
    )
}

export default EditWorkspaceCard
