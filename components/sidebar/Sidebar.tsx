"use client";
import React from "react";
import Shortcut from "./sidebarShortcut/Shortcut";
import OptionSidebar from "./optionSidebar/OptionSidebar";
import { useToggleSidebar } from "@/context/ToggleSidebar";
import CloseSidebar from "./CloseSidebar";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useToggleSidebar();

  return (
    <>
      <aside
        className={`
          flex h-screen sticky top-0 z-50
          bg-white dark:bg-gray-950
          border-r border-gray-300 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 shadow-md" : "-translate-x-full lg:translate-x-0 shadow-none"}
        `}
      >
        {/* Icon shortcuts */}
        <div className="w-16 md:w-20 flex flex-col justify-between">
          <Shortcut />
        </div>

        {/* Settings Sidebar */}
        <OptionSidebar />

        {/* Close button */}
        <CloseSidebar />
      </aside>

      {/* Overlay for mobile */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />
    </>
  );
};

export default Sidebar;
