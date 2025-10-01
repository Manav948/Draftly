"use client"
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'

const useChangeLocale = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter();
    const pathname = usePathname();

    const onChange = (nextLocale?: "EN" | "HI") => {
        if (!nextLocale) return; 
        setIsLoading(true);
        startTransition(() => {
            const segments = pathname?.split('/') || [];
            if (segments[1]?.toUpperCase() === "EN" || segments[1]?.toUpperCase() === "HI") {
                segments[1] = nextLocale.toLowerCase();
            } else {
                segments.splice(1, 0, nextLocale.toLowerCase());
            }
            const newPath = segments.join('/');
            router.replace(newPath);
        });
    };
    return { isLoading, isPending, onChange }
}

export default useChangeLocale
