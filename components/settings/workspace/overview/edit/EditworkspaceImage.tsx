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
import { workspacePicture, WorkspacePicture } from "@/schema/workSpaceSchema";
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

const EditWorkspaceImage = ({ workspace: { id, color, name, image } }: Props) => {
  const t = useTranslations("EDIT_WORKSPACE.PICTURE");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<WorkspacePicture>({
    resolver: zodResolver(workspacePicture),
  });

  // 🎨 Workspace color mapping
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

  // 🧩 Button visibility logic
  const imageOption = useMemo(() => {
    if (!imagePreview && image) return { canDelete: true, canSave: false };
    if (imagePreview && image) return { canDelete: false, canSave: true };
    return { canDelete: false, canSave: false };
  }, [imagePreview, image]);

  // 📤 Upload handling
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: (error) => {
      console.error("Upload error:", error);
      toast.error("We couldn’t upload your image. Please try again.");
    },
    onClientUploadComplete: (data) => {
      if (data?.[0]?.url) {
        updateWorkspacePicture(data[0].url);
      } else {
        toast.error("Something went wrong while processing your image.");
      }
    },
  });

  // 🧠 Update image mutation
  const { mutate: updateWorkspacePicture, isPending } = useMutation({
    mutationFn: async (picture: string) => {
      const { data: result } = await axios.post(`/api/workspace/edit/picture`, {
        id,
        picture,
      });
      return result;
    },
    onError: () => toast.error("Failed to update profile image. Please try again later."),
    onSuccess: async () => {
      router.refresh();
      toast.success("Workspace image updated successfully 🎉");
      setIsOpen(false);
    },
    mutationKey: ["changeWorkspacePicture"],
  });

  // 🗑 Delete image mutation
  const { mutate: deleteWorkspacePicture, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/workspace/delete/picture`, { id });
    },
    onError: () => toast.error("Failed to delete workspace image."),
    onSuccess: async () => {
      router.refresh();
      toast.success("Workspace image removed successfully 🗑️");
      setIsOpen(false);
    },
    mutationKey: ["deleteWorkspacePicture"],
  });

  // 🖱 Submit upload
  const onSubmit = async (data: WorkspacePicture) => {
    const imageFile = data.file;
    if (!imageFile) return toast.error("Please select an image first.");
    await startUpload([imageFile]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div>
        <Label className="text-sm font-semibold text-muted-foreground">{t("LABLE")}</Label>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "w-16 h-16 font-semibold text-white rounded-md transition-all duration-200",
              !image && workspaceColor
            )}
            variant={image ? "ghost" : "default"}
            size="icon"
            onClick={() => {
              form.clearErrors("file");
              setImagePreview("");
            }}
          >
            {image ? (
              <Image
                src={image}
                width={60}
                height={60}
                alt="workspace image"
                className="w-16 h-16 rounded-md object-cover"
              />
            ) : (
              name[0].toUpperCase()
            )}
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="bg-background border border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            {t("TITLE")}
          </DialogTitle>
        </DialogHeader>

        <div
          className={cn(
            "w-40 h-40 mx-auto my-5 rounded-lg flex items-center justify-center overflow-hidden",
            "text-white font-bold",
            !imagePreview && !image && workspaceColor
          )}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              width={160}
              height={160}
              alt="workspace image preview"
              className="object-cover w-full h-full"
            />
          ) : image ? (
            <Image
              src={image}
              width={160}
              height={160}
              alt="workspace image"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-2xl">{name[0].toUpperCase()}</p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <UploadFile
              hideFileName
              useAsBtn
              btnText={t("BTN")}
              ContainerClassName="w-full"
              form={form}
              schema={workspacePicture}
              inputAccept="image/*"
              getImagePreview={setImagePreview}
            />

            <div className="flex justify-center gap-4 pt-2">
              <Button
                type="button"
                className={cn(
                  "rounded-full w-12 h-12 p-2 flex items-center justify-center transition",
                  imageOption.canDelete ? "text-white" : "text-muted-foreground"
                )}
                disabled={!imageOption.canDelete}
                variant={imageOption.canDelete ? "destructive" : "secondary"}
                onClick={() => deleteWorkspacePicture()}
              >
                {isDeleting ? <LoadingState /> : <Trash size={18} />}
              </Button>
              <Button
                type="submit"
                className={cn(
                  "rounded-full w-12 h-12 p-2 flex items-center justify-center transition",
                  imageOption.canSave ? "text-white" : "text-muted-foreground"
                )}
                disabled={!imageOption.canSave || isPending || isUploading}
                variant={imageOption.canSave ? "default" : "secondary"}
              >
                {isPending || isUploading ? <LoadingState /> : <Check size={18} />}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkspaceImage;
