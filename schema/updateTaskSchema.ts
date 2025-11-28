import z from "zod";

export const updateTaskSchema = z.object({
    workspaceId: z.string(),
    taskId: z.string(),
    date: z.object({
        from: z.union([z.string() , z.date()]).nullable().optional(),
        to: z.union([z.string(), z.date()]).nullable().optional()
    }).nullable()
        .optional() 
})

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;