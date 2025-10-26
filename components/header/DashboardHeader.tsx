"use client";
import React from "react";
import User from "./User";
import BredCrumNav from "./BredCrumNav";
import OpenSidebar from "./OpenSidebar";

interface Props {
  addManualRoutes?: string[];
  children?: React.ReactNode;
}

const DashboardHeader = ({ addManualRoutes, children }: Props) => {
  return (
    <header className="
      sticky top-0 z-40
      flex items-center justify-between
      w-full px-5 py-3
      bg-gradient-to-r from-background/60 via-background/80 to-background/95
      dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
      backdrop-blur-xl
      border-b border-border/30 shadow-sm
      transition-all duration-300
    ">
      {/* Sidebar open button */}
      <div className="flex items-center gap-2">
        <OpenSidebar />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-3 text-foreground">
        <BredCrumNav addManualRoutes={addManualRoutes} />
      </div>

      {/* User + Action Buttons */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Additional Buttons Passed from Pages (like Invite, Notifications, etc.) */}
        {children}

        {/* User Profile */}
        <User />
      </div>
    </header>
  );
};

export default DashboardHeader;
