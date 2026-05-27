"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutoSize from "react-textarea-autosize";
import TagSelector from "@/components/common/tag/tagSelector/TagSelector";
import LinkTag from "@/components/common/tag/LinkTag";
import { Tag, WorkspaceIconColor } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/schema/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TaskCalendar from "@/components/editor/TaskCalender";
import Logo from "@/components/editor/Logo";
import EditorTask from "../editor/Editor";
import { useDebouncedCallback } from "use-debounce"
import { useSaveTaskState } from "@/context/TaskSavingContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useTags } from "@/hooks/useTags";
import { CalendarIcon, Tag as TagIcon } from "lucide-react";

interface Props {
    workspaceId: string;
    initialActiveTags?: Tag[];
    taskId: string
    title?: string
    content?: JSON;
    emoji?: string
    from?: Date;
    to?: Date;
}

const TaskContainer = ({ workspaceId, initialActiveTags, taskId, title, from, to, content, emoji }: Props) => {
    const [isMounted, setIsMounted] = useState(false);
    const _titleRef = useRef<HTMLTextAreaElement | null>(null);
    const { status, onSetStatus } = useSaveTaskState();

    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            icon: emoji ? emoji : "",
            title: title ? title : "",
        },
    });

    const { data: tags, isLoading } = useQuery({
        queryFn: async () => {
            const res = await fetch(
                `/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`
            );
            if (!res.ok) return [];
            return (await res.json()) as Tag[];
        },
        enabled: isMounted,
        queryKey: ["getWorkspaceTags", workspaceId],
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onFormSelectHandler = (emoji: string) => {
        form.setValue("icon", emoji);
    };

    const onUpdateSelectHandler = (date: any) => {
        form.setValue("date", date);
    };

    const { ref: titleRef, ...rest } = form.register("title");

    const { mutate: updatTaskTitle } = useMutation({
        mutationFn: async (title: string) => {
            await axios.post(`/api/task/update/title`, {
                workspaceId,
                taskId,
                title
            })
        },
        onError: () => {
            onSetStatus("unsaved")
        },
        onSuccess: () => {
            toast.success("Task Saved")
            onSetStatus("saved")
        }
    })

    const { mutate: updatTaskActiveTag } = useMutation({
        mutationFn: async (tagsId: string[]) => {
            await axios.post(`/api/task/update/tag`, {
                workspaceId,
                taskId,
                tagsId
            })
        },
        onError: () => {
            onSetStatus("unsaved")
        },
        onSuccess: () => {  
            toast.success("Task Saved")
            onSetStatus("saved")
        }
    })

    const deboundedTitle = useDebouncedCallback(
        useCallback((value: string) => {
            onSetStatus("pending")
            updatTaskTitle(value)
            toast.success("Task Saved")
        }, [])
        , 2000
    )

    const deboundedActiveTag = useDebouncedCallback(() => {
        onSetStatus("pending")
        const tagsId = currentActiveTags.map((tagId) => tagId.id)
        updatTaskActiveTag(tagsId)
        toast.success("Task Saved")
    }, 2000)

    const {
        currentActiveTags,
        onDeleteActiveTagHandler,
        onSelectActiveTagHandler,
        onUpdateActiveTagHandler,
        isLoadingTags, } =
        useTags(
            workspaceId,
            isMounted,
            initialActiveTags ?? [],
            deboundedActiveTag,
        )

    return (
        <div className="w-full flex-grow bg-slate-50/50 dark:bg-[#080808] min-h-[calc(100vh-64px)] px-4 sm:px-8 py-8">
            <form className="w-full">
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-6 items-start">
                    {/* Left Column: Emoji, Title, and Main TipTap Editor */}
                    <div className="flex-1 w-full bg-white dark:bg-[#0c0c0c] border border-border/40 rounded-xl  p-6 sm:p-10 flex flex-col ">
                        {/* Icon trigger above the title */}
                        <div className="flex items-center">
                            <Logo
                                onFormSelect={onFormSelectHandler}
                                emoji={form.watch("icon")}
                                taskId={taskId}
                                workspaceId={workspaceId}
                            />
                        </div>

                        {/* Bold Large Title */}
                        <div className="w-full">
                            <TextareaAutoSize
                                {...rest}
                                ref={(e) => {
                                    titleRef(e);
                                    _titleRef.current = e;
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.preventDefault();
                                }}
                                onChange={(e) => {
                                    if (status === "unsaved") return onSetStatus("unsaved")
                                    deboundedTitle(e.target.value)
                                }}
                                placeholder="Untitled task"
                                className="resize-none w-full bg-transparent text-3xl font-bold tracking-tight text-foreground/90 placeholder:text-foreground/20 focus:outline-none leading-tight py-1"
                            />
                        </div>

                        {/* Separator Line */}
                        <hr className="border-border/30 my-1" />

                        {/* TipTap Editor */}
                        <div className="w-full min-h-[350px]">
                            <EditorTask
                                content={typeof content === "string" ? content : content ? JSON.stringify(content) : undefined}
                                workspaceId={workspaceId}
                                taskId={taskId}
                            />
                        </div>
                    </div>

                    {/* Right Column: Properties Sidebar */}
                    <div className="w-full lg:w-[320px] shrink-0 bg-white dark:bg-[#0c0c0c] border border-border/40 rounded-xl shadow-xs p-6 flex flex-col gap-6">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-3">
                                Properties
                            </h3>
                            <hr className="border-border/30" />
                        </div>

                        {/* Date Property Block */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-muted-foreground/70 flex items-center gap-1.5">
                                <CalendarIcon size={13} className="text-muted-foreground/60 flex-shrink-0" />
                                <span>Date range</span>
                            </span>
                            <div className="flex">
                                <TaskCalendar onUpdateForm={onUpdateSelectHandler}
                                    workspaceId={workspaceId}
                                    taskId={taskId}
                                    from={from}
                                    to={to}
                                />
                            </div>
                        </div>

                        {/* Tags Property Block */}
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-medium text-muted-foreground/70 flex items-center gap-1.5">
                                <TagIcon size={13} className="text-muted-foreground/60 flex-shrink-0" />
                                <span>Tags</span>
                            </span>
                            
                            <div className="flex flex-wrap gap-1.5 items-center">
                                {/* active tags list */}
                                {currentActiveTags.map((tag) => (
                                    <div key={tag.id} className="flex-shrink-0">
                                        <LinkTag tag={tag} disabled={false} />
                                    </div>
                                ))}

                                {/* Add Tag Trigger */}
                                <TagSelector
                                    isLoading={isLoadingTags}
                                    tags={tags ?? []}
                                    currentActiveTags={currentActiveTags}
                                    onSelectActiveTag={onSelectActiveTagHandler}
                                    workspaceId={workspaceId}
                                    onUpdateActiveTags={onUpdateActiveTagHandler}
                                    onDeleteActiveTag={onDeleteActiveTagHandler}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TaskContainer;
