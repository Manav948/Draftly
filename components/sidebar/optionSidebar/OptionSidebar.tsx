"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Settings from "./Settings";

const OptionSidebar = () => {
  const pathname = usePathname();

  if (pathname === "/dashboard") return null;

  return (
    <div
      className={`
        h-full flex flex-col transition-all duration-300
        bg-white dark:bg-gray-950 dark:text-white 
        border-l border-gray-200 dark:border-gray-700
        ${pathname.includes("/dashboard/settings") ? "w-48 p-4" : "w-0 p-0 overflow-hidden"}
      `}
    >
      {pathname.includes("/dashboard/settings") && <Settings />}
    </div>
  );
};

export default OptionSidebar;
