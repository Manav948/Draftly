"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { linkSchema, LinkSchema } from "@/schema/linkSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tiptap/react";
import { Link2, Trash, Save } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  editor: Editor | null;
}

const AddLink = ({ editor }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      link: "",
    },
  });

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsOpen(false);
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    form.setValue("link", previousUrl ? previousUrl : "");
  }, [editor, form]);

  const saveLink = useCallback(
    (data: LinkSchema) => {
      const { link } = data;
      if (editor) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: link })
          .run();
      }
    },
    [editor]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          onClick={setLink}
          className="rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          <Link2 size={17} />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-xl shadow-2xl border border-gray-300/40 dark:border-gray-700/40 
      bg-white/90 dark:bg-black/70 backdrop-blur-xl transition-all max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-wide">
            Insert or Edit Link
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Link URL</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      className="rounded-lg bg-muted/40 focus:ring-2 focus:ring-primary/60 
                      border border-gray-300 dark:border-gray-700"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                type="button"
                className="rounded-lg py-3 flex items-center gap-2 justify-center 
                bg-red-500/90 hover:bg-red-600 text-white transition-all 
                shadow-md disabled:opacity-40"
                onClick={removeLink}
                disabled={!editor?.getAttributes("link").href}
              >
                <Trash size={16} />
                Remove
              </Button>

              <Button
                type="button"
                className="rounded-lg py-3 flex items-center gap-2 justify-center 
                bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
                onClick={() => {
                  form.handleSubmit(saveLink)();
                  setIsOpen(false);
                }}
              >
                <Save size={16} />
                Save Link
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLink;
