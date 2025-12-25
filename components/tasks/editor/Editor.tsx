"use client";

import React, { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { BubbleMenu } from "@tiptap/react/menus";
import { EditorContent } from "@tiptap/react";
import ToolsContainer from "./tools/ToolsContainer";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import FloatingContainer from "./tools/FloatingContainer";
import { Button } from "@/components/ui/button";
import Heading from "@tiptap/extension-heading";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useSaveTaskState } from "@/context/TaskSavingContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  content?: string
  taskId: string
  workspaceId: string
}
const EditorTask = ({ content, taskId, workspaceId }: Props) => {
  const [version, setVersion] = useState(0);
  const { onSetStatus, status } = useSaveTaskState();

  const editor = useEditor({
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-h-[300px] p-6 rounded-xl bg-white dark:bg-[#0e0707] " +
          "border shadow-md dark:border-gray-800 dark:shadow-lg focus:outline-none",
      },
    },

    onUpdate: () => {
      setVersion(v => v + 1)
      if (status === "unsaved") onSetStatus("unsaved")
      deboundedEditor()
    },
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3, 4],
        HTMLAttributes: {
          class: "scroll-mt-20",
        },
      }),
      Underline,
      Link.configure({ openOnClick: true }),
      Color,
      TextStyle,
      Image,
      CharacterCount.configure({ limit: 1000 }),
      Placeholder.configure({
        placeholder: "Start writing your task content here...",
        emptyNodeClass:
          "before:content-[attr(data-placeholder)] before:absolute before:italic before:text-gray-400 dark:before:text-gray-600",
      }),
    ],

    content: content ? content : "",
  });

  const { mutate: updateTaskContent } = useMutation({
    mutationFn: async (content: string) => {
      await axios.post(`/api/task/update/content`, {
        workspaceId,
        taskId,
        content
      })
    },
    onSuccess: () => {
      onSetStatus("saved")
    },
    onError: () => {
      onSetStatus("unsaved")
    }
  })


  const deboundedEditor = useDebouncedCallback(() => {
    if(!editor) return
    onSetStatus("pending")
    const text = editor?.getText()
    updateTaskContent(text)
  }, 5000)

  return (
    <div className="w-full flex justify-center items-center mt-5">
      <div className="w-full max-w-[1020px] relative space-y-6">
        <h1 className="text-2xl font-semibold">Here you can Edit and save your Tasks.</h1>
        {editor && (
          <BubbleMenu editor={editor} className="p-1 flex gap-1 rounded-xl bg-white dark:bg-gray-900 border shadow-lg">
            <ToolsContainer editor={editor} />
          </BubbleMenu>
        )}
        {editor && <FloatingContainer editor={editor} />}

        <div className="relative">
          <EditorContent editor={editor} spellCheck={false} />
        </div>

        {editor && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-300 dark:border-gray-700">

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span><strong>{editor.storage.characterCount.words()}</strong> words</span>
              <br />
              <span>
                Characters: <strong>{editor.storage.characterCount.characters()} / 1000</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorTask;
