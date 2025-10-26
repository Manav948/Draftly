"use client"
import { Workspace } from '@prisma/client'
import { Link } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { HoverCard, HoverCardTrigger } from '../ui/hover-card'
import { useLocale } from 'next-intl'

interface Props {
    workspace: Workspace
}
const InviteContent = ({ workspace: { inviteCode, canEditCode, adminCode, readOnlyCode } }: Props) => {
    const lang = useLocale()
    const [selectedRole, setSelectedRole] = useState<"viewer" | "admin" | "editor">("editor")
    const inviteUrl = useMemo(() => { }, [inviteCode, canEditCode, adminCode, readOnlyCode, lang, selectedRole])
    return (
        <div>
            <Link size={18} className="mx-auto mb-4 text-primary" />
            <HoverCard openDelay={250} closeDelay={250}>
                <HoverCardTrigger asChild>
                    <p></p>
                </HoverCardTrigger>
            </HoverCard>
        </div>
    )
}

export default InviteContent
