"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
        mutationFn: async (tagsID: string[]) => {
            await axios.post(`/api/task/update/tag`, {
                workspaceId,
                taskId,
                tagsID
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
        <Card className="dark:dark:bg-[#0e0707] dark:text-white border border-border/40 shadow-xl overflow-hidden rounded-none">
            <form className="w-full">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <Logo
                                onFormSelect={onFormSelectHandler}
                                emoji={form.getValues("icon")}
                                taskId={taskId}
                                workspaceId={workspaceId}
                            />
                            <div className="flex-1">
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
                                    placeholder="Editor Content"
                                    className="min-h-[56px] resize-none w-full bg-transparent text-lg placeholder:text-muted-foreground focus:outline-none"
                                />

                                <div className="mt-4 flex flex-wrap gap-3 items-center">
                                    <TaskCalendar onUpdateForm={onUpdateSelectHandler}
                                        workspaceId={workspaceId}
                                        taskId={taskId}
                                        from={from}
                                        to={to}
                                    />
                                    <TagSelector
                                        isLoading={isLoadingTags}
                                        tags={tags ?? []}
                                        currentActiveTags={currentActiveTags}
                                        onSelectActiveTag={onSelectActiveTagHandler}
                                        workspaceId={workspaceId}
                                        onUpdateActiveTags={onUpdateActiveTagHandler}
                                        onDeleteActiveTag={onDeleteActiveTagHandler}
                                    />

                                    {/* active tags */}
                                    <div className="flex gap-2 flex-wrap">
                                        {currentActiveTags.map((tag) => (
                                            <div key={tag.id}>
                                                <LinkTag tag={tag} disabled={false} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <EditorTask
                            content={typeof content === "string" ? content : content ? JSON.stringify(content) : undefined}
                            workspaceId={workspaceId}
                            taskId={taskId}
                        />
                    </div>
                </CardContent>
            </form>
        </Card>
    );
};

export default TaskContainer;
