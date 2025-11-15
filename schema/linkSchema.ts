import z from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./imageSchem";

export const linkSchema = z.object({
    link: z.string().url("Invalid URL"),
})

export const imagelinkSchema = z.object({
    file: z.any()
        .optional()
        .refine((file) => file?.size <= MAX_FILE_SIZE, "SCHEMA.IMAGE.MAX")
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "SCHEMA.IMAGE.SUPPORTED"
        )
})

export type ImagelinkSchema = z.infer<typeof imagelinkSchema>;
export type LinkSchema = z.infer<typeof linkSchema>;