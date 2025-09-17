import { z } from "zod";

export const AdditionalScheam = z.object({
    name: z.string()
        .refine((username) => /^[a-zA-z0-9] + $/.test(username), {
            message: "username added"
        })
        .optional(),
    surname: z.string()
        .refine((username) => /^[a-zA-z0-9] + $/.test(username), {
            message: "username added"
        }).optional()
})

export type AdditionalScheam = z.infer<typeof AdditionalScheam>;