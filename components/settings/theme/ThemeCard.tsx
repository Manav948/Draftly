"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Moon, Sun } from "lucide-react";

interface Props {
    theme: "light" | "dark" | "system";
    activeTheme?: string;
    onTheme: (theme: string) => void
}
const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
    return (
        <Card>
            <CardHeader>
                <div>
                    {theme === "light" && <Sun size={20} />}
                    {theme === "dark" && <Moon size={20} />}
                    {theme === "system" && <Laptop size={20} />}
                    <CardTitle>{theme[0].toUpperCase() + theme.slice(1)}Theme</CardTitle>
                </div>
                {activeTheme === theme && <Badge variant={"default"}>Active</Badge>}
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
                <p>Default {theme}</p>
            </CardFooter>
        </Card>
    )
}

export default ThemeCard
