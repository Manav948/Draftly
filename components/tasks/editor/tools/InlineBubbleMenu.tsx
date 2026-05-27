"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code2,
  Link2,
} from "lucide-react";
import AddLink from "./AddLink";

interface Props {
  editor: Editor;
}

interface BubbleBtnProps {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}

const BubbleBtn = ({ onClick, active, title, children }: BubbleBtnProps) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`task-bubble-btn ${active ? "task-bubble-btn-active" : ""}`}
  >
    {children}
  </button>
);

const InlineBubbleMenu = ({ editor }: Props) => {
  return (
    <div className="task-bubble-inner">
      <BubbleBtn
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={13} />
      </BubbleBtn>
      <BubbleBtn
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={13} />
      </BubbleBtn>
      <BubbleBtn
        title="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon size={13} />
      </BubbleBtn>
      <BubbleBtn
        title="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={13} />
      </BubbleBtn>
      <BubbleBtn
        title="Code"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code2 size={13} />
      </BubbleBtn>

      <div className="task-bubble-divider" />

      <div className="task-bubble-link-wrap">
        <AddLink editor={editor} />
      </div>
    </div>
  );
};

export default InlineBubbleMenu;
