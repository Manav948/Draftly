import z from "zod";


export const taskSchema = z.object({
    icon: z.string(),
    title: z.string().optional(),
    date: z.any(),
    content: z.any()
})

export const deleteTaskSchema = z.object({
   workspaceId : z.string(),
   taskId : z.string() 
})

export type DeleteTaskSchema = z.infer<typeof deleteTaskSchema>
export type TaskSchema = z.infer<typeof taskSchema>