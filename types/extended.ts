import { MindMap, savedTask, Tag, Task, UserPermission, Workspace } from "@prisma/client";

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

export type ExtendedTask = {
    id: string;
    title?: string;
    emoji?: string;
    content?: JSON;

    tags?: Tag[];

    date?: {
        id?: string;
        from?: Date | string | null;
        to?: Date | string | null;
    } | null;

    savedTask?: savedTask[];
};

export interface ShortMindMap {
    id: string,
    title: string
}

export type ExtendedMindMap = MindMap & {
    tags?: Tag[]
}
export interface WorkspaceShortCuts extends Workspace {
    tasks: ShortTask[]
    mindMaps: ShortMindMap[]
}