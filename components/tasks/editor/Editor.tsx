"use client";

import React, { useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { ResizableImage } from "./extensions/ResizableImage";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useDebouncedCallback } from "use-debounce";
import { useSaveTaskState } from "@/context/TaskSavingContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import PersistentToolbar from "./tools/PersistentToolbar";
import InlineBubbleMenu from "./tools/InlineBubbleMenu";
import FloatingContainer from "./tools/FloatingContainer";

interface Props {
  content?: string;
  taskId: string;
  workspaceId: string;
}

const EditorTask = ({ content, taskId, workspaceId }: Props) => {
  const { onSetStatus } = useSaveTaskState();

  const { mutate: updateTaskContent } = useMutation({
    mutationFn: async (htmlContent: string) => {
      await axios.post(`/api/task/update/content`, {
        workspaceId,
        taskId,
        content: htmlContent,
      });
    },
    onSuccess: () => {
      onSetStatus("saved");
    },
    onError: () => {
      onSetStatus("unsaved");
    },
  });

  const debouncedSave = useDebouncedCallback(() => {
    if (!editor) return;
    onSetStatus("pending");
    // Save full HTML to preserve ALL formatting: colors, bold, italic, headings, etc.
    updateTaskContent(editor.getHTML());
  }, 2000);

  const editor = useEditor({
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "task-editor-content focus:outline-none min-h-[420px] leading-relaxed",
        spellcheck: "false",
      },
      handleKeyDown(view, event) {
        // F1–F4 for headings
        if (event.key === "F1") {
          event.preventDefault();
          editor?.chain().focus().toggleHeading({ level: 1 }).run();
          return true;
        }
        if (event.key === "F2") {
          event.preventDefault();
          editor?.chain().focus().toggleHeading({ level: 2 }).run();
          return true;
        }
        if (event.key === "F3") {
          event.preventDefault();
          editor?.chain().focus().toggleHeading({ level: 3 }).run();
          return true;
        }
        if (event.key === "F4") {
          event.preventDefault();
          editor?.chain().focus().toggleHeading({ level: 4 }).run();
          return true;
        }
        return false;
      },
    },

    onUpdate: () => {
      onSetStatus("unsaved");
      debouncedSave();
    },

    extensions: [
      StarterKit.configure({
        heading: false, // handled by Heading extension below
      }),
      Heading.configure({
        levels: [1, 2, 3, 4],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "task-editor-link",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Color,
      TextStyle,
      ResizableImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "task-editor-image",
        },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
      CharacterCount.configure({ limit: 50000 }),
      Placeholder.configure({
        placeholder: "Start writing… Press / for commands, or use the toolbar above.",
        emptyNodeClass: "task-editor-placeholder",
      }),
    ],

    // Load stored HTML to restore ALL formatting on revisit
    content: content || "",
  });

  return (
    <div className="task-editor-root">
      <PersistentToolbar editor={editor} />

      {editor && (
        <BubbleMenu
          editor={editor}
          className="task-bubble-menu"
        >
          <InlineBubbleMenu editor={editor} />
        </BubbleMenu>
      )}

      {editor && <FloatingContainer editor={editor} />}

      <div className="task-editor-body">
        <EditorContent editor={editor} />
      </div>

      {editor && (
        <div className="task-editor-footer">
          <span className="task-editor-meta">
            {editor.storage.characterCount.words()} words
          </span>
          <span className="task-editor-meta-sep">·</span>
          <span className="task-editor-meta">
            {editor.storage.characterCount.characters()} chars
          </span>
        </div>
      )}
    </div>
  );
};

export default EditorTask;
