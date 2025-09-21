"use client"
import React, { useMemo, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button"
import Image from "next/image"
import { Check, Trash, User } from "lucide-react"
import { UserAvatar } from "../ui/user-avatar"
import { useForm } from "react-hook-form"
import { imageSchema, ImageSchema } from "@/schema/imageSchem"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { useUploadThing } from "@/lib/uploadthing"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { User as UserType } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { LoadingState } from "../ui/LoadingState"
import toast from "react-hot-toast"
import { de } from "zod/v4/locales"

interface Props {
  profileImage?: string | null
}

const Profileimage = ({ profileImage }: Props) => {
  const [imagePriview, setImagePriview] = useState("")
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { update } = useSession()
  const inputRef = useRef<null | HTMLInputElement>(null)

  const form = useForm<ImageSchema>({
    resolver: zodResolver(imageSchema),
  })

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const result = imageSchema.safeParse({ image: selectedFile })
      if (result.success) {
        form.clearErrors("image")
        form.setValue("image", selectedFile)
        setImagePriview(URL.createObjectURL(selectedFile))
      } else {
        const error = result.error.flatten().fieldErrors.image
        error?.forEach((error) =>
          form.setError("image", { message: error })
        )
      }
    }
  }

  const imageOption = useMemo(() => {
    if (!imagePriview && profileImage) {
      return { canDelete: true, canSave: false }
    } else if (imagePriview) {
      return { canDelete: false, canSave: true }
    } else {
      return { canDelete: false, canSave: false }
    }
  }, [imagePriview, profileImage])

  const { startUpload, isUploading } = useUploadThing(
    "profilePictureUploader",
    {
      onUploadError: (error) => {
        toast.error("Error in uploading image")
      },
      onClientUploadComplete: (data) => {
        if (data) uploadProfileImage(data[0].url)
        else {
          toast.error("Error in onClientUpload function")
        }
      }
    }
  )

  const { mutate: uploadProfileImage, isPending } = useMutation({
    mutationFn: async (profileImage: string) => {
      const { data } = await axios.post(`/api/profile/ProfileImage`, {
        profileImage,
      })
      return data as UserType
    },
    onError: (err) => {
      toast.error("Error during Profile Image Update")
    },
    onSuccess: async () => {
      setOpen(false)
      await update()
      router.refresh()
      toast.success("Successfully Update Profile Image")
    }, mutationKey: ["updateProfileImage"]
  })

  // delete image
  const { mutate: deleteProfileImage, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/profile/DeleteProfileImage`)
      return data as UserType
    },
    onError: () => {
      toast.error("Error During Delete Profile-Image")
    },
    onSuccess: async () => {
      toast.success("Successfully delet image")
      await update()
      router.refresh()
    }, mutationKey: ["deleteProfileImage"]
  })

  const onSubmit = async (data: ImageSchema) => {
    const image: File = data.image
    await startUpload([image])
  }

  return (
    <section className="space-y-6 w-full flex flex-col justify-center items-center">
      {/* Title */}
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Add a Profile Image
      </p>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative w-28 h-28 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-muted/30"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile image"
                fill
                className="object-cover cursor-pointer"
                priority
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </Button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl shadow-xl max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Upload a Photo
            </DialogTitle>
          </DialogHeader>

          {/* Preview / Avatar */}
          <div className="relative w-40 h-40 rounded-full shadow-lg overflow-hidde">
            {imagePriview ? (
              <Image
                src={imagePriview}
                fill
                alt="Preview"
                className="object-cover"
              />
            ) : (
              <UserAvatar
                className="w-40 h-40 cursor-pointer"
                size={160}
                profileImage={profileImage}
              />
            )}
          </div>

          {/* Upload Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col items-center gap-6"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col items-center gap-3">
                        <Button
                          onClick={() => {
                            inputRef.current?.click()
                          }}
                          type="button"
                          variant="secondary"
                          className="rounded-lg px-6 font-medium"
                        >
                          Choose a file
                        </Button>
                        <Input
                          {...field}
                          ref={inputRef}
                          value={undefined}
                          type="file"
                          id="image"
                          onChange={onImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  type="button"
                  disabled={!imageOption.canDelete || isDeleting}
                  variant={imageOption.canDelete ? "destructive" : "outline"}
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                  onClick={() => deleteProfileImage()}
                >
                  {isDeleting ? <LoadingState /> : <Trash size={18} />}
                </Button>

                <Button
                  type="submit"
                  disabled={!imageOption.canSave || isPending || isUploading}
                  variant={imageOption.canSave ? "default" : "outline"}
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-md hover:scale-105 transition-transform"
                >
                  {isPending || isUploading ? (
                    <LoadingState />
                  ) : (
                    <Check size={20} />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default Profileimage
