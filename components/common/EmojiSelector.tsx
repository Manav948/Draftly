"use client";

import React, { useMemo, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

interface Props {
    asChild?: boolean;
    className?: string;
    children: React.ReactNode;
    onSelectedEmoji: (emoji: string) => void;
}

interface OnSelect {
    id: string;
    keyword: string[];
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
}

const EmojiSelector = ({ asChild, children, onSelectedEmoji }: Props) => {
    const { theme, systemTheme } = useTheme();
    const locale = useLocale();
    const [open, setOpen] = useState(false);

    const emojiTheme = useMemo(() => {
        if (theme === "system") return systemTheme === "dark" ? "dark" : "light";
        return theme === "dark" ? "dark" : "light";
    }, [theme, systemTheme]);
    return (
        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

            <DropdownMenuContent className="p-2 w-[320px] sm:w-[360px] rounded-xl shadow-lg bg-white dark:bg-gray-900">
                <div className="rounded-md overflow-hidden">
                    <Picker
                        data={data}
                        emojiSize={20}
                        emojiButtonSize={32}
                        theme={emojiTheme}
                        locale={locale as any}
                        onEmojiSelect={(emoji: any) => {
                            onSelectedEmoji(emoji.native)
                            setOpen(false)
                        }}
                    />
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default EmojiSelector;
