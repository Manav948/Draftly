"use client"

import React from "react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card"
import { Button } from "../ui/button"
import { UserAvatar } from "../ui/user-avatar"
import { CalendarDays } from "lucide-react"
import { UserInfo } from "@/types/extended"

interface Props {
    user: UserInfo
}
const UserHoverInfo = ({ user }: Props) => {
    return (
        <HoverCard openDelay={250} closeDelay={250}>
            <HoverCardTrigger asChild>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="px-0 text-sm font-medium text-primary hover:underline"
                >
                    {user.username}
                </Button>
            </HoverCardTrigger>

            <HoverCardContent
                side="top"
                align="start"
                className="w-80 rounded-xl border border-border/60 bg-background p-4 shadow-lg"
                avoidCollisions={false}
            >
                <div className="flex gap-4">
                    <UserAvatar
                        className="h-12 w-12 shrink-0"
                        profileImage={user?.image}
                        size={45}
                    />

                    <div className="flex flex-col gap-1 min-w-0">

                        <p className="text-xl font-bold text-muted-foreground line-clamp-3">
                            {user.username}
                        </p>
                        {user.name && user.surname && (
                            <p className="text-sm font-semibold text-muted-foreground">
                                {user.name} {user.surname}
                            </p>
                        )}
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}

export default UserHoverInfo
