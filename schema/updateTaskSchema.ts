import z from "zod";

export const updateTaskSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    date: z.object({
        from: z.union([z.string(), z.date()]).nullable().optional(),
        to: z.union([z.string(), z.date()]).nullable().optional()
    }).nullable()
        .optional()
})

export const updateTaskContentSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    content: z.any()
})

export const updateTaskActiveTagsSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    tagsId: z.array(z.string())
})

export const updateTaskTitleSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    title: z.string()
})

export const updateTaskEmojiSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    emoji: z.string()
})
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
export type UpdateTaskTitleSchema = z.infer<typeof updateTaskTitleSchema>
export type UpdateTaskEmojiSchema = z.infer<typeof updateTaskEmojiSchema>
export type UpdateTaskActiveTagSchema = z.infer<typeof updateTaskActiveTagsSchema>
export type UpdateTaskContentSchema = z.infer<typeof updateTaskContentSchema>