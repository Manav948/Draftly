"use client"
import React from 'react'
import Top from './Top'
import Bottom from './Bottom'
import Workspaces from './workspaces/Workspaces'
import Addworkspace from './newWorkspace/Addworkspace'
import { Workspace } from '@prisma/client'

interface Props {
  userWorkspace : Workspace[]
}
const Shortcut = ({userWorkspace} :Props) => {
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
        <Workspaces userWorkspaces={userWorkspace} />
        <Addworkspace />
      </div>

      <div className="p-4">
        <Bottom />
      </div>
    </div>
  )
}

export default Shortcut
