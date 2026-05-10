"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsWorkspace } from '@/types/extended';
import { Layers, Users2 } from 'lucide-react';
import React from 'react';
import EditWorkspaceCard from './overview/edit/EditWorkspaceCard';
import DeleteWorkspace from './overview/DeleteWorkspace';
import { Separator } from '@/components/ui/separator';
import MembersCard from './members/MembersCard';

interface Props {
  workspace: SettingsWorkspace;
  workspaceId : string
}

const WorkspaceTab = ({ workspace , workspaceId }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* Outer Card */}
      <div className="rounded-2xl bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-red-500 border border-gray-100 dark:border-[#1f1f1f] shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">

        <Tabs defaultValue="overview" className="w-full">
          {/* Tab List */}
          <TabsList className="mb-6 flex items-center justify-start gap-2 sm:gap-4 p-1 sm:p-3 rounded-xl bg-gray-50 dark:bg-[#0c0c0c] text-gray-900 dark:text-red-500 border border-gray-100 dark:border-[#1f1f1f] shadow-inner">
            
            {/* Overview Tab */}
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 px-4 py-4 rounded-lg font-medium text-sm sm:text-base text-gray-500 dark:text-muted-foreground"
            >
              <Layers size={18} />
              <span>Overview</span>
            </TabsTrigger>

            {/* Members Tab */}
            <TabsTrigger
              value="members"
              className="flex items-center gap-2 px-4 py-4 rounded-lg font-medium text-sm sm:text-base text-gray-500 dark:text-muted-foreground"
            >
              <Users2 size={18} />
              <span>Members</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Content */}
          <TabsContent value="overview" className="animate-fadeIn space-y-6">
            <EditWorkspaceCard workspace={workspace} />
            <Separator />
            <DeleteWorkspace workspace={workspace} />
          </TabsContent>

          {/* Members Content */}
          <TabsContent value="members" className="animate-fadeIn">
            <div className="p-8 bg-gray-50 dark:bg-[#0c0c0c] text-gray-900 dark:text-red-500 rounded-xl border border-gray-100 dark:border-[#1f1f1f] text-center shadow-md transition-all duration-300 hover:shadow-lg">
              <MembersCard workspace={workspace} workspaceId={workspaceId} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceTab;
