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
        "rounded-2xl shadow-xl border-0 transition-all duration-300",
        "dark:bg-[#0e0707] dark:text-[#f03d3d]",
        "hover:shadow-2xl"
      )}
    >
      <CardHeader>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-[#f03d3d]">
          {t("TITLE")}
        </h1>
        <CardDescription className="text-gray-600 dark:text-gray-300">
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
