"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import TextareaAutoSize from "react-textarea-autosize";
import TagSelector from "@/components/common/tag/tagSelector/TagSelector";
import LinkTag from "@/components/common/tag/LinkTag";
import { Tag, WorkspaceIconColor } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/schema/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TaskCalendar from "@/components/editor/TaskCalender";
import Logo from "@/components/editor/Logo";
import EditorTask from "../editor/Editor";
import { useDebounce } from "use-debounce"

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
    const [currentActiveTags, setCurrentActiveTags] = useState<Tag[]>(
        initialActiveTags || []
    );
    const [isMounted, setIsMounted] = useState(false);
    const [deboundedCurrentActiveTags] = useDebounce(currentActiveTags, 200)
    const _titleRef = useRef<HTMLTextAreaElement | null>(null);

    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            icon: emoji ? emoji : "🧠",
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

    const onSelectActiveTagHandler = (tagId: string) => {
        setCurrentActiveTags((prev) => {
            const found = prev.find((t) => t.id === tagId);
            if (found) return prev.filter((t) => t.id !== tagId);
            const sel = tags?.find((t) => t.id === tagId);
            return sel ? [...prev, sel] : prev;
        });
    };

    const onUpdateActiveTagsHandler = (
        id: string,
        color: WorkspaceIconColor,
        name: string
    ) => {
        setCurrentActiveTags((prev) =>
            prev.map((tag) => (tag.id === id ? { ...tag, color, name } : tag))
        );
    };

    const onDeleteActiveTagHandler = (tagId: string) => {
        setCurrentActiveTags((prev) => prev.filter((tag) => tag.id !== tagId));
    };

    const { ref: titleRef, ...rest } = form.register("title");

    const [deboundedTitle] = useDebounce(form.watch("title"), 2000)

    useEffect(() => {
        if (!isMounted) return
        console.log(deboundedTitle)
    }, [deboundedTitle, isMounted])

    useEffect(() => {
        if (!isMounted) return
        const tagsId = deboundedCurrentActiveTags.map((tag) => tag.id)
    }, [deboundedCurrentActiveTags, isMounted])

    return (
        <Card className="dark:bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950 border border-border/40 shadow-xl overflow-hidden rounded-none">
            <form className="w-full">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <Logo onFormSelect={onFormSelectHandler} />
                            <div className="flex-1">
                                <TextareaAutoSize
                                    ref={(e) => {
                                        titleRef(e);
                                        _titleRef.current = e;
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.preventDefault();
                                    }}
                                    {...rest}
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
                                        isLoading={isLoading}
                                        tags={tags ?? []}
                                        currentActiveTags={currentActiveTags}
                                        onSelectActiveTag={onSelectActiveTagHandler}
                                        workspaceId={workspaceId}
                                        onUpdateActiveTags={onUpdateActiveTagsHandler}
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
