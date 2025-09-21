"use client"
import React, { useRef, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { UploadCloud, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  form: UseFormReturn
  schema: z.ZodObject<any>
  getImagePriview?: React.Dispatch<React.SetStateAction<string>>
  maxFiles?: number
  zodKey: string
}

const UploadFile = ({ form, schema, getImagePriview, maxFiles, zodKey }: Props) => {
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onFileHandler = (file: File) => {
    const result = schema.safeParse({ image: file })

    if (result.success) {
      form.clearErrors(zodKey)
      form.setValue(zodKey, file)
      setFile(file)
      if (getImagePriview) getImagePriview(URL.createObjectURL(file))
    } else {
      const error = result.error.flatten().fieldErrors.image
      error?.forEach((error) => form.setError(zodKey, { message: error }))
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
    form.setValue(zodKey, null)
  }

  return (
    <FormField
      name="image"
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-2">
          <FormControl>
            <div
              className={cn(
                "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-200 ease-in-out text-center",
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/30 bg-muted hover:bg-muted/70"
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
                accept="image/*"
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
                    <X size={14} /> Remove
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
