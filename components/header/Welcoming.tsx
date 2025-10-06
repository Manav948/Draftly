"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  showOnlyOnPath?: string;
}

const Welcoming = React.forwardRef<HTMLDivElement, Props>(
  ({ className, hideOnMobile, hideOnDesktop, showOnlyOnPath, ...props }, ref) => {
    const pathname = usePathname();

    if (showOnlyOnPath && pathname !== showOnlyOnPath) return null;
    else {
      return (
        <div ref={ref}
          {...props}
          className={cn(
            "space-y-1",
            hideOnDesktop && "lg:hidden",
            hideOnMobile && "hidden lg:block",
            className
          )}>
          <p className="font-semibold text-lg">
            Hey, <span className="text-primary">Manav</span> 👋
          </p>
          <p className="text-sm">Welcome back to Draftly</p>
        </div>
      );
    }
  }
);

Welcoming.displayName = "Welcoming";

export default Welcoming;
