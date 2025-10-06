"use client";
import { useToggleSidebar } from "@/context/ToggleSidebar";
import { Button } from "../ui/button";
import { PanelLeftOpen } from "lucide-react";

const OpenSidebar = () => {
  const { setIsOpen } = useToggleSidebar();

  return (
    <Button
      onClick={() => setIsOpen(true)}
      className="lg:hidden text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
      variant="ghost"
      size="icon"
    >
      <PanelLeftOpen className="w-5 h-5" />
    </Button>
  );
};

export default OpenSidebar;
