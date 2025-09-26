"use client"
import React from 'react'
import Top from './Top'
import Bottom from './Bottom'
import Workspaces from './Workspaces'

const Shortcut = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col gap-6 p-4">
        <Top />
        <Workspaces />
      </div>
      <div className="p-4 border-t border-gray-100">
        <Bottom />
      </div>
    </div>
  )
}

export default Shortcut
