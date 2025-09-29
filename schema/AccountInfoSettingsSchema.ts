import z from "zod";



export const accountInfoSettingsSchema = z.object({
    username: z
        .string()
        .min(2, "minimum 2 character is required")
        .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
            message: ""
        })
        .optional(),
    language: z.string().nonempty({ message: "" }),
    name: z.string().optional(),
    surname: z.string().optional()
})

export type AccountInfoSettingsSchema = z.infer<typeof accountInfoSettingsSchema>