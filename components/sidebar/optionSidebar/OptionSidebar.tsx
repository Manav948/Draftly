"use client"
import { usePathname } from 'next/navigation'
import React from 'react'
import Settings from './Settings';

const OptionSidebar = () => {
    const pathname = usePathname();
    if (pathname === "/dashboard") return null
    return (
        <div
            className={`absolute left-20 top-0 h-full bg-white border-l border-gray-200 shadow-lg
  w-0 md:w-64 transition-all duration-300 overflow-hidden ${pathname !== "/dashboard" ? "w-64 p-4" : "w-0 p-0"
                }`}
        >
            {pathname.includes("/dashboard/settings") && <Settings />}
        </div>
    )
}

export default OptionSidebar
