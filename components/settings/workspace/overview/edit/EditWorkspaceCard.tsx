import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { SettingsWorkspace } from '@/types/extended';
import React from 'react';
import EditworkspaceImage from './EditworkspaceImage';
import EditWorkspaceData from './EditWorlskspaceData';

interface Props {
  workspace: SettingsWorkspace;
}

const EditWorkspaceCard = ({ workspace }: Props) => {
  return (
    <Card className="border dark:bg-[#0e0707] backdrop-blur-md hover:shadow-lg transition-all duration-300">
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
        <EditWorkspaceData workspace={workspace} />
      </CardContent>
    </Card>
  );
};

export default EditWorkspaceCard;
