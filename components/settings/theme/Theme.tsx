"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/ui/LoadingState";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeCard from "./ThemeCard";

const Theme = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingState className="w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start h-full w-full bg-white dark:bg-gray-950">
            <Card className="w-full mt-20 max-w-6xl shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Theme</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                        Select how you would like your interface to look. Choose from{" "}
                        <span className="font-medium">Light</span>,{" "}
                        <span className="font-medium">Dark</span>, or{" "}
                        <span className="font-medium">System</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <ThemeCard onTheme={setTheme} theme="light" activeTheme={theme} />
                        <ThemeCard onTheme={setTheme} theme="dark" activeTheme={theme} />
                        <ThemeCard onTheme={setTheme} theme="system" activeTheme={theme} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Theme;
