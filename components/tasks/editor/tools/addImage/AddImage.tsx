import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import OptionBtn from "../OptionBtn";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import AddImageByLink from "./AddImageByLink";
import AddImageByImported from "./AddImageByImported";

interface Props {
    editor: Editor;
}

const AddImage = ({ editor }: Props) => {
    const addImage = useCallback(
        (link: string) => {
            if (!link) return;

            editor
                .chain()
                .focus()
                .setImage({
                    src: link,
                    alt: "Image",
                })
                .run();
        },
        [editor]
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <OptionBtn type="button">
                    <ImageIcon size={18} />
                </OptionBtn>
            </DialogTrigger>

            <DialogContent className="max-w-md rounded-xl bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black border shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Add Image
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        You can insert an image using a direct link or upload from your device.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="byLink" className="mt-3">
                    <TabsList className="grid grid-cols-2 w-full dark:bg-gray-950 border shadow">
                        <TabsTrigger value="byLink">Add via Link</TabsTrigger>
                        <TabsTrigger value="uploadImage">Upload File</TabsTrigger>
                    </TabsList>

                    <TabsContent value="byLink" className="mt-4">
                        <AddImageByLink onAddImage={addImage} />
                    </TabsContent>

                    <TabsContent
                        value="uploadImage"
                        className="mt-4 text-sm text-muted-foreground"
                    >
                        <div className="p-4 border rounded-lg bg-muted">
                          <AddImageByImported onAddImage={addImage} />
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AddImage;
