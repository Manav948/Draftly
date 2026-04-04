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
            const res = await fetch(`/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`)
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

    const onUpdateActiveTagHandler = useCallback((tagId: string, updatedColor: WorkspaceIconColor, name: string) => {
        setCurrentActiveTags((prevTags) => {
            if (prevTags.length === 0) return prevTags
            const updateTags = prevTags.map((tag) => tag.id === tagId ? { ...tag, name, color: updatedColor } : tag)
            return updateTags
        })
    },
        []
    )

    const onSelectActiveTagHandler = useCallback((tagToSelect:Tag) => {
        if (status !== "unsaved") onSetStatus("unsaved")
        setCurrentActiveTags((prevTags) => {
            const tagIndex = prevTags.findIndex((pt) => pt.id === tagToSelect.id)
            if (tagIndex !== -1) {
                const updateActiveTags = [...prevTags]
                updateActiveTags.splice(tagIndex, 1)
                return updateActiveTags
            } else {
                return [...prevTags, tagToSelect]
            }
        })
        onDebounced && onDebounced()
    }, [onSetStatus, status, onDebounced])


    return {
        tags,
        isLoadingTags,
        currentActiveTags,
        onDeleteActiveTagHandler,
        onSelectActiveTagHandler,
        onUpdateActiveTagHandler 
    }
}