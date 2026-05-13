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
        "bg-white dark:bg-[#0c0c0c] border border-gray-200/60 dark:border-[#1f1f1f] shadow-sm rounded-2xl overflow-hidden transition-all duration-300"
      )}
    >
      <CardHeader className="pb-6 border-b border-gray-100 dark:border-[#1a1a1a] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50 dark:bg-[#111]/50">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-[#f0f0f0]">
            {t("TITLE")}
          </h2>
          <CardDescription className="text-sm text-gray-500 dark:text-[#888] mt-1">
            {t("DESC")}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <MembersTable workspace={workspace} workspaceId={workspaceId} />
      </CardContent>
    </Card>
  )
}

export default MembersCard
