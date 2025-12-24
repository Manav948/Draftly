import { MindMap, PomodoroSettings, savedMindMaps, savedTask, Tag, Task, UserPermission, Workspace, WorkspaceIconColor } from "@prisma/client";

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
    creator: UserInfo,
    updatedBy?: UserInfo | null
};

export interface ShortMindMap {
    id: string,
    title: string
}

export type ExtendedMindMap = MindMap & {
    tags?: Tag[]
    savedMindMaps?: savedMindMaps[]
    creator: UserInfo
    updatedBy?: UserInfo | null
}
export interface WorkspaceShortCuts extends Workspace {
    tasks: ShortTask[]
    mindMaps: ShortMindMap[]
}

export interface UserInfo {
    id: string,
    username: string,
    surname?: string | null,
    image?: string | null
    name?: string | null
}

export interface AssignedToTaskUser {
    user: {
        id: string,
        username: string,
        image: string | null,
        assignedToTasks: {
            userId: string
        }[]
    }
}

export interface UserAssigningToTaskInfo extends Workspace {
    Subscribers: AssignedToTaskUser[]
}

export interface AssignedToMindMapUser {
    user: {
        id: string,
        username: string,
        image: string | null,
        assignedToMindMaps: {
            userId: string
        }[]
    }
}

export interface UserAssigningToMindMapInfo extends Workspace {
    Subscribers: AssignedToMindMapUser[]
}
export type AssignedToMeTypes = "tasks"  | "mindMap"

export interface AssignedToMeDataItems  {
    id: string,
    title: string,
    emoji: string,
    link: string,
    workspaceName: string,
    type : AssignedToMeTypes,
    createdAt : Date,
    workspaceId : string,
    updated : {
        at : Date,
        by?: UserInfo | null
    }
}
export interface AssignedToMeTasksAndMindMaps {
    Task : AssignedToMeDataItems[],
    mindMaps : AssignedToMeDataItems[]
}

export interface CalendarItem {
    title : string,
    date :  {
        id : string,
        from : Date | undefined
        to : Date | undefined   
    } | null
    workspaceId : string,
    workspaceName : string,
    workspaceColor : WorkspaceIconColor,
    taskId : string
}