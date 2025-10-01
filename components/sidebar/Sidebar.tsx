"use client";
import React from "react";
import Shortcut from "./sidebarShortcut/Shortcut";
import OptionSidebar from "./optionSidebar/OptionSidebar";

const Sidebar = () => {
  return (
    <aside
      className="
        flex h-screen sticky top-0
        bg-white dark:bg-gray-950
        border-r border-black dark:border-gray-300
      "
    >
      <div className="w-16 md:w-20 bg-red-500 flex flex-col justify-between">
        <Shortcut />
      </div>
      <OptionSidebar />
    </aside>
  );
};

export default Sidebar;
