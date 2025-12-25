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
      workspaceName: ""
    }
  })

  const { currentStep, dispatch } = useOnboardingForm()

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadError: () => {
      toast.error("⚠️ Upload failed! Please try again with a valid image file.")
    },
    onClientUploadComplete: (data) => {
      if (data && data.length > 0) {
        dispatch({ type: ActionType.WORKSPACE_IMAGE, payload: data[0].url })
        toast.success("✅ Image uploaded successfully!")
      } else {
        toast.error("⚠️ Something went wrong. Please upload your image again.")
      }
    }
  })

  const onSubmit = async (data: WorkspaceSchema) => {
    const image: File | undefined | null = data.file

    try {
      if (image) {
        await startUpload([image])
      }
      dispatch({ type: ActionType.WORKSPACE_NAME, payload: data.workspaceName })
      dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 })
      toast.success(`🎉 Workspace "${data.workspaceName}" added successfully!`)
    } catch (err) {
      toast.error("❌ Failed to create workspace. Please check your connection and try again.")
      console.error("Workspace creation error:", err)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto dark:bg-[#0e0707] shadow-xl rounded-2xl p-8 sm:p-10 flex flex-col space-y-8 border mt-4"
    >
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Create Your Workspace
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Give your workspace a unique name and upload a logo.  
          Supported formats: <span className="font-medium text-foreground">PNG, JPG, or GIF</span>.
        </p>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Workspace Name */}
          <FormField
            name="workspaceName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Workspace Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. My Creative Studio"
                    className="dark:bg-[#0e0707] dark:text-[#f03d3d] border border-border focus:ring-2 focus:ring-primary transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload Section */}
          <UploadFile
            form={form}
            schema={imageSchema}
            inputAccept="image/*"
            typesDescription={[".jpg", ".jpeg", ".png", ".webp", ".gif"]}
          />

          {/* Continue Button */}
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isUploading}
              type="submit"
              className="rounded-lg px-6 font-semibold flex items-center gap-2 w-full"
            >
              {isUploading ? (
                <LoadingState loadingText="Uploading..." />
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
