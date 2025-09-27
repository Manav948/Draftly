"use client"
import React from 'react'
import Shortcut from './sidebarShortcut/Shortcut'
import OptionSidebar from './optionSidebar/OptionSidebar'

const Sidebar = () => {
  return (
   <aside className="flex h-screen w-20 md:w-64 bg-white border-r border-gray-200 shadow-lg overflow-hidden transition-all duration-300">
    <Shortcut />     
    <OptionSidebar /> 
</aside>
  )
}

export default Sidebar
