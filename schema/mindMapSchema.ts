import z from "zod";

export const mindMapSchema = z.object({
    mindmapId: z.string(),
    workspaceId: z.string(),
    content: z.any()
})

export type MindMapSchema = z.infer<typeof mindMapSchema>