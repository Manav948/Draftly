"use client";
import React, { useEffect } from "react";
import Shortcut from "./sidebarShortcut/Shortcut";
import OptionSidebar from "./optionSidebar/OptionSidebar";
import { useToggleSidebar } from "@/context/ToggleSidebar";
import CloseSidebar from "./CloseSidebar";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  const pathname = usePathname();

  // Auto-close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <>
      <aside
        className={`
          fixed lg:static top-0 left-0 h-screen z-50 flex
          ${isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Main Shortcut Sidebar */}
        <div className="w-16 md:w-20 flex flex-col justify-between">
          <Shortcut />
        </div>

        {/* Option Sidebar (only for Settings route) */}
        <OptionSidebar />

        {/* Close button for mobile */}
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
