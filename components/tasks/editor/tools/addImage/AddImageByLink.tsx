"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingState } from "@/components/ui/LoadingState";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const urlSchema = z.object({
  file: z.string().url("Please enter a valid image URL"),
});
type UrlSchema = z.infer<typeof urlSchema>;

interface Props {
  onAddImage: (link: string) => void;
}

const AddImageByLink = ({ onAddImage }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<UrlSchema>({
    resolver: zodResolver(urlSchema),
  });

  const isImage = async (url: string) => {
    try {
      const data = await fetch(url, { method: "HEAD" });
      if (!data.ok) return false;
      return data.headers.get("Content-Type")?.startsWith("image") ?? false;
    } catch {
      return false;
    }
  };

  const addImageHandler = async (data: UrlSchema) => {
    setIsLoading(true);

    const valid = await isImage(data.file);
    if (!valid) {
      form.setError("file", {
        message: "This URL does not point to an image",
      });
      setIsLoading(false);
      return;
    }

    onAddImage(data.file);
    form.reset();
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(addImageHandler)} className="space-y-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingState loadingText="Loading..." /> : "Add Image"}
        </Button>
      </form>
    </Form>
  );
};

export default AddImageByLink;
