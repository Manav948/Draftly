"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Settings from './Settings';

const OptionSidebar = () => {
    const pathname = usePathname();
    if (pathname === "/dashboard") return null
    return (
        <div className='border-r w-full h-full p-4'>
            {pathname.includes("/dashboard/settings") && <Settings />}
        </div>
    )
}

export default OptionSidebar
