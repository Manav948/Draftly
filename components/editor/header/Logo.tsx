"use client"
import EmojiSelector from '@/components/common/EmojiSelector'
import React, { useState } from 'react'

const Logo = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("🧠")

  return (
    <EmojiSelector onSelectedEmoji={setSelectedEmoji}>
      <span className="text-2xl sm:text-3xl cursor-pointer">
        {selectedEmoji}
      </span>
    </EmojiSelector>
  )
}

export default Logo
