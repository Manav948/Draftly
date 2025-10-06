"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Settings from "./Settings";

const OptionSidebar = () => {
  const pathname = usePathname();
  const isSettings = pathname.includes("/dashboard/settings");

  return (
    <div
      className={`
        flex flex-col flex-1 h-screen
        transition-all duration-300 ease-in-out
        bg-white dark:bg-gray-950 dark:text-white border-l border-gray-300 dark:border-gray-800
        ${isSettings ? "w-48 p-4 opacity-100" : "w-0 p-0 opacity-0 overflow-hidden"}
      `}
    >
      {isSettings && <Settings />}
    </div>
  );
};

export default OptionSidebar;
