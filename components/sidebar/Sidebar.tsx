"use client";
import React from "react";
import Shortcut from "./sidebarShortcut/Shortcut";
import OptionSidebar from "./optionSidebar/OptionSidebar";

const Sidebar = () => {
  return (
    <aside
      className="
        flex flex-shrink-0 
        h-screen sticky top-0
        dark:bg-gray-950 dark:text-black
        bg-white text-black
        border-r border-gray-200 dark:border-gray-700
        shadow-md
      "
    >
      <Shortcut />
      <OptionSidebar />
    </aside>
  );
};

export default Sidebar;
