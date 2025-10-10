"use client";
import UploadFile from "@/components/onboarding/UploadFile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ApiWorkspaceSchema,
  workspaceSchema,
  WorkspaceSchema,
} from "@/schema/workSpaceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { LoadingState } from "@/components/ui/LoadingState";

interface Props {
  onSetOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddworkspaceForm = ({ onSetOpen }: Props) => {
  const t = useTranslations("WORKSPACE");
  const [uploadError, setUploadError] = useState(false);

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: "",
    },
  });

  // --- Mutation for creating new workspace ---
  const { mutate: newWorkspace, isPending } = useMutation({
    mutationFn: async (data: ApiWorkspaceSchema) => {
      const { data: result } = await axios.post("/api/workspace/new", data);
      return result;
    },
    onError: (err: AxiosError) => {
      console.error("Workspace creation error:", err);

      const serverMessage = err?.response?.data;
      if (serverMessage === "Same WorkSpace Name Try something another one") {
        toast.error("⚠️ A workspace with this name already exists. Please choose another name.");
      } else if (err?.response?.status === 500) {
        toast.error("💥 Server error — please try again later.");
      } else if (err?.response?.status === 401 || err?.response?.status === 403) {
        toast.error("🔒 You don’t have permission. Please log in again.");
      } else {
        toast.error("❌ Workspace not created. Please check your input and try again.");
      }
    },
    onSuccess: (data) => {
      onSetOpen(false);
      toast.success("🎉 Workspace created successfully!");
    },
    mutationKey: ["newWorkspace"],
  });

  // --- Image upload handling ---
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: () => {
      setUploadError(true);
      toast.error("❌ Failed to upload workspace icon. Please try again.");
    },
    onClientUploadComplete: (data) => {
      if (!data) {
        setUploadError(true);
        toast.error("⚠️ No image uploaded. Please try again.");
      }
    },
  });

  // --- Submit handler ---
  const onSubmit = async (data: WorkspaceSchema) => {
    setUploadError(false);
    const image: File | undefined | null = data.file;

    let workspaceImageURL: null | string = null;
    if (image) {
      const uploadData = await startUpload([image]);
      if (uploadData) {
        workspaceImageURL = uploadData[0].url;
      } else {
        toast.error("⚠️ Error uploading image.");
        return;
      }
    }

    if (uploadError) return;

    newWorkspace({
      workspaceName: data.workspaceName.trim(),
      file: workspaceImageURL,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 rounded-2xl shadow-xl 
                 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 
                 border border-gray-200 dark:border-gray-800"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Input Field */}
          <FormField
            name="workspaceName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">
                  {t("INPUTS.NAME")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-50 dark:bg-gray-900/60 border border-gray-300 dark:border-gray-700 
                               text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder={t("PLACEHOLDERS.NAME")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-400 text-xs mt-1" />
              </FormItem>
            )}
          />

          {/* Upload File */}
          <UploadFile
            form={form}
            schema={workspaceSchema}
            inputAccept="image/*"
            typesDescription={[".jpg", ".jpeg", ".png", ".webp", ".gif"]}
          />

          {/* Button */}
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={!form.formState.isValid || isUploading || isPending}
              type="submit"
              className="w-full rounded-lg px-6 py-2 font-semibold tracking-wide 
                         bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 
                         text-white shadow-md hover:shadow-blue-400/40 hover:scale-[1.02] 
                         transition-all duration-300"
            >
              {isUploading || isPending ? (
                <LoadingState loadingText="Creating Workspace..." />
              ) : (
                t("BTN_ADD")
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default AddworkspaceForm;
