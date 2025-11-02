import { UserPermission, Workspace } from "@prisma/client";

export interface SubscriptionUser {
    userRole : UserPermission;
    user :{
        id:string,
        image?: string | null;
        username :string
    }
}

export interface  SettingsWorkspace extends Workspace {
    Subscribers : SubscriptionUser[];
}