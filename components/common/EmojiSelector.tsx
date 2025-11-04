"use client"
import React, { useMemo, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Picker from '@emoji-mart/react'
import data from "@emoji-mart/data"
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
interface Props {
    asChild?: boolean;
    className?: string;
    children: React.ReactNode
    setSelectedEmoji: React.Dispatch<React.SetStateAction<string>>
}

interface OnSelect {
    id: string,
    keyword: string[],
    name: string,
    native: string,
    shortcodes: string,
    unified: string
}

const EmojiSelector = ({ asChild, className, children, setSelectedEmoji }: Props) => {
    const { theme, setTheme, systemTheme } = useTheme();
    const locale = useLocale();
    const [open, setOpen] = useState(false);

    const emojiTheme = useMemo(() => {
        switch (theme) {
            case "dark":
                return "dark";
            case "light":
                return "light"
            case "system":
                return systemTheme
        }
    }, [theme, systemTheme])
    return (
        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild={asChild}>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent asChild>
                <div>
                    <Picker data={data} emojiSize={20} emojiButtonSize={32} theme={emojiTheme} locale={locale} onEmojiSelected={(e: OnSelect) => {
                        setSelectedEmoji(e.native);
                        setOpen(false)
                    }} />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default EmojiSelector
