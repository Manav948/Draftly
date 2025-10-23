import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsWorkspace } from '@/types/extended';
import { Layers, Users2 } from 'lucide-react';
import React from 'react';
import EditWorkspaceCard from './overview/edit/EditWorkspaceCard';
import DeleteWorkspace from './overview/DeleteWorkspace';
import { Separator } from '@/components/ui/separator';

interface Props {
  workspace: SettingsWorkspace;
}

const WorkspaceTab = ({ workspace }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 sm:px-6">
      {/* Outer Card */}
      <div className="rounded-2xl bg-gradient-to-br from-background/70 via-background/90 to-background/95 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 backdrop-blur-xl border border-border/40 shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">

        <Tabs defaultValue="overview" className="w-full">
          {/* Tab List */}
          <TabsList className="mb-6 flex items-center justify-start gap- sm:gap-4 p-1 sm:p-3 rounded-xl bg-gradient-to-r from-muted/60 via-muted/80 to-muted/60 dark:from-zinc-800/60 dark:via-zinc-900/60 dark:to-zinc-800/60 backdrop-blur-md border border-border/40 shadow-inner">
            
            {/* Overview Tab */}
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 px-4 py-4 rounded-lg font-medium text-sm sm:text-base text-muted-foreground"
            >
              <Layers size={18} />
              <span>Overview</span>
            </TabsTrigger>

            {/* Members Tab */}
            <TabsTrigger
              value="members"
              className="flex items-center gap-2 px-4 py-4 rounded-lg font-medium text-sm sm:text-base text-muted-foreground"
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
            <div className="p-8 bg-gradient-to-br from-card/70 via-card/90 to-card/100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-xl border border-border/40 text-center shadow-md transition-all duration-300 hover:shadow-lg">
              <h1 className="text-xl font-semibold mb-2 text-foreground">Workspace Members</h1>
              <p className="text-muted-foreground">Feature coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceTab;
