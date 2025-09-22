"use client"
import React, { useRef, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Trash, UploadCloud } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"


interface Props {
  form: UseFormReturn<any>
  schema: z.ZodObject<any>
  getImagePriview?: React.Dispatch<React.SetStateAction<string>>
  inputAccpect: "image/*" | "pdf",
  typesDescription: string[];
  ContainerClassName?: string,
  LabelClassName?: string,
  LabelText?: string

}

const UploadFile = ({
  form,
  schema,
  getImagePriview,
  inputAccpect,
  typesDescription,
  ContainerClassName,
  LabelClassName,
  LabelText
}: Props) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onFileHandler = (providedFile: File) => {
    const result = schema.safeParse({ image: providedFile})

    if (result.success) {
      form.clearErrors("file")
      form.setValue("file", providedFile)
      setFile(providedFile)
      if (getImagePriview) getImagePriview(URL.createObjectURL(providedFile))
      console.log(result.data);
      toast.success("File uploaded successfully!")
    } else {
      const error = result.error.flatten().fieldErrors.file
      error?.forEach((error) => form.setError("file", { message: error }))
      console.log(error)
      toast.error("Failed to upload file.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) onFileHandler(files[0])
  }

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) onFileHandler(files[0])
  }

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const removeFile = () => {
    setFile(null)
    form.setValue("file", null)
  }

  return (
    <FormField
      name="file"
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-2">
          {LabelText && (
            <FormLabel className={LabelClassName}>{LabelText}</FormLabel>
          )}
          <FormControl>
            <div
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-200 ease-in-out text-center",
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/30 bg-muted hover:bg-muted/70",
                ContainerClassName

              )}
              onDragEnter={handleDragEnter}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
              role="presentation"
              tabIndex={0}
            >
              <Input
                {...field}
                ref={inputRef}
                value={undefined}
                type="file"
                accept={inputAccpect}
                onChange={handleChange}
                className="hidden"
              />

              {!file ? (
                <>
                  <UploadCloud size={40} className="text-muted-foreground mb-3" />
                  <p className="font-medium text-sm sm:text-base text-foreground">
                    Drag & Drop or Click to Upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Only <span className="font-semibold">.png</span>,{" "}
                    <span className="font-semibold">.jpg</span> allowed
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
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
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  )
}

export default UploadFile
