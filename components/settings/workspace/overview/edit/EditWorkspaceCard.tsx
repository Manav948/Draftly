import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { SettingsWorkspace } from '@/types/extended';
import React from 'react';
import EditworkspaceImage from './EditworkspaceImage';

interface Props {
  workspace: SettingsWorkspace;
}

const EditWorkspaceCard = ({ workspace }: Props) => {
  return (
    <Card className="border border-border/40 shadow-md rounded-2xl bg-gradient-to-br from-card/80 to-background/70 dark:from-gray-950 dark:via-gray-900 dark:to-black/50 backdrop-blur-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground bg-gradient-to-r from-primary to-purple-500 bg-clip-text">
          Edit Workspace
        </h1>
        <CardDescription className="text-base dark:text-white">
          Update your workspace details, name, and image.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <EditworkspaceImage workspace={workspace} />
      </CardContent>
    </Card>
  );
};

export default EditWorkspaceCard;
