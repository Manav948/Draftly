import { email, z } from "zod"

export const signInSchema = z.object({
    email: z.string().email("please enter a valid email"),
    password: z.string().min(6, "password must be at least 6 character"),
})
export type signInSchema = z.infer<typeof signInSchema>;