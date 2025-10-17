import { Tabs, TabsList } from '@/components/ui/tabs';
import { SettingsWorkspace } from '@/types/extended'
import React from 'react'

interface Props {
    workspace: SettingsWorkspace;
}

const WorkspaceTab = ({ workspace }: Props) => {
    return (
        <Tabs defaultValue='overview'>
            <TabsList className='mb-6'>
            
            </TabsList>
        </Tabs>
    )
}

export default WorkspaceTab
