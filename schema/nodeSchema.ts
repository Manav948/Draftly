import z from "zod";

export const nodeSchema = z.object({
    text: z.string().min(4, "Node name must be 4 latter")
})

export type NodeSchema = z.infer<typeof nodeSchema>