"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { imageSchema } from "@/schema/imageSchem"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import UploadFile from "../UploadFile"
import { Button } from "@/components/ui/button"
import { WorkspaceSchema, workspaceSchema } from "@/schema/workSpaceSchema"
import { useOnboardingForm } from "@/context/OnboardingForm"
import { useUploadThing } from "@/lib/uploadthing"
import toast from "react-hot-toast"
import { ActionType } from "@/types/onBoardingContext"
import { Input } from "@/components/ui/input"
import { LoadingState } from "@/components/ui/LoadingState"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const Step3 = () => {
  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: ""
    }
  })

  const { currentStep, dispatch } = useOnboardingForm()

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toast.error("Error in uploading image")
    },
    onClientUploadComplete: (data) => {
      if (data) {
        dispatch({ type: ActionType.WORKSPACE_IMAGE, payload: data[0].url })
      } else {
        toast.error("Error in onClientUpload function")
      }
    }
  })

  const onSubmit = async (data: WorkspaceSchema) => {
    const image: File | undefined | null = data.file
    if (image) await startUpload([image])
    dispatch({ type: ActionType.WORKSPACE_NAME, payload: data.name })
    dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto bg-card shadow-xl rounded-2xl p-8 sm:p-10 flex flex-col space-y-8 border mt-4"
    >
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Create Your Workspace
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Give your workspace a name and upload an image (PNG, JPG, or GIF). This will help others recognize it easily.
        </p>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Workspace Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. My Creative Studio"
                    className="bg-muted/40 border border-border focus:ring-2 focus:ring-primary transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <UploadFile
            form={form}
            schema={imageSchema}
            inputAccpect="image/*"
            typesDescription={[".jpg", ".jpeg", ".png", ".webp", ".gif"]}
          />

          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isUploading}
              type="submit"
              className="rounded-lg px-6 font-semibold flex items-center gap-2 w-full"
            >
              {isUploading ? (
                <LoadingState />
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.section>
  )
}

export default Step3