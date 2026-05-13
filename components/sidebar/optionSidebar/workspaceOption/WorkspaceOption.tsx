"use client"
import ActiveLink from '@/components/ui/active-link'
import { ChevronRight, FileText, ChevronDown } from 'lucide-react'
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
  const [isOpen, setIsOpen] = useState(true) // default open

  return (
    <div className="w-full flex flex-col mb-2">
      {/* Sleek Header Section */}
      <div 
        className="group flex items-center justify-between px-2 py-1.5 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="flex items-center gap-2 text-[13px] font-semibold text-gray-700 dark:text-gray-300">
          <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
          {children}
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          {/* We can add a small '+' icon here in the future if needed */}
        </div>
      </div>

      {/* Collapsible Content */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-0.5 relative">
            {/* Elegant connection line */}
            <div className="absolute left-[15px] top-0 bottom-2 w-[1px] bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800" />
            
            {fields.length === 0 ? (
              <div className="pl-8 pr-2 py-1.5 text-[12px] text-gray-400 dark:text-gray-500">
                Empty
              </div>
            ) : (
              fields.map((field) => (
                <ActiveLink
                  key={field.id}
                  size="sm"
                  variant="ghost"
                  href={`/dashboard/workspace/${workspaceId}/${href}/${field.id}`}
                  className="
                    group/item flex items-center gap-2.5 pl-8 pr-2 py-1.5 h-auto rounded-md
                    text-[13px] font-medium text-gray-500 dark:text-gray-400
                    hover:text-gray-900 dark:hover:text-gray-100
                    hover:bg-gray-50/80 dark:hover:bg-white/5
                    transition-all w-full justify-start shadow-none
                    relative
                  "
                  disableActiveStateColor={false}
                >
                  {/* Subtle indicator dot on hover */}
                  <div className="absolute left-[13px] w-[5px] h-[5px] rounded-full bg-gray-300 dark:bg-gray-700 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                  
                  {field.emoji ? (
                    <span className="text-[14px] leading-none shrink-0">{field.emoji}</span>
                  ) : (
                    <FileText size={14} className="text-gray-400 dark:text-gray-500 shrink-0 group-hover/item:text-primary transition-colors" />
                  )}
                  <span className="truncate">{field.title || defaultName}</span>
                </ActiveLink>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceOption
