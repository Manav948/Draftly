import { email, z } from "zod"

export const password = z
    .string()
    .refine((password) => password.length >= 6, {
        message: "Password must be 6 character"
    })
    .refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain uppercase latter"
    })
    .refine((password) => /\d/.test(password), {
        message: "Password must contain Digits"
    })

export const signInSchema = z.object({
    email: z.string().email("please enter a valid email"),
    password: z.string().min(6, "password must be at least 6 character"),
})
export type signInSchema = z.infer<typeof signInSchema>;