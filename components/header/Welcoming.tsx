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
      month: "short",
      day: "2-digit"
    })

    const time = formater.dateTime(date, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h24"
    })

    if (showOnlyOnPath && !pathname.includes(showOnlyOnPath)) return null;
    
    return (
      <div ref={ref}
        {...props}
        className={cn(
          "flex items-center gap-3 text-xs font-mono",
          hideOnDesktop && "lg:hidden",
          hideOnMobile && "hidden lg:flex",
          className
        )}>
        
        {/* Terminal path */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131313] border border-[#1f1f1f] text-[#888]">
          <span className="text-red-600">~</span>
          <span className="text-[#333]">/</span>
          <span className="text-[#bbb] font-medium">{user?.username || "guest"}</span>
        </div>

        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131313] border border-[#1f1f1f] text-[#666]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>Online</span>
        </div>

        {/* Date/Time */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[#3a3a3a]">
          <span>{day}</span>
          <span className="text-[#2a2a2a]">·</span>
          <span>{time}</span>
        </div>
      </div>
    )
  }
);

Welcoming.displayName = "Welcoming";

export default Welcoming;
