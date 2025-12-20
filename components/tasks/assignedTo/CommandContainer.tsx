"use client"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from '@/components/ui/command'
import { AssignedToTaskUser } from '@/types/extended'
import React from 'react'
import CommandUser from './CommandUser'

interface Props {
  users: AssignedToTaskUser[]
  taskId: string,
  workspaceId: string
}
const CommandContainer = ({ users, taskId, workspaceId }: Props) => {
  return (
    <div>
      <Command className='w-[20rem]'>
        <CommandInput className='text-xs' placeholder='Filter' />
        <CommandList>
          <CommandEmpty>No User Found</CommandEmpty>
          <CommandGroup heading="ASSIGN TO">
            {users.map((user, i) => (
              <CommandUser
                key={user.user.id}
                user={user}
                taskId={taskId}
                workspaceId={workspaceId}
              />
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  )
}

export default CommandContainer
