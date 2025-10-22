"use client";

import UploadFile from "@/components/onboarding/UploadFile";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/components/ui/LoadingState";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { workspaceEditData, WorkspaceEditData, workspacePicture, WorkspacePicture } from "@/schema/workSpaceSchema";
import { SettingsWorkspace } from "@/types/extended";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspaceIconColor } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
    workspace: SettingsWorkspace;
}

const EditWorkspaceData = ({ workspace: { id, color, name, image } }: Props) => {
    const t = useTranslations("EDIT_WORKSPACE.PICTURE");
    const router = useRouter();

    const form = useForm<WorkspaceEditData>({
        resolver: zodResolver(workspaceEditData),
        defaultValues : {
            workspaceName :name,
            color
        }
    });

    const workspaceColor = useMemo(() => {
        const colors: Record<WorkspaceIconColor, string> = {
            BLUE: "bg-blue-600 hover:bg-blue-500",
            PINK: "bg-pink-600 hover:bg-pink-500",
            YELLOW: "bg-yellow-600 hover:bg-yellow-500",
            CYAN: "bg-cyan-600 hover:bg-cyan-500",
            EMERALD: "bg-emerald-600 hover:bg-emerald-500",
            FUCHSIA: "bg-fuchsia-600 hover:bg-fuchsia-500",
            GREEN: "bg-green-600 hover:bg-green-500",
            INDIGO: "bg-indigo-600 hover:bg-indigo-500",
            LIME: "bg-lime-600 hover:bg-lime-500",
            ORANGE: "bg-orange-600 hover:bg-orange-500",
            PURPLE: "bg-purple-600 hover:bg-purple-500",
            RED: "bg-red-600 hover:bg-red-500",
        };
        return colors[color] || "bg-blue-600 hover:bg-blue-500";
    }, [color]);

    // Update image mutation
    const { mutate: editWorkspaceData, isPending } = useMutation({
        mutationFn: async (data : WorkspaceEditData) => {
            await axios.post(`/api/workspace/edit/data`, {
                id,
                ...data,
            });
        },
        onError: () => toast.error("Failed to update profile image. Please try again later."),
        onSuccess: async () => {
            router.refresh();
            toast.success("Workspace Updated Successfully 🎉");
            form.reset();
        },
        mutationKey: ["editWorkspaceData"],
    });

    // Submit upload
    const onSubmit = async (data: WorkspaceEditData) => {
        editWorkspaceData(data);
    };

    return (
        <></>
    );
};

export default EditWorkspaceData;
