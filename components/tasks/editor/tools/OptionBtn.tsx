import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
  type?: "button";
}

const OptionBtn = ({ onClick, icon, className, type = "button" }: Props) => {
  return (
    <Button
      type={type} 
      className={cn(
        "w-8 h-8 flex justify-center items-center rounded-lg " +
          "hover:bg-gray-200/70 dark:hover:bg-gray-700/50 transition-all shadow-sm",
        className
      )}
      size="icon"
      variant="ghost"
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};

export default OptionBtn;
