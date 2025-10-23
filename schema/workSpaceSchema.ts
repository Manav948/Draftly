import { z } from "zod";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES } from "./imageSchem";
const file = z
  .any()
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "File size must be less than 2MB",
  })
  .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only .jpg, .jpeg, .png, and .webp formats are supported",
  })
  .optional()
  .nullable()

const color = z.enum([
  "PURPLE",
  "RED",
  "GREEN",
  "YELLOW",
  "CYAN",
  "INDIGO",
  "LIME",
  "ORANGE",
  "PINK",
  "EMERALD",
  "BLUE",
  "FUCHSIA"
])


export const workspaceSchema = z.object({
  workspaceName: z
    .string()
    .min(2, "Workspace name must be at least 2 letters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),

  file
})
export const apiWorkspaceSchema = z.object({
  workspaceName: z.string()
    .min(4, "Workspace name minimum 4 latters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),
  file: z.string()
    .optional()
    .nullable(),
});

export const workspacePicture = z.object({
  file,
})

export const apiWorkspaceDeletePicture = z.object({
  id: z.string()
})

export const apiWorkspacePicture = z.object({
  picture: z.string(),
  id: z.string()
})

export const id = z.string();

export const apiWorkspaceDelete = z.object({
  id,
  workspaceName: z.string()
    .min(4, "Workspace name minimum 4 latters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),
})

export const workspaceEditData = z.object({
  workspaceName: z.string()
    .min(4, "Workspace name minimum 4 latters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),
  color
})

export const apiWorkspaceEditData = z.object({
  id: z.string(),
  workspaceName: z.string()
    .min(4, "Workspace name minimum 4 latters")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
      message: "Workspace name must be alphanumeric",
    }),
  color
})

export type ApiWorkspaceDelete = z.infer<typeof apiWorkspaceDelete>
export type ApiWorkspacePicture = z.infer<typeof apiWorkspacePicture>
export type WorkspaceEditData = z.infer<typeof workspaceEditData>
export type ApiWorkspaceEditData = z.infer<typeof apiWorkspaceEditData>
export type WorkspacePicture = z.infer<typeof workspacePicture>
export type WorkspaceSchema = z.infer<typeof workspaceSchema>;
export type ApiWorkspaceSchema = z.infer<typeof apiWorkspaceSchema>