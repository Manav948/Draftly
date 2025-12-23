"use client"    
import { topSidebarLinks } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import React from 'react'
import SidebarLinks from './SidebarLinks'

const Top = () => {
    const m = useTranslations("SIDEBAR")
    return (
        <div className='flex flex-col gap-2'>
            {topSidebarLinks.map((link, i) => (
                <SidebarLinks
                    key={`link_${i}`}
                    Icon={link.Icon}
                    hoverTextKey={link.hoverTextKey}
                    href={link.href}
                    include={link?.include}
                />
            ))}
        </div>
    )
}

export default Top
