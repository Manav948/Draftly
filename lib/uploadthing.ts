import { OurFileRouter } from "@/app/api/uploadthing/core"
import { generateReactHelpers } from "@uploadthing/react"
import { generateUploadButton } from "@uploadthing/react"
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
export const UploadButton = generateUploadButton<OurFileRouter>()