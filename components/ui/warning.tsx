"use client"
import { cn } from '@/lib/utils'
import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hideIcon?: boolean
}

const Warning = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, hideIcon, ...props }: Props, ref) => {
    const t = useTranslations('COMMON')

    return (
      <div
        ref={ref}
        className={cn(
          "my-4 px-4 py-3 border rounded-xl shadow-sm transition-colors",
          "border-red-300 bg-red-50 text-red-800",
          "dark:border-red-900 dark:bg-red-950/90 dark:text-red-100",
          className
        )}
        {...props}
      >
        {!hideIcon && (
          <div className="flex items-center gap-2 font-semibold mb-1">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
            <p className="uppercase tracking-wide text-sm">
              {t('WARNING')}
            </p>
          </div>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    )
  }
)

Warning.displayName = 'Warning'

export default Warning
