"use client";

import { Workspace } from "@prisma/client";
import {
    Check,
    Copy,
    Link,
    RefreshCcw,
    UserPlus2,
} from "lucide-react";
import React, { use, useMemo, useState } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import { useLocale, useTranslations } from "next-intl";
import { domain } from "@/lib/api";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoadingState } from "../ui/LoadingState";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
    workspace: Workspace;
}

const InviteContent = ({ workspace }: Props) => {
    const { id, inviteCode, canEditCode, adminCode, readOnlyCode } = workspace;
    const lang = useLocale();
    const [selectedRole, setSelectedRole] = useState<
        "viewer" | "admin" | "editor"
    >("editor");
    const [codes, setCodes] = useState({
        adminCode,
        inviteCode,
        readOnlyCode,
        canEditCode
    })
    const router = useRouter();
    const t = useTranslations("");

    const inviteUrl = useMemo(() => {
        const shareRole = () => {
            switch (selectedRole) {
                case "admin":
                    return codes.adminCode;
                case "editor":
                    return codes.canEditCode;
                case "viewer":
                    return codes.readOnlyCode;
            }
        };
        return `${domain}/${lang}/dashboard/invite/${codes.inviteCode}?role=${selectedRole}&shareCode=${shareRole()}`;
    }, [codes, lang, selectedRole]);

    const { mutate: regenerateLink, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post(`/api/workspace/invite/regenerate_link`, { id }) as AxiosResponse<Workspace>;

            setCodes({
                adminCode: data.adminCode,
                canEditCode: data.canEditCode,
                inviteCode: data.inviteCode,
                readOnlyCode: data.readOnlyCode
            })
        },
        onError: (err: AxiosError) => {
            const error = err?.response?.data
                ? err.response.data
                : "Something went wrong";
            toast.error(String(error));
        },
        onSuccess: async () => {
            router.refresh();
            toast.success("Invite link regenerated successfully!");
        },
        mutationKey: ["regenerateLink"],
    });

    const handleCopy = async () => {
        await navigator.clipboard.writeText(inviteUrl);
        toast.success("Invite link copied to clipboard!");
    };

    return (
        <div
            className={`
      w-full max-w-md mx-auto mt-5 p-5 rounded-2xl
      transition-all duration-300 border shadow-lg
      bg-gradient-to-br from-gray-50 via-white to-gray-100
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
      border-border/30
    `}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex-1 min-w-0 flex items-center gap-2">
                    <Link
                        size={18}
                        className="text-primary w-5 h-5 shrink-0"
                    />
                    <HoverCard openDelay={250} closeDelay={250}>
                        <HoverCardTrigger asChild>
                            <p
                                className="
                  bg-gray-100 border border-gray-200
                  dark:bg-gray-800/50 dark:border-gray-700/40
                  truncate px-3 py-2 rounded-lg text-xs sm:text-sm
                  font-mono cursor-pointer hover:bg-gray-200
                  dark:hover:bg-gray-800/70 transition-all
                  text-muted-foreground select-none
                "
                            >
                                {inviteUrl}
                            </p>
                        </HoverCardTrigger>
                        <HoverCardContent
                            className="
                p-3 border rounded-lg shadow-md max-w-xs break-all
                bg-white/95 dark:bg-gray-900/90
                border-gray-200 dark:border-gray-800
              "
                        >
                            <p className="text-xs text-muted-foreground">{inviteUrl}</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>

                <Button
                    onClick={() => regenerateLink()}
                    disabled={isPending}
                    className="ml-3 hover:bg-background hover:text-muted-foreground"
                    size="icon"
                    variant="ghost"
                >
                    {isPending ? <LoadingState /> : <RefreshCcw size={18} />}
                </Button>
            </div>

            {/* Role Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <UserPlus2 className="w-4 h-4 text-primary" />
                    <span>{t("Invite.Role") || "Invite as:"}</span>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="
                flex gap-1 items-center text-sm
                bg-gray-50 border-gray-300 hover:bg-gray-100
                dark:bg-gray-900/60 dark:border-gray-700/50
                dark:hover:bg-gray-800 transition-all
              "
                        >
                            {selectedRole === "admin" && <span>{t("ADMIN.TITLE") || "Admin"}</span>}
                            {selectedRole === "editor" && <span>{t("EDITOR.TITLE") || "Editor"}</span>}
                            {selectedRole === "viewer" && <span>{t("VIEWER.TITLE") || "Viewer"}</span>}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={5}
                        className="
              w-56 border
              bg-white dark:bg-gray-900
              border-gray-200 dark:border-gray-800
            "
                    >
                        {/* ADMIN */}
                        <DropdownMenuItem
                            onClick={() => setSelectedRole("admin")}
                            className="flex justify-between items-center"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{t("ADMIN.TITLE") || "Admin"}</p>
                                <p className="text-xs text-muted-foreground">
                                    {t("ADMIN.DESC") || "Full access & management rights"}
                                </p>
                            </div>
                            {selectedRole === "admin" && <Check size={16} />}
                        </DropdownMenuItem>

                        {/* EDITOR */}
                        <DropdownMenuItem
                            onClick={() => setSelectedRole("editor")}
                            className="flex justify-between items-center"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{t("EDITOR.TITLE") || "Editor"}</p>
                                <p className="text-xs text-muted-foreground">
                                    {t("EDITOR.DESC") || "Can edit workspace content"}
                                </p>
                            </div>
                            {selectedRole === "editor" && <Check size={16} />}
                        </DropdownMenuItem>

                        {/* VIEWER */}
                        <DropdownMenuItem
                            onClick={() => setSelectedRole("viewer")}
                            className="flex justify-between items-center"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="font-medium">{t("VIEWER.TITLE") || "Viewer"}</p>
                                <p className="text-xs text-muted-foreground">
                                    {t("VIEWER.DESC") || "Can only view content"}
                                </p>
                            </div>
                            {selectedRole === "viewer" && <Check size={16} />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Button
                disabled={isPending}
                onClick={handleCopy}
                className="
          w-full mt-5 font-semibold flex items-center gap-2 justify-center
          bg-primary text-primary-foreground hover:opacity-90
          dark:bg-primary dark:text-primary-foreground
        "
            >
                <Copy size={18} />
                {t("COPY") || "Copy Invite Link"}
            </Button>
        </div>
    );
};

export default InviteContent;
