import z from "zod";
import { password } from "./siginInSchema";

export const changePasswordSchema = z.object({
    current_password: password,
    new_password: password,
    repeat_password: z.string()
})
    .refine((data) => data.new_password === data.repeat_password, {
        message: "Password must be same",
        path: ["repeat_password"]
    })
    .refine((data) => data.new_password !== data.current_password, {
        message: "New password cannot be the same as current password",
        path: ["new_password"]
    })

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>