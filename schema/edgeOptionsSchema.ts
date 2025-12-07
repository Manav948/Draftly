import z from "zod";

export const edgeOptionSchema = z.object({
    edgeId: z.string(),
    label: z.string().min(2, "Label name must be 2 latters"),
    type: z.enum([
        "customStraight",
        "customStepSharp",
        "customStepRounded",
        "customBeziar"
    ]),
    animate: z.boolean()
})

export type EdgeOptionSchema = z.infer<typeof edgeOptionSchema>