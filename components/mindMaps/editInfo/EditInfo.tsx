"use client"

import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useSaveTaskState } from '@/context/TaskSavingContext'
import { titleAndEmojiSchema, TitleAndEmojiSchema } from '@/schema/mindMapSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { PencilRuler } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ChangeEmoji from './ChangeEmoji'
import TextareaAutoSize from 'react-textarea-autosize'

interface Props {
  workspaceId: string
  mapId: string
  title?: string
  icon: string
}

const EditInfo = ({ workspaceId, mapId, title, icon }: Props) => {
  const [open, setOpen] = useState(false)

  const titleRef = useRef<HTMLTextAreaElement>(null)

  const [localTitle, setLocalTitle] = useState(title ?? '')
  const [localIcon, setLocalIcon] = useState(icon)

  const { onSetStatus } = useSaveTaskState()
  const queryClient = useQueryClient()

  useEffect(() => {
    setLocalTitle(title ?? '')
    setLocalIcon(icon)
  }, [title, icon])

  const { mutate: updateMindMap } = useMutation({
    mutationFn: async ({ icon, title }: { icon: string; title?: string }) =>
      axios.post('/api/mind_maps/update/title_and_emoji', {
        workspaceId,
        mapId,
        title,
        icon,
      }),

    onSuccess: () => {
      onSetStatus('saved')
      queryClient.invalidateQueries({ queryKey: ['getMindMap', mapId] })
      queryClient.invalidateQueries({
        queryKey: ['getWorkspaceShortcuts', workspaceId],
      })
      toast.success('Updated successfully')
    },

    onError: () => {
      onSetStatus('unsaved')
      toast.error('Update failed')
    },
  })

  const form = useForm<TitleAndEmojiSchema>({
    resolver: zodResolver(titleAndEmojiSchema),
    defaultValues: {
      icon,
      title: title ?? '',
    },
  })

  const onFormSelectHandler = (emoji: string) => {
    setLocalIcon(emoji)
    form.setValue('icon', emoji, { shouldDirty: true })
  }

  const onSaveEdit = useCallback(() => {
    onSetStatus('pending')
    const { icon, title } = form.getValues()
    setOpen(false)
    updateMindMap({ icon, title })
  }, [form, updateMindMap, onSetStatus])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <HoverCard openDelay={250} closeDelay={250}>
        <SheetTrigger asChild>
          <HoverCardTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted transition-colors"
              onClick={() => setOpen(true)}
            >
              <PencilRuler size={20} />
            </Button>
          </HoverCardTrigger>
        </SheetTrigger>

        <HoverCardContent sideOffset={8} align="start">
          Edit Emoji and Title
        </HoverCardContent>

        <SheetContent className="w-full sm:max-w-md px-6 py-6">
          <SheetHeader className="space-y-2">
            <SheetTitle className="text-xl font-semibold tracking-tight">
              Edit Title and Emoji
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground leading-relaxed">
              Update the emoji and title to better represent your mind map.
            </SheetDescription>
          </SheetHeader>

          <form
            id="mind-map-info"
            className="mt-6 flex flex-col gap-6"
          >
            {/* Emoji + Title Card */}
            <div className="flex flex-col gap-4 rounded-lg border bg-muted/40 p-4">
              <ChangeEmoji
                emoji={localIcon}
                onFormSelect={onFormSelectHandler}
              />

              <TextareaAutoSize
                ref={titleRef}
                value={localTitle}
                onChange={(e) => {
                  const value = e.target.value
                  setLocalTitle(value)
                  form.setValue('title', value, { shouldDirty: true })
                }}
                maxLength={100}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
                placeholder="Title of your mind map"
                className="
                  w-full resize-none bg-transparent
                  text-2xl font-semibold leading-snug
                  placeholder:text-muted-foreground
                  border-b border-border
                  focus:border-primary
                  focus:outline-none
                  transition-colors
                "
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto px-6"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>

              <Button
                type="button"
                className="w-full sm:w-auto px-6 bg-primary text-white hover:bg-primary/90"
                onClick={onSaveEdit}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </SheetContent>
      </HoverCard>
    </Sheet>
  )
}

export default EditInfo
