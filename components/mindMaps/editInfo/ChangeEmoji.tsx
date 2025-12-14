"use client"
import React, { useEffect, useState } from 'react'
import { useChangeCodeToEmoji } from '@/hooks/useChangeCodeToEmoji';
import EmojiSelector from '@/components/common/EmojiSelector';

interface Props {
    emoji: string,
    onFormSelect: (emoji: string) => void
}
const ChangeEmoji = ({ emoji, onFormSelect }: Props) => {
    const [selectedEmoji, setSelectedEmoji] = useState(emoji);
    useEffect(() => {
        setSelectedEmoji(emoji)
    }, [emoji])
    const renderEmoji = useChangeCodeToEmoji(selectedEmoji)

    const emojiSelectHandler = (newEmoji: string) => {
        setSelectedEmoji(newEmoji);
        onFormSelect(newEmoji)
    }
    console.log("Emoji from slecter : " , emoji)
    return (
        <div>
            <EmojiSelector onSelectedEmoji={emojiSelectHandler}>
                <span className='w-16 h-16 rounded-lg bg-secondary flex justify-center items-center text-3xl'>
                    {renderEmoji}
                </span>
            </EmojiSelector>
        </div>
    )
}

export default ChangeEmoji
