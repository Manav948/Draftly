"use client";
import UploadFile from "@/components/onboarding/UploadFile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingState } from "@/components/ui/LoadingState";
import { useUploadThing } from "@/lib/uploadthing";
import { imagelinkSchema, ImagelinkSchema } from "@/schema/linkSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  onAddImage: (Link: string) => void;
}

const AddImageByImported = ({ onAddImage }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toast.error("We couldn’t upload your image. Please try again.");
    },
    onClientUploadComplete: (data) => {
      if (!data || data.length === 0) {
        toast.error("No image uploaded.");
        return;
      }

      onAddImage(data[0].url);
      toast.success("Image added successfully!");
    },
  });

  const form = useForm<ImagelinkSchema>({
    resolver: zodResolver(imagelinkSchema),
  });

  const handleUpload = async () => {
    try {
      setIsLoading(true);

      const file = form.getValues("file") as File;

      if (!file) {
        toast.error("Please select an image file.");
        return;
      }

      console.log("Selected File:", file);

      await startUpload([file]);

    } catch (error) {
      console.log("Upload Error:", error);
      toast.error("Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpload)}
        className="space-y-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg"
      >
        <UploadFile
          ContainerClassName="w-full bg-white dark:bg-gray-800 border border-border/40 rounded-lg p-4"
          LabelClassName="text-muted-foreground mb-1.5"
          form={form}
          schema={imagelinkSchema}
          inputAccept="image/*"
        />

        <Button
          type="submit"
          disabled={isLoading || isUploading}
          className="w-full rounded-lg py-2 font-medium 
                      bg-primary text-white hover:bg-primary/90
                      dark:bg-white dark:text-black"
        >
          {isLoading || isUploading ? (
            <LoadingState loadingText="Uploading..." />
          ) : (
            "Add Image"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddImageByImported;
