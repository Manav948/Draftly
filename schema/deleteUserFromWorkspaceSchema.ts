import z from "zod";

export const deleteUserFromWorkspaceSchema = z.object({
    workspaceId: z.string(),
    userId : z.string()
})

export type DeleteUserFromWorkspaceSchema = z.infer<typeof deleteUserFromWorkspaceSchema>;