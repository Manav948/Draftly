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
        title: string;
        id: string;
        emoji?: string
    }[]
}


const WorkspaceOption = ({ workspaceId, children, defaultName, href, fields }: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Button onClick={() => {
                setIsOpen((prev) => !prev)
            }}>
                <div>{children}</div>
                <ChevronDown size={16} className={`transition-all duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </Button>
            <div>
                {fields.map((field, i) => (
                    <ActiveLink
                        size="sm"
                        variant="ghost"
                        key={i}
                        href={`dashboard/workspace/${workspaceId}/${href}/${field.id}`}
                        className="
              flex justify-start gap-2 rounded-lg px-2 py-2 text-sm font-medium
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-700 dark:text-gray-300 transition-colors
              active:bg-gray-200 dark:active:bg-gray-700
            "
                    >
                        <span className="text-gray-600 dark:text-gray-300">
                            {field.emoji && <span>{field.emoji}</span>}
                        </span>

                        <span>{field.title ? field.title : defaultName} </span>
                    </ActiveLink>
                ))}
            </div>
        </div>
    )
}

export default WorkspaceOption
