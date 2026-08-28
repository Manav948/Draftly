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
            <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#0c0c0c]">
                <LoadingState className="w-12 h-12 text-red-500" />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start h-full w-full min-h-screen  
                        bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-white
                        py-12 px-4 sm:px-8 transition-colors duration-200">

            <Card className="w-full max-w-4xl bg-white dark:bg-[#111] text-gray-900 dark:text-[#f0f0f0]
                             border border-gray-200/80 dark:border-[#1f1f1f] rounded-2xl shadow-sm hover:shadow-md 
                             transition-all duration-300">

                <CardHeader className="space-y-2 text-center py-8">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Theme Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-500 dark:text-[#666] text-sm max-w-md mx-auto">
                        Customize your interface look and feel. Switch seamlessly between{" "}
                        <span className="text-red-500 font-semibold">Light</span>,{" "}
                        <span className="text-red-500 font-semibold">Dark</span>, or{" "}
                        <span className="text-red-500 font-semibold">System</span> mode.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-6 pb-10">
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
