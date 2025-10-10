"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
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
    const {data : session} = useSession();
    const user = session?.user

    if (showOnlyOnPath && !pathname.includes(showOnlyOnPath)) return null;
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
            Hey, <span className="text-primary">{user?.username}</span> 👋
          </p>
          <p className="text-sm">Welcome back to Draftly</p>
        </div>
      );
    }
  }
);

Welcoming.displayName = "Welcoming";

export default Welcoming;
