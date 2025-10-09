import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "./imageSchem";

export const workspaceSchema = z.object({
  name: z
    .string()
    .min(2, "Workspace name must be at least 2 letters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),

  file: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 2MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
    })
    .optional()
    .nullable(),
});

export const apiWorkspaceSchema = z.object({
  workspaceName: z.string()
    .min(4, "Workspace name minimum 4 latters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),
  file: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "File size must be less than 2MB",
    })
})

export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type ApiWorkspaceSchema = z.infer<typeof apiWorkspaceSchema>