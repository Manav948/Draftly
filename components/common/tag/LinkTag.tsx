import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Tag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const LinkTag = () => {
    return (
        <Link href={"/"} className={cn(`${buttonVariants({
            variant: "outline",
            size: "sm"
        })} px-2.5 py-0.5 h-fit text-xs text-muted-foreground`
        )}
        >
            <Tag size={16} />
            <span>Critical</span>
        </Link>
    )
}

export default LinkTag
