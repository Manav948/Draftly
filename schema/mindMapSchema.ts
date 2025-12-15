import z from "zod";

export const mindMapSchema = z.object({
    mindMapId: z.string(),
    workspaceId: z.string(),
    content: z.any()
})

export const updateMindMapSchema = z.object({
    workspaceId: z.string(),
    mindMapId: z.string(),
    tagId: z.array(z.string())
})

export const titleAndEmojiSchema = z.object({
    icon: z.string(),
    title: z.string().optional()
})

export const updateTaskAndEmojiSchema = z.object({
    workspaceId: z.string(),
    mapId: z.string(),
    icon: z.string(),
    title: z.string().optional()
})

export const deleteMindMapSchema = z.object({
    workspaceId: z.string(),
    mindMapId: z.string()
})

export type DeleteMindMapSchema = z.infer <typeof deleteMindMapSchema>
export type TitleAndEmojiSchema = z.infer<typeof titleAndEmojiSchema>
export type UpdateTaskAndEmojiSchema = z.infer<typeof updateTaskAndEmojiSchema>
export type UpdateMindMapScheam = z.infer<typeof updateMindMapSchema>
export type MindMapSchema = z.infer<typeof mindMapSchema>