import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { SettingsWorkspace } from '@/types/extended'
import { useTranslations } from 'next-intl'
import React from 'react'
import MembersTable from './MembersTable'
import { cn } from '@/lib/utils'

interface Props {
  workspace: SettingsWorkspace,
  workspaceId: string
}

const MembersCard = ({ workspace, workspaceId }: Props) => {
  const t = useTranslations("EDIT_WORKSPACE.MEMBERS")

  return (
    <Card
      className={cn(
        "rounded-2xl shadow-xl transition-all duration-300 border border-gray-100 dark:border-[#1f1f1f]",
        "bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-[#f0f0f0]",
        "hover:shadow-2xl"
      )}
    >
      <CardHeader>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-[#f0f0f0]">
          {t("TITLE")}
        </h1>
        <CardDescription className="text-gray-500 dark:text-[#444]">
          {t("DESC")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <MembersTable workspace={workspace} workspaceId={workspaceId} />
      </CardContent>
    </Card>
  )
}

export default MembersCard
