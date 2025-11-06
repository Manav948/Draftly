import z from "zod";
import { color } from "./workSpaceSchema";

export const tagSchema = z.object({
    id: z.string(),
    tagName: z
        .string()
        .min(2, "Tag name minimum 2 latter")
        .max(20, "Tag name is too long ")
        .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
            message: "Tag name must be alphanumeric",
        }),
    color
})

export type TagSchema = z.infer<typeof tagSchema>