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
        <div className="flex justify-center items-start h-full w-full  
                        dark:bg-[#0e0707] dark:text-[#f03d3d]
                        text-gray-100 py-16 px-4 sm:px-8 transition-all">

            <Card className="w-full max-w-5xl dark:bg-[#0e0707] dark:text-[#f03d3d]
                             backdrop-blur-xl border rounded-2xl shadow-2xl 
                             transition-all duration-500 hover:shadow-primary/30">

                <CardHeader className="space-y-2 text-center py-8">
                    <CardTitle className="text-3xl font-extrabold 
                                         bg-clip-text text-transparent 
                                         bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                        Theme Preferences
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm max-w-md mx-auto">
                        Customize your interface look and feel. You can switch between{" "}
                        <span className="text-primary font-semibold">Light</span>,{" "}
                        <span className="text-pink-500 font-semibold">Dark</span>, or{" "}
                        <span className="text-blue-400 font-semibold">System</span> mode.
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
