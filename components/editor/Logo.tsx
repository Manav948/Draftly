"use client";
import React, { useState } from "react";
import EmojiSelector from "@/components/common/EmojiSelector";

interface Props {
  onFormSelect?: (emoji: string) => void;
}

const Logo = ({ onFormSelect }: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState("🧠");

  const selectedEmojiHandler = (emoji: string) => {
    setSelectedEmoji(emoji);
    onFormSelect?.(emoji);
  };

  return (
    <EmojiSelector onSelectedEmoji={selectedEmojiHandler}>
      <span
        role="img"
        aria-label="emoji"
        className="text-2xl sm:text-3xl cursor-pointer inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 text-white shadow-md"
      >
        {selectedEmoji}
      </span>
    </EmojiSelector>
  );  
};

export default Logo;
