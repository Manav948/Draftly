import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "./imageSchem";

export const workspaceSchema = z.object({
    name: z.string()
        .min(2, "Workspace name must be 2 latters")
        .refine((username) => /^[a-zA-Z0-9] +$/.test(username), {
            message: "SCHEMA.USERNAME.SPECIAL_CHARS"
        }),

    file: z.any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, "SCHEMA.IMAGE.MAX")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "SCHEMA.IMAGE.SUPPORTED"
        ).optional().nullable()
})

export type WorkspaceScheam = z.infer<typeof workspaceSchema>