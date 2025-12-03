"use client"
import ActiveLink from '@/components/ui/active-link'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
  workspaceId: string
  children: React.ReactNode
  defaultName: string
  href: string
  fields: {
    title: string
    id: string
    emoji?: string
  }[]
}

const WorkspaceOption = ({ workspaceId, children, defaultName, href, fields }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        className="w-full flex justify-between"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div>{children}</div>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-1">
          {fields.map((field) => (
            <ActiveLink
              key={field.id}
              size="sm"
              variant="ghost"
              href={`/en/dashboard/workspace/${workspaceId}/${href}/${field.id}`}
              className="
                flex items-center gap-2 px-2 py-2 rounded-lg
                text-sm text-gray-700 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
              "
            >
              {field.emoji && <span>{field.emoji}</span>}
              <span>{field.title || defaultName}</span>
            </ActiveLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default WorkspaceOption
