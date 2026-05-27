"use client";

import { Editor } from "@tiptap/react";
import { FloatingMenu } from "@tiptap/react/menus";
import React from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  Minus,
  ImageIcon,
} from "lucide-react";
import AddImage from "./addImage/AddImage";

interface Props {
  editor: Editor;
}

interface FloatBtnProps {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

const FloatBtn = ({ onClick, active, title, children }: FloatBtnProps) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`task-float-btn ${active ? "task-float-btn-active" : ""}`}
  >
    {children}
  </button>
);

const FloatingContainer = ({ editor }: Props) => {
  return (
    <FloatingMenu
      editor={editor}
      className="task-floating-menu"
    >
      <FloatBtn
        title="Heading 1 (F1)"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 size={15} />
      </FloatBtn>

      <FloatBtn
        title="Heading 2 (F2)"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 size={15} />
      </FloatBtn>

      <FloatBtn
        title="Heading 3 (F3)"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 size={15} />
      </FloatBtn>

      <FloatBtn
        title="Heading 4 (F4)"
        active={editor.isActive("heading", { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
      >
        <Heading4 size={15} />
      </FloatBtn>

      <div className="task-float-divider" />

      <FloatBtn
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={15} />
      </FloatBtn>

      <FloatBtn
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={15} />
      </FloatBtn>

      <FloatBtn
        title="Task list"
        active={editor.isActive("taskList")}
        onClick={() => editor.chain().focus().toggleTaskList().run()}
      >
        <ListChecks size={15} />
      </FloatBtn>

      <FloatBtn
        title="Blockquote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={14} />
      </FloatBtn>

      <FloatBtn
        title="Divider"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus size={14} />
      </FloatBtn>

      <div className="task-float-divider" />

      <div className="task-float-image-wrap">
        <AddImage editor={editor} />
      </div>
    </FloatingMenu>
  );
};

export default FloatingContainer;