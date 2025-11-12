"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import OptionBtn from "./OptionBtn";
import {
    Bold,
    Code2,
    Eraser,
    ItalicIcon,
    Redo2,
    Strikethrough,
    UnderlineIcon,
    Undo2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddLink from "./AddLink";

interface Props {
    editor: Editor;
}

const ToolsContainer = ({ editor }: Props) => {
    return (
        <div
            className="
        flex items-center gap-2 px-3 py-2 rounded-xl
        bg-gray-100/70 dark:bg-neutral-800/70
        border border-gray-200 dark:border-gray-700
        shadow-sm backdrop-blur-md
      "
        >
            <OptionBtn
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("bold")
                    ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : ""
                    }`}
            >
                <Bold size={16} />
            </OptionBtn>

            <OptionBtn
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("italic")
                    ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : ""
                    }`}
            >
                <ItalicIcon size={16} />
            </OptionBtn>

            <OptionBtn
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("underline")
                    ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : ""
                    }`}
            >
                <UnderlineIcon size={16} />
            </OptionBtn>

            <OptionBtn
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("strike")
                    ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : ""
                    }`}
            >
                <Strikethrough size={16} />
            </OptionBtn>

            <OptionBtn
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 ${editor.isActive("code")
                    ? "bg-gray-300 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                    : ""
                    }`}
            >
                <Code2 size={16} />
            </OptionBtn>

            <Separator className="h-6 bg-gray-300 dark:bg-gray-700" orientation="vertical" />
            <AddLink editor={editor} />
            <Separator className="h-6 bg-gray-300 dark:bg-gray-700" orientation="vertical" />

            <div className="flex items-center gap-1.5">
                {[
                    { color: "#8b5cf6", name: "violet" },
                    { color: "#f43f5e", name: "rose" },
                    { color: "#10b981", name: "green" },
                    { color: "#f59e0b", name: "amber" },
                    { color: "#000000", name: "black" }
                ].map((clr) => (
                    <OptionBtn
                        key={clr.color}
                        type="button"
                        onClick={() => editor.chain().focus().setColor(clr.color).run()}
                        className={`
              p-1.5 border border-gray-200 dark:border-gray-700 
              rounded-full hover:scale-110 transition-transform
              ${editor.isActive("textStyle", { color: clr.color })
                                ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400"
                                : ""}
            `}
                    >
                        <span
                            className="block w-4 h-4 rounded-full"
                            style={{ backgroundColor: clr.color }}
                        ></span>
                    </OptionBtn>
                ))}
            </div>

            <OptionBtn
                type="button"
                onClick={() => editor.chain().focus().unsetColor().run()}
                className="
            p-1.5 border border-gray-200 dark:border-gray-700 
            rounded-full hover:scale-110 transition-transform
            bg-white dark:bg-gray-900
          "
            >
                <span
                    className="
              block w-4 h-4 rounded-full 
              bg-white dark:bg-gray-900 
              ring-2 ring-gray-300 dark:ring-gray-600
            "
                ></span>
            </OptionBtn>

            <Separator className="h-6 bg-gray-300 dark:bg-gray-700" orientation="vertical" />
            <OptionBtn
                onClick={() => editor.commands.undo()}
            >
                <Undo2 size={16} />
            </OptionBtn>


            <OptionBtn
                onClick={() => editor.commands.redo()}
            >
                <Redo2 size={16} />
            </OptionBtn>

            <OptionBtn
                onClick={() => editor.commands.deleteSelection()}
            >
                <Eraser size={16} />
            </OptionBtn> 
        </div>
    );
};

export default ToolsContainer;
