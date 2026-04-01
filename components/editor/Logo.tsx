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
      <span
        role="img"
        aria-label="emoji"
        className="text-2xl sm:text-3xl cursor-pointer inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted hover:bg-muted/70 transition-colors shadow-sm"
      >
        {selectedEmoji}
      </span>
    </EmojiSelector>
  );
};

export default Logo;
