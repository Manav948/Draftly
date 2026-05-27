"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code2,
  List,
  ListOrdered,
  Link2,
  ImageIcon,
  Undo2,
  Redo2,
  ListChecks,
  Quote,
  Minus,
  ChevronDown,
  Type,
} from "lucide-react";
import AddLink from "./AddLink";
import AddImage from "./addImage/AddImage";

interface Props {
  editor: Editor | null;
}

const HEADING_OPTIONS = [
  { label: "Paragraph", value: 0, shortcut: "Normal" },
  { label: "Heading 1", value: 1, shortcut: "F1" },
  { label: "Heading 2", value: 2, shortcut: "F2" },
  { label: "Heading 3", value: 3, shortcut: "F3" },
  { label: "Heading 4", value: 4, shortcut: "F4" },
];

const TEXT_COLORS = [
  { color: "#e2e8f0", name: "Default" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#6366f1", name: "Indigo" },
  { color: "#3b82f6", name: "Blue" },
  { color: "#10b981", name: "Emerald" },
  { color: "#f59e0b", name: "Amber" },
  { color: "#f43f5e", name: "Rose" },
  { color: "#94a3b8", name: "Muted" },
];

const ToolDivider = () => (
  <div className="task-toolbar-divider" />
);

interface ToolBtnProps {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const ToolBtn = ({ onClick, active, title, children, disabled }: ToolBtnProps) => (
  <button
    type="button"
    title={title}
    disabled={disabled}
    onClick={onClick}
    className={`task-toolbar-btn ${active ? "task-toolbar-btn-active" : ""} ${disabled ? "task-toolbar-btn-disabled" : ""}`}
  >
    {children}
  </button>
);

const PersistentToolbar = ({ editor }: Props) => {
  const [headingOpen, setHeadingOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);

  if (!editor) {
    return <div className="task-toolbar-skeleton" />;
  }

  const getCurrentHeading = () => {
    for (let i = 1; i <= 4; i++) {
      if (editor.isActive("heading", { level: i })) {
        return HEADING_OPTIONS.find(h => h.value === i)!;
      }
    }
    return HEADING_OPTIONS[0];
  };

  const currentHeading = getCurrentHeading();

  return (
    <div className="task-toolbar">
      {/* Heading selector */}
      <div className="task-toolbar-dropdown-root">
        <button
          type="button"
          className="task-toolbar-heading-selector"
          onClick={() => {
            setHeadingOpen(p => !p);
            setColorOpen(false);
          }}
          title="Text style"
        >
          <Type size={13} className="opacity-60" />
          <span className="task-toolbar-heading-label">{currentHeading.label}</span>
          <ChevronDown
            size={12}
            className={`task-toolbar-chevron ${headingOpen ? "task-toolbar-chevron-open" : ""}`}
          />
        </button>

        {headingOpen && (
          <>
            <div className="task-toolbar-overlay" onClick={() => setHeadingOpen(false)} />
            <div className="task-toolbar-dropdown">
              {HEADING_OPTIONS.map((h) => (
                <button
                  key={h.value}
                  type="button"
                  className={`task-toolbar-dropdown-item ${currentHeading.value === h.value ? "task-toolbar-dropdown-item-active" : ""}`}
                  onClick={() => {
                    if (h.value === 0) {
                      editor.chain().focus().setParagraph().run();
                    } else {
                      editor.chain().focus().toggleHeading({ level: h.value as 1|2|3|4 }).run();
                    }
                    setHeadingOpen(false);
                  }}
                >
                  <span
                    className={`task-toolbar-heading-preview task-toolbar-heading-preview-${h.value}`}
                  >
                    {h.label}
                  </span>
                  <span className="task-toolbar-shortcut">{h.shortcut}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <ToolDivider />

      {/* Text formatting */}
      <div className="task-toolbar-group">
        <ToolBtn
          title="Bold (Ctrl+B)"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </ToolBtn>
        <ToolBtn
          title="Italic (Ctrl+I)"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </ToolBtn>
        <ToolBtn
          title="Underline (Ctrl+U)"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={14} />
        </ToolBtn>
        <ToolBtn
          title="Strikethrough"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={14} />
        </ToolBtn>
        <ToolBtn
          title="Inline code"
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code2 size={14} />
        </ToolBtn>
      </div>

      <ToolDivider />

      {/* Lists & blocks */}
      <div className="task-toolbar-group">
        <ToolBtn
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={15} />
        </ToolBtn>
        <ToolBtn
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={15} />
        </ToolBtn>
        <ToolBtn
          title="Task checklist"
          active={editor.isActive("taskList")}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <ListChecks size={15} />
        </ToolBtn>
        <ToolBtn
          title="Blockquote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={14} />
        </ToolBtn>
        <ToolBtn
          title="Horizontal rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={14} />
        </ToolBtn>
      </div>

      <ToolDivider />

      {/* Color picker */}
      <div className="task-toolbar-dropdown-root">
        <button
          type="button"
          title="Text color"
          className="task-toolbar-color-trigger"
          onClick={() => {
            setColorOpen(p => !p);
            setHeadingOpen(false);
          }}
        >
          <span className="task-toolbar-color-icon">A</span>
          <span
            className="task-toolbar-color-bar"
            style={{
              background: editor.getAttributes("textStyle").color || "#e2e8f0",
            }}
          />
          <ChevronDown size={10} className="opacity-40" />
        </button>

        {colorOpen && (
          <>
            <div className="task-toolbar-overlay" onClick={() => setColorOpen(false)} />
            <div className="task-toolbar-dropdown task-toolbar-color-dropdown">
              <p className="task-toolbar-color-label">Text color</p>
              <div className="task-toolbar-color-grid">
                {TEXT_COLORS.map((clr) => (
                  <button
                    key={clr.color}
                    type="button"
                    title={clr.name}
                    className={`task-toolbar-color-swatch ${
                      editor.isActive("textStyle", { color: clr.color })
                        ? "task-toolbar-color-swatch-active"
                        : ""
                    }`}
                    style={{ backgroundColor: clr.color }}
                    onClick={() => {
                      if (clr.name === "Default") {
                        editor.chain().focus().unsetColor().run();
                      } else {
                        editor.chain().focus().setColor(clr.color).run();
                      }
                      setColorOpen(false);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                className="task-toolbar-color-reset"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setColorOpen(false);
                }}
              >
                Reset color
              </button>
            </div>
          </>
        )}
      </div>


      <ToolDivider />

      {/* Link & image */}
      <div className="task-toolbar-group">
        <div className="task-toolbar-plugin-wrap">
          <AddLink editor={editor} />
        </div>
        <div className="task-toolbar-plugin-wrap">
          <AddImage editor={editor} />
        </div>
      </div>

      <ToolDivider />

      {/* Undo / Redo */}
      <div className="task-toolbar-group">
        <ToolBtn
          title="Undo (Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 size={14} />
        </ToolBtn>
        <ToolBtn
          title="Redo (Ctrl+Y)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 size={14} />
        </ToolBtn>
      </div>
    </div>
  );
};

export default PersistentToolbar;
