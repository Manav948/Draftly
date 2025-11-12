"use client";
import React from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { BubbleMenu } from "@tiptap/react/menus";
import { EditorContent } from "@tiptap/react";
import AddLink from "./tools/AddLink";
import ToolsContainer from "./tools/ToolsContainer";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import {History} from "@tiptap/extension-history";
const EditorTask = () => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl " +
          "focus:outline-none max-w-full min-h-[350px] p-5 rounded-xl " +
          "bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-800 " +
          "shadow-sm dark:shadow-md transition-all",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Underline,
      Link,
      Color,
      TextStyle,
    ],
    content: `
      <h1>This is a heading</h1>
      <p>Start writing your task content here...</p>
    `,
  });

  return (
    <div className="w-full flex justify-between mt-5">
      <div className="w-full max-w-4xl">
        {editor && (
          <>
            <BubbleMenu
              editor={editor}
              className="
                flex gap-1 p-1 rounded-xl shadow-xl border 
                bg-white/90 dark:bg-black/80 backdrop-blur-md 
                border-gray-200 dark:border-gray-700
              "
            >
              <AddLink editor={editor} />
              <ToolsContainer editor={editor} />
            </BubbleMenu>

            <EditorContent editor={editor} spellCheck={false} />
          </>
        )}
      </div>
    </div>
  );
};

export default EditorTask;
