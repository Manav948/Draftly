import z from "zod";
import { color } from "./workSpaceSchema";
import Workspace from "@/app/[locale]/dashboard/invite/[invite_code]/page";

const tagName = z
    .string()
    .min(2, "Tag name minimum 2 latter")
    .max(20, "Tag name is too long ")
    .refine((username) => /^[a-zA-Z0-9]+$/.test(username), {
        message: "Tag name must be alphanumeric",
    })

const id = z.string();

export const tagSchema = z.object({
    id,
    tagName,
    color
})

export const apiTagSchema = z.object({
    tagName,
    workspaceId: id,
    color,
    id
})

export const deleteTagScheam = z.object({
    id,
    workspaceId: id
})

export type DeleteTagSchema = z.infer<typeof deleteTagScheam>
export type ApiTagSchema = z.infer<typeof apiTagSchema>

export type TagSchema = z.infer<typeof tagSchema>