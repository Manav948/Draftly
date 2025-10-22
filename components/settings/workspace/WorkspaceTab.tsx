import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsWorkspace } from '@/types/extended';
import { Layers, Users2 } from 'lucide-react';
import React from 'react';
import EditWorkspaceCard from './overview/edit/EditWorkspaceCard';

interface Props {
  workspace: SettingsWorkspace;
}

const WorkspaceTab = ({ workspace }: Props) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4">
      <div className="rounded-2xl bg-gradient-to-bl from-background/60 via-background/80 to-background/95 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 backdrop-blur-xl border border-border/30 shadow-lg p-6 transition-all duration-300">

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 flex items-center justify-start gap-2 p-1 rounded-xl bg-gradient-to-r from-muted/60 via-muted/80 to-muted/60 dark:from-zinc-800/50 dark:via-zinc-900/40 dark:to-zinc-800/50 backdrop-blur-sm border border-border/40 shadow-sm">
            
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner transition-all duration-300"
            >
              <Layers size={18} />
              <span>Overview</span>
            </TabsTrigger>

            <TabsTrigger
              value="members"
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-inner transition-all duration-300"
            >
              <Users2 size={18} />
              <span>Members</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fadeIn">
            <EditWorkspaceCard workspace={workspace} />
          </TabsContent>

          <TabsContent value="members" className="animate-fadeIn">
            <div className="p-8 bg-gradient-to-br from-card/80 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-xl border border-border/40 text-center shadow-sm">
              <h1 className="text-xl font-semibold mb-2 text-foreground">Workspace Members</h1>
              <p className="text-muted-foreground">Coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkspaceTab;
