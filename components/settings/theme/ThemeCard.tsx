"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Moon, Sun, Check } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  theme: "light" | "dark" | "system";
  activeTheme?: string;
  onTheme: (theme: string) => void;
}

const ThemeCard = ({ theme, activeTheme, onTheme }: Props) => {
  const isActive = activeTheme === theme;

  const themeCardStyles: Record<string, string> = {
    light: "bg-white text-gray-900 border-gray-200 dark:bg-[#161616] dark:text-gray-100 dark:border-[#222]",
    dark: "bg-[#111] text-gray-100 border-[#222] dark:bg-[#0c0c0c] dark:border-[#222]",
    system: "bg-white text-gray-900 dark:bg-[#141414] dark:text-gray-100 border-gray-200 dark:border-[#222]",
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <Card
        onClick={() => onTheme(theme)}
        className={`
          cursor-pointer overflow-hidden rounded-2xl border group
          transition-all duration-200 ease-in-out
          ${themeCardStyles[theme]}
          ${isActive
            ? "border-red-500 dark:border-red-500 shadow-md shadow-red-500/10 ring-1 ring-red-500/30"
            : "hover:border-gray-300 dark:hover:border-[#333] hover:shadow-sm"}
        `}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-3">
            {theme === "light" && <Sun size={20} className="text-red-500" />}
            {theme === "dark" && <Moon size={20} className="text-red-500" />}
            {theme === "system" && <Laptop size={20} className="text-red-500" />}
            <CardTitle className="text-base font-semibold capitalize tracking-wide">
              {theme} Mode
            </CardTitle>
          </div>
          {isActive && (
            <Badge
              className="bg-red-500 hover:bg-red-600 text-white font-medium text-[11px] px-2.5 py-0.5 shadow-sm border-none flex items-center gap-1"
            >
              <Check size={12} />
              Active
            </Badge>
          )}
        </CardHeader>

        <CardContent className="text-xs text-gray-500 dark:text-[#777] leading-relaxed pt-1">
          {theme === "light" && "Bright and clean aesthetic designed for daytime clarity."}
          {theme === "dark" && "Sleek and immersive dark background for comfortable viewing."}
          {theme === "system" && "Automatically adapts to your device preferences."}
        </CardContent>

        <CardFooter className="pt-3 pb-4 border-t border-gray-100 dark:border-[#1a1a1a] mt-2">
          <p className="text-[11px] font-medium text-gray-400 dark:text-[#555] group-hover:text-red-500 transition-colors">
            {isActive ? "Currently selected" : "Click to select"}
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ThemeCard;
