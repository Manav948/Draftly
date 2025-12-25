"use client"

import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

const ErrorPage = ({
  title = "Something went wrong",
  description = "We couldn’t load the data. Please try again.",
  onRetry,
}: {
  title?: string
  description?: string
  onRetry?: () => void
}) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="text-sm text-muted-foreground max-w-sm">
        {description}
      </p>

      {onRetry && (
        <Button
          variant="outline"
          className="mt-3 gap-2"
          onClick={onRetry}
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  )
}

export default ErrorPage
