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
        border border-red-100 dark:border-red-500/20 shadow-sm rounded-2xl overflow-hidden
        bg-white dark:bg-[#0c0c0c]
      "
    >
      <CardHeader className="pb-6 border-b border-red-50 dark:border-red-500/10 bg-red-50/30 dark:bg-red-500/5">
        <CardTitle className="text-xl font-semibold text-red-600 dark:text-red-500">
          Danger Zone
        </CardTitle>
        <CardDescription className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">
          {t("DESC")}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 sm:p-8">
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
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between border border-red-100 dark:border-red-500/10 p-5 rounded-xl bg-red-50/20 dark:bg-red-500/5">
                 <div className="space-y-1">
                   <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Delete this workspace</h4>
                   <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm">Once you delete a workspace, there is no going back. Please be certain.</p>
                 </div>
                 
                 <DialogTrigger asChild>
                   <Button
                     variant="destructive"
                     className="shadow-sm font-medium shrink-0"
                   >
                     {t("BTN")}
                   </Button>
                 </DialogTrigger>
              </div>

              <DialogContent className="max-w-md p-6 rounded-2xl bg-white dark:bg-[#111] border border-red-100 dark:border-red-500/20">
                <DialogHeader className="mb-2">
                  <DialogTitle className="text-xl text-red-600 dark:text-red-500">
                    {t("DIALOG.TITLE")}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    {t("DIALOG.DESC")}
                  </DialogDescription>
                </DialogHeader>

                <Warning className="my-2">
                  <p className="text-sm">{t("DIALOG.WARNING")}</p>
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
