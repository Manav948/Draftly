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
    <Card className="bg-white dark:bg-[#0c0c0c] border border-gray-100 dark:border-[#1f1f1f] hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#f0f0f0]">
          Edit Workspace
        </h1>
        <CardDescription className="text-base text-gray-500 dark:text-[#444]">
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
