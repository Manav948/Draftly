"use client";
import { useToggleSidebar } from "@/context/ToggleSidebar";
import { Button } from "../ui/button";
import { PanelLeftClose } from "lucide-react";

const CloseSidebar = () => {
  const { isOpen, setIsOpen } = useToggleSidebar();

  return (
    <Button
      onClick={() => setIsOpen(false)}
      className={`absolute right-[-2.5rem] top-6 z-50 rounded-l-none shadow-md 
        transition-all duration-300 lg:hidden
        ${!isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
      size="icon"
      variant="secondary"
    >
      <PanelLeftClose className="w-5 h-5" />
    </Button>
  );
};

export default CloseSidebar;
