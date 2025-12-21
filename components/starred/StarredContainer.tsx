"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { StarredItem as StarredItemType } from "@/types/saved"
import { LoadingScreen } from "../common/LoadingScreen"
import StarredItem from "./StarredItem"
import SortSelect from "./SortSelect"

interface Props {
  userId: string
}

const StarredContainer = ({ userId }: Props) => {
  const params = useSearchParams()
  const sortParam = params.get("sort")
  const sortType: "asc" | "desc" = sortParam === "asc" ? "asc" : "desc"

  const {
    data: starredItems,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getStarredItems", userId, sortType],
    queryFn: async () => {
      const res = await fetch(
        `/api/saved/get?userId=${userId}&sort=${sortType}`
      )
      if (!res.ok) throw new Error("Failed to fetch starred items")
      return (await res.json()) as StarredItemType[]
    },
  })


  if (isLoading) {
    return <LoadingScreen />
  }


  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please try refreshing the page.
        </p>
      </div>
    )
  }


  if (!starredItems || starredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-xl font-semibold">No starred items</h2>
        <p className="text-muted-foreground mt-2 max-w-sm">
          Star tasks or mind maps to quickly access them later.
        </p>
      </div>
    )
  }

  return (
    <section className="mx-auto">
      <Card className="border-none bg-white dark:bg-gradient-to-bl dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 shadow-none rounded-none">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Starred Items
            </h1>
            <CardDescription className="max-w-xl">
              Quickly access the tasks and mind maps you’ve starred.
            </CardDescription>
          </div>

          <SortSelect sortType={sortType} refetch={refetch} />
        </CardHeader>

        <CardContent className="space-y-3 h-full flex gap-3 flex-col">
          {starredItems.map((item) => (
            <StarredItem
              key={item.id}
              items={item}
              userId={userId}
              sortType={sortType}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default StarredContainer
