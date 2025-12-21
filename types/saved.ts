import { UserInfo } from "./extended"

export interface StarredItem {
    id: string,
    link: string,
    type: "mindMap" | "task",
    title: string | null,
    emoji: string | null,
    workspaceName: string,
    updated: {
        at: Date
        by?: UserInfo | null
    },
    itemId : string

}