import z from "zod";

export const  linkSchema = z.object({
    link: z.string().url("Invalid URL"),
})

export type LinkSchema = z.infer<typeof linkSchema>;