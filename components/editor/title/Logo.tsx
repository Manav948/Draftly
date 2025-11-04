"use client"
import EmojiSelector from '@/components/common/EmojiSelector'
import React, { useState } from 'react'

const Logo = () => {
    const [selectedEmoji, setSelectedEmoji] = useState("🧠")
    return (
        <EmojiSelector setSelectedEmoji={setSelectedEmoji} >
            <span>{selectedEmoji}</span>
        </EmojiSelector>
    )
}

export default Logo
