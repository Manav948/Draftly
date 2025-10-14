"use client";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useFormatter } from "next-intl";
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
    const { data: session } = useSession();
    const user = session?.user
    const formater = useFormatter();
    const date = new Date()
    
    const day = formater.dateTime(date, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })

    const time = formater.dateTime(date, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h24"
    })

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
        <span>{day}</span>
        <span className="ml-2">{time}</span>
        </div>
      );
    }
  }
);

Welcoming.displayName = "Welcoming";

export default Welcoming;
