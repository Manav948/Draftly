"use client";
import React from "react";
import User from "./User";
import BredCrumNav from "./BredCrumNav";
import OpenSidebar from "./OpenSidebar";
import SavingStatus from "./SavingStatus";

interface Props {
  addManualRoutes?: {
    name: string,
    href: string,
    useTranslate?: boolean
  }[];
  children?: React.ReactNode;
  workspaceHref?: string
  showingSavingStatus?: string
}

const DashboardHeader = ({ addManualRoutes, children, workspaceHref, showingSavingStatus }: Props) => {
  return (
    <header className="
      sticky top-0 z-40
      flex items-center justify-between
      w-full px-5 py-3
      dark:bg-[#0e0707] dark:text-[#f03d3d]
      backdrop-blur-xl
      border-b border-border/30 dark:border-white/20 shadow-sm
      transition-all duration-300
    ">
      {showingSavingStatus && <SavingStatus />}
      {/* Sidebar open button */}
      <div className="flex items-center gap-2">
        <OpenSidebar />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-3 text-foreground">
        <BredCrumNav addManualRoutes={addManualRoutes} workspaceHref={workspaceHref} />
      </div>

      {/* User + Action Buttons */}
      <div className="flex items-center gap-3 ml-auto">
        {children}
        <User />
      </div>
    </header>
  );
};

export default DashboardHeader;
