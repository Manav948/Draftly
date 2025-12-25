"use client"

import { Loader2 } from "lucide-react"

const LoadingPage = ({
  title = "Loading",
  description = "Please wait while we fetch the data…",
}: {
  title?: string
  description?: string
}) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      {/* Spinner */}
      <div className="flex items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <p className="text-sm text-muted-foreground max-w-sm">
        {description}
      </p>

      {/* Skeleton preview */}
      <div className="mt-6 w-full max-w-md space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-14 w-full rounded-lg bg-muted/60 dark:bg-zinc-800 animate-pulse"
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingPage
