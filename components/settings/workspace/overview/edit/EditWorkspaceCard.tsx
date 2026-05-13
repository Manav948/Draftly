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
    <Card className="bg-white dark:bg-[#0c0c0c] border border-gray-200/60 dark:border-[#1f1f1f] shadow-sm rounded-2xl overflow-hidden transition-all duration-300">
      <CardHeader className="pb-6 border-b border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-[#111]/50">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-[#f0f0f0]">
          General Details
        </h2>
        <CardDescription className="text-sm text-gray-500 dark:text-[#888] mt-1">
          Update your workspace's name, visual identity, and color theme.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-8">
        <EditworkspaceImage workspace={workspace} />
        <div className="w-full h-px bg-gray-100 dark:border-[#1f1f1f]" />
        <EditWorkspaceData workspace={workspace} />
      </CardContent>
    </Card>
  );
};

export default EditWorkspaceCard;
