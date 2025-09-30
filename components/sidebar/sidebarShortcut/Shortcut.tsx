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
        bg-white dark:bg-gray-950 text-black dark:text-white
        transition-all duration-300 ease-in-out
      "
    >
      <div className="flex flex-col items-center gap-6 mt-6">
        <Top />
        <Workspaces />
      </div>

      <div className="p-4">
        <Bottom />
      </div>
    </div>
  )
}

export default Shortcut
