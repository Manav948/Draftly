import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const OptionBtn = ({ onClick, className, type = "button" , children , ...props }: Props) => {
  return (
    <Button
      type={type} 
      className={cn(
        "w-8 h-8 flex justify-center items-center rounded-lg " +
          "hover:bg-gray-200/70 dark:hover:bg-gray-700/50 transition-all",
        className
      )}
      size="icon"
      variant="ghost"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OptionBtn;
