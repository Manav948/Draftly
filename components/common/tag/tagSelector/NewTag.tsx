"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import Warning from '@/components/ui/warning'
import { colors } from '@/lib/getRandomWorkspaceColor'
import { cn } from '@/lib/utils'
import { tagSchema, TagSchema } from '@/schema/TagSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tag, WorkspaceIconColor } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from "uuid"


interface Props {
    onSetTab: (tab: "list" | "newTag" | "editTag") => void
    workspaceId: string
    edit?: boolean
    tagName?: string
    color?: WorkspaceIconColor
    id?: string
    onUpdateActiveTags?: (tagId: string, color: WorkspaceIconColor, name: string) => void
    currentActiveTags?: Tag[]
    onDeleteActiveTag?: (tagId: string) => void
    onSelectActiveTag?: (id: string) => void

}

const NewTag = ({
    onSetTab,
    workspaceId,
    edit,
    tagName,
    color,
    id,
    onUpdateActiveTags,
    currentActiveTags,
    onDeleteActiveTag,
    onSelectActiveTag
}: Props) => {
    const queryClient = useQueryClient();
    const form = useForm<TagSchema>({
        resolver: zodResolver(tagSchema),
        defaultValues: {
            tagName: edit && tagName ? tagName : "",
            color: edit && color ? color : "RED",
            id: edit && id ? id : uuidv4()
        }
    })
    const { mutate: newTag } = useMutation({
        mutationFn: async (data: TagSchema) => {
            await axios.post("/api/tags/new_tag", {
                ...data,
                workspaceId
            })
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["getWorkspaceTags", workspaceId] });

            const previousTags = queryClient.getQueryData<Tag[]>(["getWorkspaceTags", workspaceId]) || [];

            const id = form.getValues("id");
            const color = form.getValues("color");
            const name = form.getValues("tagName");

            queryClient.setQueryData(["getWorkspaceTags", workspaceId], [
                ...previousTags,
                { id, name, color, workspaceId },
            ]);

            return { previousTags };
        },

        onSuccess: () => {
            toast.success("Tag Created Successfully.");
            onSetTab("list");
        },

        onError: (err: AxiosError, _, context) => {
            queryClient.setQueryData(["getWorkspaceTags", workspaceId], context?.previousTags);
            toast.error("Unable to create tag. Please try again.");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["getWorkspaceTags", workspaceId] });
        },
        mutationKey: ["newTag"]
    })


    //edit functionality
    const { mutate: editTag } = useMutation({
        mutationFn: async (data: TagSchema) => {
            await axios.post("/api/tags/edit_tag", {
                ...data,
                workspaceId
            })
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ["getWorkspaceTags", workspaceId] });

            const previousTags = queryClient.getQueryData<Tag[]>(["getWorkspaceTags", workspaceId]) || [];

            const color = form.getValues("color");
            const name = form.getValues("tagName");

            const updatedTag = previousTags.map((tag) => tag.id === id ? { ...tag, name, color } : tag)

            queryClient.setQueryData(["getWorkspaceTags"], updatedTag);
            onUpdateActiveTags && onUpdateActiveTags(id!, color, name)

            return { previousTags };
        },

        onSuccess: () => {
            toast.success("Tag Created Successfully.");
            onSetTab("list");
        },

        onError: (err: AxiosError, _, context) => {
            const prevTag = context?.previousTags.find((tag) => tag.id === id);
            queryClient.setQueryData(["getWorkspaceTags"], context?.previousTags);
            const error = err?.response?.data ? err.response.data : "Somethig went wrong"
            toast.error("Unable to create tag. Please try again.");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["getWorkspaceTags", workspaceId] });
        },
        mutationKey: ["editTag"]
    })
    //  delteTag Functionality
    const { mutate: deleteTag } = useMutation<void, AxiosError, void, { checkedPreviousTags: Tag[]; previousActiveTags: Tag[] }>(
        {
            mutationFn: async () => {
                await axios.post("/api/tags/delete_tag", {
                    id,
                    workspaceId
                })
            },
            onMutate: async () => {
                await queryClient.cancelQueries({ queryKey: ["getWorkspaceTags", workspaceId] });

                const previousTags = queryClient.getQueryData<Tag[]>(["getWorkspaceTags", workspaceId]) || [];

                const checkedPreviousTags = previousTags && previousTags.length > 0 ? previousTags : []
                const previousActiveTags = currentActiveTags ? currentActiveTags : []

                const updatedTag = checkedPreviousTags.filter((tag) => tag.id !== id)

                queryClient.setQueryData(["getWorkspaceTags"], updatedTag);
                onDeleteActiveTag && onDeleteActiveTag(id!)

                return { checkedPreviousTags, previousActiveTags };
            },

            onSuccess: () => {
                toast.success("Tag Created Successfully.");
                onSetTab("list");
            },

            onError: (err: AxiosError, _, context) => {
                const previousActiveTags = context?.previousActiveTags.find((tag) => tag.id === id)
                queryClient.setQueryData(["getWorkspaceTags"], context?.previousActiveTags);

                previousActiveTags && onSelectActiveTag && onSelectActiveTag(previousActiveTags.id)
                const error = err?.response?.data ? err.response.data : "Somethig went wrong"
                toast.error("Unable to create tag. Please try again.");
            },

            onSettled: () => {
                queryClient.invalidateQueries({ queryKey: ["getWorkspaceTags", workspaceId] });
            },
            mutationKey: ["deleteTag"]
        })

    const onSubmit = async (data: TagSchema) => {
        if (edit) editTag(data);
        else newTag(data);
    }

    const TagColor = (providedColors: WorkspaceIconColor, isDarkMode = false) => {
        const colors: Record<WorkspaceIconColor, string> = {
            BLUE: isDarkMode
                ? "bg-blue-900 border-blue-700 hover:bg-blue-800 hover:border-blue-500"
                : "bg-blue-600 border-blue-400 hover:bg-blue-500 hover:border-blue-600",

            PINK: isDarkMode
                ? "bg-pink-900 border-pink-700 hover:bg-pink-800 hover:border-pink-500"
                : "bg-pink-600 border-pink-400 hover:bg-pink-500 hover:border-pink-600",

            YELLOW: isDarkMode
                ? "bg-yellow-900 border-yellow-700 hover:bg-yellow-800 hover:border-yellow-500"
                : "bg-yellow-500 border-yellow-300 hover:bg-yellow-400 hover:border-yellow-600",

            CYAN: isDarkMode
                ? "bg-cyan-900 border-cyan-700 hover:bg-cyan-800 hover:border-cyan-500"
                : "bg-cyan-600 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-600",

            EMERALD: isDarkMode
                ? "bg-emerald-900 border-emerald-700 hover:bg-emerald-800 hover:border-emerald-500"
                : "bg-emerald-600 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-600",

            FUCHSIA: isDarkMode
                ? "bg-fuchsia-900 border-fuchsia-700 hover:bg-fuchsia-800 hover:border-fuchsia-500"
                : "bg-fuchsia-600 border-fuchsia-400 hover:bg-fuchsia-500 hover:border-fuchsia-600",

            GREEN: isDarkMode
                ? "bg-green-900 border-green-700 hover:bg-green-800 hover:border-green-500"
                : "bg-green-600 border-green-400 hover:bg-green-500 hover:border-green-600",

            INDIGO: isDarkMode
                ? "bg-indigo-900 border-indigo-700 hover:bg-indigo-800 hover:border-indigo-500"
                : "bg-indigo-600 border-indigo-400 hover:bg-indigo-500 hover:border-indigo-600",

            LIME: isDarkMode
                ? "bg-lime-900 border-lime-700 hover:bg-lime-800 hover:border-lime-500"
                : "bg-lime-500 border-lime-300 hover:bg-lime-400 hover:border-lime-600",

            ORANGE: isDarkMode
                ? "bg-orange-900 border-orange-700 hover:bg-orange-800 hover:border-orange-500"
                : "bg-orange-600 border-orange-400 hover:bg-orange-500 hover:border-orange-600",

            PURPLE: isDarkMode
                ? "bg-purple-900 border-purple-700 hover:bg-purple-800 hover:border-purple-500"
                : "bg-purple-600 border-purple-400 hover:bg-purple-500 hover:border-purple-600",

            RED: isDarkMode
                ? "bg-red-900 border-red-700 hover:bg-red-800 hover:border-red-500"
                : "bg-red-600 border-red-400 hover:bg-red-500 hover:border-red-600",
        };
        return colors[providedColors] || (isDarkMode
            ? "bg-blue-900 border-blue-700 hover:bg-blue-800 hover:border-blue-500"
            : "bg-blue-600 border-blue-400 hover:bg-blue-500 hover:border-blue-600");
    }


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div>

                    <FormField
                        control={form.control}
                        name="tagName"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className="text-sm font-medium">{t("INPUTS.NAME")}</FormLabel> */}
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        {...field}
                                        className="rounded-lg bg-muted/40 focus:ring-2 focus:ring-primary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* color field */}

                    <div className="space-y-1.5">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Colors</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-2">
                                            {colors.map((color) => (
                                                <FormItem
                                                    key={color}
                                                    className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={color}
                                                            className={cn(
                                                                "h-6 w-6 rounded-full border cursor-pointer",
                                                                TagColor(color)
                                                            )}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button
                    onClick={() => {
                        edit ? deleteTag() : onSetTab("list")
                    }}
                    type="button"
                    className="w-full dark:text-black font-semibold">
                    {edit ? "Delete" : "Cancel"}
                </Button>
                <Button
                    className=''
                    size={"sm"}
                    type='submit'
                >
                    {edit ? "Edit Tag" : "Create Tag"}
                </Button>
            </form>
        </Form>
    )
}

export default NewTag
