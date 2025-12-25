"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogTrigger, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingState } from '@/components/ui/LoadingState';
import Warning from '@/components/ui/warning';
import { SettingsWorkspace } from '@/types/extended';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import z from 'zod';

interface Props {
  workspace: SettingsWorkspace;
}

const DeleteWorkspace = ({ workspace: { id, name } }: Props) => {
  const t = useTranslations("EDIT_WORKSPACE.DELETE");
  const lang = useLocale();
  const router = useRouter();

  const deleteWorkspaceSchema = z.object({
    workspaceName: z.string().refine((workspaceName) => workspaceName === name, "Entered workspace name doesn't match.")
  });
  type DeleteWorkspaceSchema = z.infer<typeof deleteWorkspaceSchema>;

  const form = useForm<DeleteWorkspaceSchema>({
    resolver: zodResolver(deleteWorkspaceSchema),
    defaultValues: {
      workspaceName: ""
    }
  });

  const { mutate: deleteWorkspace, isPending } = useMutation({
    mutationFn: async (formData: DeleteWorkspaceSchema) => {
      const response = await axios.post(`/api/workspace/delete/workspace`, {
        id,
        workspaceName: formData.workspaceName
      });
      return response.data;
    },
    onError: (err: AxiosError) => {
      const message =
        err.response?.data && typeof err.response.data === "string"
          ? err.response.data
          : "Something went wrong while deleting the workspace.";
      toast.error(message);
    },
    onSuccess: async () => {
      toast.success("Workspace deleted successfully 🗑️");
      router.push("/dashboard/settings");
    },
    mutationKey: ["deleteWorkspace"]
  });

  const onSubmit = (data: DeleteWorkspaceSchema) => {
    deleteWorkspace(data);
  };

  return (
    <Card
      className="
        max-w-3xl mx-auto
        border-none shadow-md rounded-xl overflow-hidden
        dark:bg-[#1e0f0f] dark:text-[#f03d3d]
      "
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-red-600 dark:text-red-500">
          {t("TITLE")}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          {t("DESC")}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Workspace name confirmation field */}
            <FormField
              control={form.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-900 dark:text-gray-200 font-medium">
                    {t("LABLE")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter workspace name to confirm"
                      className="
                        border-gray-300 dark:border-gray-700
                        bg-white dark:bg-gray-950
                        focus:ring-2 focus:ring-red-500
                      "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="lg"
                  className="w-full font-semibold shadow-sm cursor-pointer"
                >
                  {t("BTN")}
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-red-600 dark:text-red-500">
                    {t("DIALOG.TITLE")}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    {t("DIALOG.DESC")}
                  </DialogDescription>
                </DialogHeader>

                <Warning>
                  <p>{t("DIALOG.WARNING")}</p>
                </Warning>

                <Button
                  disabled={isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  size="lg"
                  variant="destructive"
                  className="w-full mt-4 cursor-pointer"
                >
                  {isPending ? (
                    <LoadingState loadingText={t("DIALOG.PENDING_BTN")} />
                  ) : (
                    t("DIALOG.BUTTON")
                  )}
                </Button>
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default DeleteWorkspace;
