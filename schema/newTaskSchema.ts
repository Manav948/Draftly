import z from "zod";


export const newTaskSchema = z.object({
    workspaceId : z.string()
})

export type NewTaskSchema = z.infer<typeof newTaskSchema>