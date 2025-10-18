"use client"
import UploadFile from '@/components/onboarding/UploadFile'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { workspacePicture, WorkspacePicture } from '@/schema/workSpaceSchema'
import { SettingsWorkspace } from '@/types/extended'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
    workspace: SettingsWorkspace
}

const EditworkspaceImage = ({ workspace: { id, color, name, image } }: Props) => {
    const t = useTranslations("EDIT_WORKSPACE.PICTURE")
    const [imagePreview, setImagePreview] = useState<string>("")
    const [isOpen, setIsOpen] = useState("false")

    const form = useForm<WorkspacePicture>({
        resolver: zodResolver(workspacePicture),
    })

    return <Dialog open={true}>
        <div>
            <Label>{t("LABLE")}</Label>
            <DialogTrigger asChild>
                <Button>Confirm</Button>
            </DialogTrigger>
        </div>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{t("TITLE")}</DialogTitle>
            </DialogHeader>
            <div>
                {imagePreview ? (
                    <Image
                        src={imagePreview}
                        width={450}
                        height={450}
                        alt='workspace image'
                        className=''
                    />
                ) : image ? (
                    <Image
                        src={image}
                        width={450}
                        height={450}
                        alt='workspace image'
                        className=''
                    />
                ) : (
                    <p>{name[0].toUpperCase()}</p>
                )}
            </div>
            <Form {...form}>
                <form>
                    <UploadFile
                        hideFileName
                        useAsBtn
                        btnText={t("BTN")}
                        ContainerClassName='w-full'
                        form={form}
                        schema={workspacePicture}
                        inputAccept='image/*'
                        getImagePreview={setImagePreview}
                    />
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}

export default EditworkspaceImage
