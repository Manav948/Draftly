"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Moon, Sun } from "lucide-react";

interface Props {
  theme: "light" | "dark" | "system";
  activeTheme?: string;
  onTheme: (theme: string) => void;
}

const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
  const isActive = activeTheme === theme;

  return (
    <Card
      onClick={() => onTheme(theme)}
      className={`cursor-pointer transition-all duration-300 rounded-xl border 
        ${isActive ? "border-primary bg-primary/10 shadow-md" : "hover:border-primary/60 hover:shadow-sm"}
      `}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          {theme === "light" && <Sun size={22} className="text-yellow-500" />}
          {theme === "dark" && <Moon size={22} className="text-indigo-500" />}
          {theme === "system" && <Laptop size={22} className="text-gray-500 dark:text-gray-300" />}
          <CardTitle className="text-base font-semibold">
            {theme[0].toUpperCase() + theme.slice(1)} Theme
          </CardTitle>
        </div>
        {isActive && <Badge variant="default">Active</Badge>}
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground">
        {theme === "light" && "Bright and clean look"}
        {theme === "dark" && "Relaxed and eye-friendly"}
        {theme === "system" && "Follow your OS settings"}
      </CardContent>

      <CardFooter>
        <p className="text-xs text-muted-foreground">Click to apply</p>
      </CardFooter>
    </Card>
  );
};

export default ThemeCard;
