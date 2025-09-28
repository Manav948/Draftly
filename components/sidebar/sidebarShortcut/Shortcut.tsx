"use client"
import React from 'react'
import Top from './Top'
import Bottom from './Bottom'
import Workspaces from './Workspaces'

const Shortcut = () => {
  return (
    <div
      className="
        flex flex-col justify-between
        w-16 md:w-20 h-full
        bg-gray-50 border-r border-gray-200
        transition-all duration-300 ease-in-out
      "
    >
      <div className="flex flex-col items-center gap-6 mt-6">
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
