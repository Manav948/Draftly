import { Form } from "@/components/ui/form"
import { imageSchema, ImageSchema } from "@/schema/imageSchem"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import UploadFile from "../UploadFile"
import { Button } from "@/components/ui/button"

const Step3 = () => {
  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
  })

  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center space-y-8 p-6 sm:p-10 bg-background rounded-2xl shadow-md">
      {/* Step Heading */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Create a Workspace
        </h2>
        <p className="text-sm text-muted-foreground">
          Upload your workspace image (PNG or JPG)
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form className="w-full flex flex-col items-center gap-6">
          <UploadFile form={form} schema={imageSchema} zodKey="image" />

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg px-6"
            >
              Back
            </Button>
            <Button type="submit" className="rounded-lg px-6">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default Step3
