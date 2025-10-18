import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsWorkspace } from '@/types/extended'
import { Layers,Users2 } from 'lucide-react';
import React from 'react'
import EditWorkspaceCard from './overview/edit/EditWorkspaceCard';

interface Props {
    workspace: SettingsWorkspace;
}

const WorkspaceTab = ({ workspace }: Props) => {
    return (
        <Tabs defaultValue='overview'>
            <TabsList className='mb-6'>
                <TabsTrigger value='overview' className='flex mr-2 items-center gap-2'>
                    <Layers size={18}/>
                    Overview
                </TabsTrigger>
                <TabsTrigger value='members' className='flex mr-2 items-center gap-2'>
                    <Users2 size={18}/>
                    Members
                </TabsTrigger>
            </TabsList>
            <TabsContent tabIndex={1} value='overview'>
                <EditWorkspaceCard workspace={workspace} />
            </TabsContent>
            <TabsContent value='members'>
                <h1>Members Content</h1>
            </TabsContent>
        </Tabs>
    )
}

export default WorkspaceTab
