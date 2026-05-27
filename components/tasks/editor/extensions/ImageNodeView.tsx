"use client";

import React, { useState, useRef, useEffect } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react";

export const ImageNodeView = ({
  node,
  updateAttributes,
  selected,
  editor,
  getPos,
}: NodeViewProps) => {
  const { src, alt, width, alignment } = node.attrs;
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [resizing, setResizing] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(width || "100%");

  // Sync width when node attributes update externally
  useEffect(() => {
    if (width) {
      setCurrentWidth(width);
    }
  }, [width]);

  const handleResizeStart = (
    e: React.MouseEvent,
    direction: "left" | "right"
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startWidth = imgRef.current
      ? imgRef.current.clientWidth
      : parseInt(currentWidth, 10) || 300;

    setResizing(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      let newWidth =
        direction === "right" ? startWidth + deltaX : startWidth - deltaX;

      // Constrain width
      const minWidth = 100;
      const maxWidth = containerRef.current
        ? containerRef.current.clientWidth
        : 800;

      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;

      setCurrentWidth(`${newWidth}px`);
    };

    const handleMouseUp = () => {
      setResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      // Save width to attributes
      const finalWidth = imgRef.current
        ? `${imgRef.current.clientWidth}px`
        : currentWidth;
      updateAttributes({ width: finalWidth });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleAlign = (align: "left" | "center" | "right") => {
    updateAttributes({ alignment: align });
  };

  const handleDelete = () => {
    if (typeof getPos === "function") {
      const pos = getPos();
      if (typeof pos === "number") {
        editor.commands.deleteRange({ from: pos, to: pos + 1 });
      }
    }
  };

  // Wrapper flex styling to align the image container block
  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    justifyContent:
      alignment === "left"
        ? "flex-start"
        : alignment === "right"
        ? "flex-end"
        : "center",
    margin: "1.5rem 0",
  };

  return (
    <NodeViewWrapper style={wrapperStyle} ref={containerRef}>
      <div
        className={`relative group inline-block transition-all ${
          selected
            ? "ring-2 ring-indigo-500 rounded-lg p-1 bg-indigo-50/10 dark:bg-indigo-950/10"
            : ""
        }`}
        style={{ width: currentWidth, maxWidth: "100%" }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "none",
            margin: 0,
            display: "block",
            transform: "none", // Avoid conflict with hover animations
          }}
          className="task-editor-image select-none cursor-pointer rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 shadow-md"
        />

        {/* Selected overlays, handles, and floating toolbar */}
        {selected && (
          <>
            {/* Side middle drag handles */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-8 bg-indigo-500 rounded-full border border-white dark:border-zinc-950 cursor-ew-resize hover:scale-125 hover:bg-indigo-600 transition-all z-10 shadow"
              onMouseDown={(e) => handleResizeStart(e, "left")}
            />
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-8 bg-indigo-500 rounded-full border border-white dark:border-zinc-950 cursor-ew-resize hover:scale-125 hover:bg-indigo-600 transition-all z-10 shadow"
              onMouseDown={(e) => handleResizeStart(e, "right")}
            />

            {/* Corner drag handles */}
            <div
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white dark:border-zinc-950 rounded-full cursor-nwse-resize hover:scale-125 hover:bg-indigo-600 transition-all z-10 shadow"
              onMouseDown={(e) => handleResizeStart(e, "left")}
            />
            <div
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white dark:border-zinc-950 rounded-full cursor-nesw-resize hover:scale-125 hover:bg-indigo-600 transition-all z-10 shadow"
              onMouseDown={(e) => handleResizeStart(e, "right")}
            />
            <div
              className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white dark:border-zinc-950 rounded-full cursor-nesw-resize hover:scale-125 hover:bg-indigo-600 transition-all z-10 shadow"
              onMouseDown={(e) => handleResizeStart(e, "left")}
            />
            <div
              className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 bg-indigo-500 border-2 border-white dark:border-zinc-950 rounded-full cursor-nwse-resize hover:scale-125 hover:bg-indigo-600 transition-all z-10 shadow"
              onMouseDown={(e) => handleResizeStart(e, "right")}
            />

            {/* Size tooltip badge */}
            {resizing && imgRef.current && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-950 text-[10px] font-semibold px-2 py-0.5 rounded shadow pointer-events-none z-30">
                {imgRef.current.clientWidth}px
              </div>
            )}

            {/* Floating toolbar for alignment and delete */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg flex items-center p-1 gap-0.5 z-20 animate-in fade-in zoom-in-95 duration-100">
              <button
                type="button"
                onClick={() => handleAlign("left")}
                className={`p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                  alignment === "left"
                    ? "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleAlign("center")}
                className={`p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                  alignment === "center" || !alignment
                    ? "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
                title="Align Center"
              >
                <AlignCenter size={16} />
              </button>
              <button
                type="button"
                onClick={() => handleAlign("right")}
                className={`p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                  alignment === "right"
                    ? "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/40"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
                title="Align Right"
              >
                <AlignRight size={16} />
              </button>
              <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />
              <button
                type="button"
                onClick={handleDelete}
                className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:text-red-400 text-zinc-500 dark:text-zinc-400 transition-colors"
                title="Delete Image"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </NodeViewWrapper>
  );
};
