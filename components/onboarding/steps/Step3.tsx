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
import { ArrowRight, LayoutDashboard } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const Step3 = () => {
  const { currentStep, dispatch, workspaceName } = useOnboardingForm()

  const form = useForm<WorkspaceSchema>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: workspaceName || ""
    }
  })

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
      toast.success(`Workspace "${data.workspaceName}" added successfully!`)
    } catch (err) {
      toast.error("❌ Failed to create workspace. Please check your connection and try again.")
      console.error("Workspace creation error:", err)
    }
  }

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <div className="text-center mb-8">
        <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold dark:text-white mb-2">
          Create Your Workspace
        </motion.h2>
        <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Give your workspace a unique name and upload a memorable logo.
        </motion.p>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-6 sm:px-4" onSubmit={form.handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants}>
            <FormField
              name="workspaceName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300 font-medium">Workspace Name</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LayoutDashboard className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        placeholder="e.g. My Creative Studio"
                        className="pl-10 h-12 bg-white/50 dark:bg-black/40 border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-500 transition-all shadow-sm rounded-xl dark:text-white"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white/40 dark:bg-black/20 p-1 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 shadow-inner">
            <UploadFile
              form={form}
              schema={imageSchema}
              inputAccept="image/*"
              typesDescription={[".jpg", ".jpeg", ".png", ".webp", ".gif"]}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <Button
              disabled={isUploading}
              type="submit"
              className="w-full h-14 bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] transition-all duration-300 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 disabled:bg-red-600/50"
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
          </motion.div>
        </form>
      </Form>
    </motion.section>
  )
}

export default Step3
