import { Tag, Task, UserPermission, Workspace } from "@prisma/client";

export interface SubscriptionUser {
    userRole: UserPermission;
    user: {
        id: string,
        image?: string | null;
        username: string
    }
}

export interface SettingsWorkspace extends Workspace {
    Subscribers: SubscriptionUser[];
}

export interface ShortTask {
    id: string,
    emoji: string,
    title: string
}

export interface ExtendedTask extends Task {
    tags : Tag[]
    date?: {
        id : string;
        from : Date | undefined
        to : Date | undefined
    } 
} 

export interface WorkspaceShortCuts  extends Workspace {
    tasks : ShortTask[]
}