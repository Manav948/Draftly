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
        bg-white dark:bg-gray-950
        w-20 md:w-24 lg:w-64
      "
    >
      <Shortcut />
      <OptionSidebar />
    </aside>
  );
};

export default Sidebar;
