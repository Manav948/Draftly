"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  theme: "light" | "dark" | "system";
  activeTheme?: string;
  onTheme: (theme: string) => void;
}

const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
  const isActive = activeTheme === theme;

  // Define theme-based gradient styles
  const themeGradients: Record<string, string> = {
    light: "from-yellow-100 via-white to-gray-100 text-gray-900",
    dark: "from-gray-950 via-gray-900 to-black text-gray-100",
    system: "from-blue-900 via-gray-900 to-gray-950 text-gray-100",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        onClick={() => onTheme(theme)}
        className={`
          cursor-pointer overflow-hidden rounded-2xl border backdrop-blur-md
          transition-all duration-500 ease-in-out
          ${isActive
            ? "border-primary/60 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            : "border-gray-800/60 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"}
          bg-gradient-to-br ${themeGradients[theme]}
        `}
      >
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "light" && <Sun size={22} className="text-yellow-400" />}
            {theme === "dark" && <Moon size={22} className="text-indigo-400" />}
            {theme === "system" && <Laptop size={22} className="text-blue-400" />}
            <CardTitle className="text-base font-semibold capitalize tracking-wide">
              {theme} Mode
            </CardTitle>
          </div>
          {isActive && (
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-primary to-pink-500 text-white shadow-md"
            >
              Active
            </Badge>
          )}
        </CardHeader>

        <CardContent className="text-sm text-gray-300">
          {theme === "light" && "Bright and minimal aesthetic for clarity."}
          {theme === "dark" && "Smooth and elegant for comfortable viewing."}
          {theme === "system" && "Automatically matches your device setting."}
        </CardContent>

        <CardFooter>
          <p className="text-xs text-gray-400 italic">Click to apply</p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
