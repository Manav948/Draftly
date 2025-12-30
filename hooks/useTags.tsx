"use client"

import { useSaveTaskState } from "@/context/TaskSavingContext"
import { NodeColors } from "@/types/enum"
import { Tag, WorkspaceIconColor } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { DebouncedState } from "use-debounce"

export const useTags = (
    workspaceId: string,
    ismounted: boolean,
    initialActiveTags: Tag[],
    onDebounced?: DebouncedState<() => void>
) => {
    const [currentActiveTags, setCurrentActiveTags] = useState(initialActiveTags)
    const { status, onSetStatus } = useSaveTaskState()

    const { data: tags, isLoading: isLoadingTags } = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/tags/get/get_workspace_tags?workspceId=${workspaceId}`)
            if (!res.ok) {
                return []
            }
            const data = await res.json()
            return data as Tag[]
        },
        enabled: ismounted,
        queryKey: ["getWorkspaceTags"]
    })

    const onDeleteActiveTagHandler = useCallback((tagId: string) => {
        if (status !== "unsaved") onSetStatus("unsaved")
        setCurrentActiveTags((prevTags) => {
            if (prevTags.length === 0) return prevTags
            const updateTags = prevTags.filter((tag) => tag.id !== tagId)
            return updateTags
        })
        onDebounced && onDebounced()
    }, [onSetStatus, status, onDebounced])

    const onUpdateActiveTagHandler = useCallback((tagId: string, colors: WorkspaceIconColor, name: string) => {
        setCurrentActiveTags((prevTags) => {
            if (prevTags.length === 0) return prevTags
            const updateTags = prevTags.map((tag) => tag.id === tagId ? { ...tag, name, colors } : tag)
            return updateTags
        })
    },
        []
    )

    const onSelectActiveTagHandler = useCallback((tag:Tag) => {
        if (status !== "unsaved") onSetStatus("unsaved")
        setCurrentActiveTags((prevTags) => {
            const tagIndex = prevTags.findIndex((tag) => tag.id === tag.id)
            if (tagIndex !== -1) {
                const updateActiveTags = [...prevTags]
                updateActiveTags.splice(tagIndex, 1)
                return updateActiveTags
            } else {
                const selectedTag = tags!.find((tag) => tag.id === tag.id)
                if (selectedTag) {
                    return [...prevTags, selectedTag]
                }
            }
            return prevTags
        })
        onDebounced && onDebounced()
    }, [onSetStatus, status, tags , onDebounced])


    return {
        tags,
        isLoadingTags,
        currentActiveTags,
        onDeleteActiveTagHandler,
        onSelectActiveTagHandler,
        onUpdateActiveTagHandler 
    }
}