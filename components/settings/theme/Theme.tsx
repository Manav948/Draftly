"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/ui/LoadingState";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react"
import ThemeCard from "./ThemeCard";

const Theme = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return (
            <div>
                <LoadingState className="w-12 h-12" />
            </div>
        )
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                    Select how you would like your interface to look. select theme from dark, light or system
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ThemeCard onTheme={setTheme} theme="light" activeTheme={theme} />
                <ThemeCard onTheme={setTheme} theme="dark" activeTheme={theme} />
                <ThemeCard onTheme={setTheme} theme="system" activeTheme={theme} />
            </CardContent>

        </Card>
    )
}

export default Theme
