"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/LoadingState";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Warning from "@/components/ui/warning";
import { colors } from "@/lib/getRandomWorkspaceColor";
import { cn } from "@/lib/utils";
import { workspaceEditData, WorkspaceEditData } from "@/schema/workSpaceSchema";
import { SettingsWorkspace } from "@/types/extended";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspaceIconColor } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, Check, Trash } from "lucide-react";
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
    const t = useTranslations("EDIT_WORKSPACE.DATA");
    const router = useRouter();

    const form = useForm<WorkspaceEditData>({
        resolver: zodResolver(workspaceEditData),
        defaultValues: {
            workspaceName: name,
            color
        }
    });

    const workspaceColor = (providedColors: WorkspaceIconColor, isDarkMode = false) => {
        const colors: Record<WorkspaceIconColor, string> = {
            BLUE: isDarkMode
                ? "bg-blue-900 border-blue-700 hover:bg-blue-800 hover:border-blue-500"
                : "bg-blue-600 border-blue-400 hover:bg-blue-500 hover:border-blue-600",

            PINK: isDarkMode
                ? "bg-pink-900 border-pink-700 hover:bg-pink-800 hover:border-pink-500"
                : "bg-pink-600 border-pink-400 hover:bg-pink-500 hover:border-pink-600",

            YELLOW: isDarkMode
                ? "bg-yellow-900 border-yellow-700 hover:bg-yellow-800 hover:border-yellow-500"
                : "bg-yellow-500 border-yellow-300 hover:bg-yellow-400 hover:border-yellow-600",

            CYAN: isDarkMode
                ? "bg-cyan-900 border-cyan-700 hover:bg-cyan-800 hover:border-cyan-500"
                : "bg-cyan-600 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-600",

            EMERALD: isDarkMode
                ? "bg-emerald-900 border-emerald-700 hover:bg-emerald-800 hover:border-emerald-500"
                : "bg-emerald-600 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-600",

            FUCHSIA: isDarkMode
                ? "bg-fuchsia-900 border-fuchsia-700 hover:bg-fuchsia-800 hover:border-fuchsia-500"
                : "bg-fuchsia-600 border-fuchsia-400 hover:bg-fuchsia-500 hover:border-fuchsia-600",

            GREEN: isDarkMode
                ? "bg-green-900 border-green-700 hover:bg-green-800 hover:border-green-500"
                : "bg-green-600 border-green-400 hover:bg-green-500 hover:border-green-600",

            INDIGO: isDarkMode
                ? "bg-indigo-900 border-indigo-700 hover:bg-indigo-800 hover:border-indigo-500"
                : "bg-indigo-600 border-indigo-400 hover:bg-indigo-500 hover:border-indigo-600",

            LIME: isDarkMode
                ? "bg-lime-900 border-lime-700 hover:bg-lime-800 hover:border-lime-500"
                : "bg-lime-500 border-lime-300 hover:bg-lime-400 hover:border-lime-600",

            ORANGE: isDarkMode
                ? "bg-orange-900 border-orange-700 hover:bg-orange-800 hover:border-orange-500"
                : "bg-orange-600 border-orange-400 hover:bg-orange-500 hover:border-orange-600",

            PURPLE: isDarkMode
                ? "bg-purple-900 border-purple-700 hover:bg-purple-800 hover:border-purple-500"
                : "bg-purple-600 border-purple-400 hover:bg-purple-500 hover:border-purple-600",

            RED: isDarkMode
                ? "bg-red-900 border-red-700 hover:bg-red-800 hover:border-red-500"
                : "bg-red-600 border-red-400 hover:bg-red-500 hover:border-red-600",
        };

        return colors[providedColors] || (isDarkMode
            ? "bg-blue-900 border-blue-700 hover:bg-blue-800 hover:border-blue-500"
            : "bg-blue-600 border-blue-400 hover:bg-blue-500 hover:border-blue-600");
    };
    // Update image mutation
    const { mutate: editWorkspaceData, isPending } = useMutation({
        mutationFn: async (data: WorkspaceEditData) => {
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-8">

                    <FormField
                        control={form.control}
                        name="workspaceName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">{t("INPUTS.NAME")}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t("PLACEHOLDERS.NAME")}
                                        {...field}
                                        className="rounded-lg bg-muted/40 focus:ring-2 focus:ring-primary"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* color field */}

                    <div className="space-y-1.5">
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">{t("INPUTS.COLOR")}</FormLabel>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap gap-2">
                                            {colors.map((color) => (
                                                <FormItem
                                                    key={color}
                                                    className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={color}
                                                            className={cn(`transition-colors duration-200 ${workspaceColor(color)}`)}
                                                        ></RadioGroupItem>
                                                    </FormControl>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Warning blue>
                    <p>{t("INFO")}</p>
                </Warning>
                <Button
                    disabled={!form.formState.isValid || isPending}
                    type="submit"
                    className="w-full dark:text-black font-semibold">
                    {isPending ? (<LoadingState loadingText={t("BTN_PENDING")} />) : (
                        t("BTN")
                    )}
                </Button>
            </form>
        </Form>
    );
};

export default EditWorkspaceData;
