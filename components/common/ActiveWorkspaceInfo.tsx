"use client"
import { MAX_USER_WORKSPACES } from '@/lib/options';
import { useTranslations } from 'next-intl';
import React from 'react'

interface Props {
    className?: string;
    activeNumber?: number
}

const ActiveWorkspaceInfo = ({className , activeNumber}: Props) => {

    const t = useTranslations("COMMON")
    return (
        <div className='font-semibold'>
                {t("ACTIVE_WORKSPACE.FIRST")} {" "}
                <span>
                    {activeNumber} {t("ACTIVE_WORKSPACE.SECOND")} {MAX_USER_WORKSPACES}
                </span> {" "}
                {t("ACTIVE_WORKSPACE.THIRD")}
        </div>
    )
}

export default ActiveWorkspaceInfo
