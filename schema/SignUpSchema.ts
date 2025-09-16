import { email, z } from "zod"

export const signUpSchema = z.object({
    email: z.string().email("please enter a valid email"),
    password: z.string().min(6  , "password must be at least 6 character"),
    username: z.string().min(2, "min 2 length"),
})
export type signUpSchema = z.infer<typeof signUpSchema>;