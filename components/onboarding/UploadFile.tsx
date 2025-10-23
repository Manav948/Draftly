"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadCloud, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

interface Props {
  form: UseFormReturn<any>;
  schema: z.ZodObject<any>;
  getImagePreview?: React.Dispatch<React.SetStateAction<string>>;
  inputAccept: "image/*" | "pdf";
  typesDescription?: string[];
  ContainerClassName?: string;
  LabelClassName?: string;
  LabelText?: string;
  useAsBtn?: boolean;
  hideFileName?: boolean;
  btnText?: string;
}

const UploadFile = ({
  form,
  schema,
  getImagePreview,
  inputAccept,
  typesDescription,
  ContainerClassName,
  LabelClassName,
  LabelText,
  useAsBtn,
  hideFileName,
  btnText,
}: Props) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fieldName = schema.shape.file
    ? "file"
    : schema.shape.image
    ? "image"
    : "file";

  const onFileHandler = (providedFile: File) => {
    const result = schema
      .pick({ [fieldName]: true })
      .safeParse({ [fieldName]: providedFile });

    if (result.success) {
      form.clearErrors(fieldName);
      form.setValue(fieldName, providedFile);
      setFile(providedFile);
      if (getImagePreview) getImagePreview(URL.createObjectURL(providedFile));
    } else {
      const errors = result.error.flatten().fieldErrors[fieldName];
      errors?.forEach((error) =>
        form.setError(fieldName, { message: error })
      );
    }
    form.trigger(fieldName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) onFileHandler(files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) onFileHandler(files[0]);
  };

  const removeFile = () => {
    setFile(null);
    form.setValue(fieldName, null);
    form.trigger(fieldName);
  };

  return (
    <FormField
      name={fieldName}
      control={form.control}
      render={() => (
        <FormItem className="flex flex-col space-y-2">
          {LabelText && (
            <FormLabel className={LabelClassName}>{LabelText}</FormLabel>
          )}

          <FormControl>
            {useAsBtn ? (
              <>
                <Button
                  onClick={() => inputRef.current?.click()}
                  type="button"
                  className="dark:text-black mb-1"
                >
                  {btnText ?? "Upload"}
                </Button>
                <Input
                  ref={inputRef}
                  type="file"
                  accept={inputAccept}
                  tabIndex={-1}
                  onChange={handleChange}
                  className="hidden"
                />
              </>
            ) : (
              <div
                className={cn(
                  "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-200 ease-in-out text-center",
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/30 bg-muted hover:bg-muted/70",
                  ContainerClassName
                )}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => inputRef.current?.click()}
                role="presentation"
                tabIndex={0}
              >
                <Input
                  ref={inputRef}
                  type="file"
                  accept={inputAccept}
                  onChange={handleChange}
                  className="hidden"
                />

                {!file ? (
                  !hideFileName && (
                    <>
                      <UploadCloud
                        size={40}
                        className="text-muted-foreground mb-3"
                      />
                      <p className="font-medium text-sm sm:text-base text-foreground">
                        Drag & Drop or Click to Upload
                      </p>
                      {typesDescription && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Allowed: {typesDescription.join(", ")}
                        </p>
                      )}
                    </>
                  )
                ) : (
                  <div className="flex flex-col items-center space-y-2">
                    {!hideFileName && (
                      <p className="text-sm font-medium text-foreground">
                        {file.name}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={removeFile}
                      className="flex items-center gap-1 text-red-500 text-xs hover:underline"
                    >
                      <Trash size={14} /> Remove
                    </button>
                  </div>
                )}
              </div>
            )}
          </FormControl>

          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default UploadFile;
