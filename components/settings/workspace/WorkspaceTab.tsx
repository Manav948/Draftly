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

const WorkspaceTab = ({ workspace, workspaceId }: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-8 md:mt-12 px-4 sm:px-6 mb-24">
      <div className="flex flex-col gap-8 md:gap-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#f0f0f0]">
            Workspace Settings
          </h1>
          <p className="text-gray-500 dark:text-[#888] mt-2 text-sm sm:text-base">
            Manage your workspace preferences, members, and advanced settings.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full flex flex-col gap-8">
          {/* Horizontal Tab Navigation */}
          <div className="w-full border-b border-gray-200 dark:border-[#222]">
            <TabsList className="flex h-auto w-full justify-start gap-6 bg-transparent p-0">
              {/* Overview Tab */}
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 pb-4 pt-2 px-1 rounded-none font-medium text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 data-[state=active]:bg-transparent data-[state=active]:text-red-600 dark:data-[state=active]:text-red-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-red-600 dark:data-[state=active]:border-red-500 transition-colors"
              >
                <Layers size={16} />
                <span>Overview</span>
              </TabsTrigger>

              {/* Members Tab */}
              <TabsTrigger
                value="members"
                className="flex items-center gap-2 pb-4 pt-2 px-1 rounded-none font-medium text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 data-[state=active]:bg-transparent data-[state=active]:text-red-600 dark:data-[state=active]:text-red-500 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-red-600 dark:data-[state=active]:border-red-500 transition-colors"
              >
                <Users2 size={16} />
                <span>Members</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content Area */}
          <div className="w-full min-w-0">
            {/* Overview Content */}
            <TabsContent value="overview" className="animate-fadeIn space-y-8 mt-0 border-none p-0 outline-none">
              <EditWorkspaceCard workspace={workspace} />
              <DeleteWorkspace workspace={workspace} />
            </TabsContent>

            {/* Members Content */}
            <TabsContent value="members" className="animate-fadeIn mt-0 border-none p-0 outline-none">
              <MembersCard workspace={workspace} workspaceId={workspaceId} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceTab;
