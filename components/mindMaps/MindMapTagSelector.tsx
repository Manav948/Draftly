"use client"
import { useSaveTaskState } from '@/context/TaskSavingContext'
import { useTags } from '@/hooks/useTags'
import { Tag } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { HoverCard, HoverCardTrigger } from '../ui/hover-card'
import TagSelector from '../common/tag/tagSelector/TagSelector'

interface Props {
  mindMapId: string
  workspaceId: string
  isMounted: boolean
  initialActiveTag: Tag[]
}

const MindMapTagSelector = ({ mindMapId, workspaceId, isMounted, initialActiveTag }: Props) => {

  const { onSetStatus } = useSaveTaskState()
  const { mutate: updateMindMapActiveTag } = useMutation({
    mutationFn: async (tagId: string[]) => {
      await axios.post(`api/mind_maps/mind_map/tags`, {
        workspaceId,
        mindMapId,
        tagId
      })
    },
    onSuccess: () => {
      onSetStatus("saved")
      toast.success("Tag Update Successfully")
    },
    onError: (err: AxiosError) => {
      onSetStatus("unsaved")
      console.log("ActiveTagHandler From MindMap : ", err)
      toast.error("Tags not Updated.")
    }
  })

  const debouncedCurrentActiveTags = useDebouncedCallback(() => {
    onSetStatus("pending")
    const tagsId = currentActiveTags.map((tag) => tag.id)
    updateMindMapActiveTag(tagsId)
  })
  const {
    currentActiveTags,
    onDeleteActiveTagHandler,
    onSelectActiveTagHandler,
    onUpdateActiveTagHandler,
    isLoadingTags,
    tags
  } = useTags(workspaceId,
    isMounted,
    initialActiveTag,
    debouncedCurrentActiveTags
  )
  return (
    <div>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger>
          <TagSelector
            workspaceId={workspaceId}
            plusIconSize={22}
            className='border-none h-9'
            tags={tags}
            currentActiveTags={currentActiveTags}
            onSelectActiveTag={onSelectActiveTagHandler}
            onUpdateActiveTags={onUpdateActiveTagHandler}
            onDeleteActiveTag={onDeleteActiveTagHandler}
            isLoading={isLoadingTags}
          />
        </HoverCardTrigger>
      </HoverCard>
    </div>
  )
}

export default MindMapTagSelector
