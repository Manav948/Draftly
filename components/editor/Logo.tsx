"use client";
import React, { useEffect, useState } from "react";
import EmojiSelector from "@/components/common/EmojiSelector";
import { useSaveTaskState } from "@/context/TaskSavingContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  onFormSelect?: (emoji: string) => void;
  emoji: string
  taskId: string
  workspaceId: string
}

const Logo = ({ onFormSelect, emoji, taskId, workspaceId }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState(emoji || "✌️");
  const { status, onSetStatus } = useSaveTaskState();

  // Sync with parent when the emoji prop changes
  useEffect(() => {
    if (emoji) setSelectedEmoji(emoji);
  }, [emoji]);

  const { mutate: updateTaskEmoji } = useMutation({
    mutationFn: async (newEmoji: string) => {
      await axios.post(`/api/task/update/emoji`, {
        workspaceId,
        taskId,
        emoji: newEmoji
      })
    },
    onError: () => {
      onSetStatus("unsaved")
    },
    onSuccess: () => {
      onSetStatus("saved")
    }
  })

  const selectedEmojiHandler = (emojichar: string) => {
    if (status === "unsaved") return onSetStatus("unsaved")
    setSelectedEmoji(emojichar);
    onFormSelect?.(emojichar);
    debounced(emojichar)
  };

  const debounced = useDebouncedCallback((newEmoji: string) => {
    onSetStatus("pending")
    updateTaskEmoji(newEmoji)
  }, 1000)

  return (
    <EmojiSelector onSelectedEmoji={selectedEmojiHandler}>
      <button
        type="button"
        role="img"
        aria-label="emoji"
        className="text-3xl cursor-pointer inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/30 hover:bg-secondary/70 border border-border/40 hover:border-border/80 transition-all duration-200 shadow-xs hover:scale-[1.03] active:scale-[0.97] focus:outline-none"
      >
        {selectedEmoji}
      </button>
    </EmojiSelector>
  );
};

export default Logo;
