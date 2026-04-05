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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full xl:w-[500px] max-w-[95%] sm:max-w-lg mx-auto p-6 sm:p-8 space-y-6 sm:space-y-8 rounded-2xl shadow-lg bg-white dark:bg-[#0a0505] border border-gray-200 dark:border-red-900/30 my-4 sm:mt-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">
          Create Your Workspace
        </h2>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Give your workspace a unique name and upload a logo.
          Supported formats: <span className="font-medium dark:text-gray-200">PNG, JPG, or GIF</span>.
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
                <FormLabel className="dark:text-gray-200">Workspace Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. My Creative Studio"
                    className="dark:bg-[#110505] dark:border-red-900/40 focus:ring-2 focus:ring-red-500 transition-all dark:text-white"
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
          <Button
            disabled={isUploading}
            type="submit"
            className="w-full py-6 text-base font-semibold mt-2"
          >
            {isUploading ? (
              <LoadingState loadingText="Uploading..." />
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </motion.section>
  )
}

export default Step3
