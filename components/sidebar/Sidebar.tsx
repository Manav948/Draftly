"use client"
import React from 'react'
import Shortcut from './sidebarShortcut/Shortcut'
import OptionSidebar from './optionSidebar/OptionSidebar'

const Sidebar = () => {
  return (
    <aside className="flex flex-col w-full h-screen bg-gradient-to-b to-white border-r shadow-lg overflow-y-auto">
        <Shortcut />
        <OptionSidebar />
    </aside>
  )
}

export default Sidebar
