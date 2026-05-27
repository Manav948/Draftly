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
import { Link2, Trash2, Check } from "lucide-react";
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
          title="Insert link"
          className="w-full h-full rounded-none bg-transparent border-none shadow-none p-0"
        >
          <Link2 size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-sm rounded-xl border"
        style={{
          background: "var(--popover)",
          borderColor: "var(--border)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold tracking-tight">
            Insert Link
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground font-medium">
                    URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      autoFocus
                      {...field}
                      className="h-9 text-sm rounded-lg bg-muted/30 border-border/60 focus:border-indigo-500/50"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-1">
              <Button
                variant="ghost"
                type="button"
                size="sm"
                className="flex-1 h-8 text-xs rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-1.5"
                onClick={removeLink}
                disabled={!editor?.getAttributes("link").href}
              >
                <Trash2 size={12} />
                Remove
              </Button>

              <Button
                type="button"
                size="sm"
                className="flex-1 h-8 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5"
                onClick={() => {
                  form.handleSubmit(saveLink)();
                  setIsOpen(false);
                }}
              >
                <Check size={12} />
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLink;
