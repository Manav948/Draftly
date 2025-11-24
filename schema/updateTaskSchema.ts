import z from "zod";

export const updateTaskSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    date: z.object({
        from: z.date().nullable(),
        to: z.date().nullable()
    }).nullable()
        .optional()
})

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;