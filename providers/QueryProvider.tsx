"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data is considered fresh for 60 s — no refetch on every mount/focus
                        staleTime: 60 * 1000,
                        // Keep unused data in cache for 5 minutes for instant back-navigation
                        gcTime: 5 * 60 * 1000,
                        // Don't hammer the server on transient errors
                        retry: 1,
                        // Don't refetch just because the user switched browser tabs
                        refetchOnWindowFocus: false,
                    },
                },
            })
    )
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}