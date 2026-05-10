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
      w-full px-6 py-3
      bg-[#0e0e0e]/95 text-white
      backdrop-blur-xl
      border-b border-[#1a1a1a]
    ">
      <div className="flex items-center gap-4 w-1/3">
        <OpenSidebar />
        <div className="hidden sm:flex">
          <BredCrumNav addManualRoutes={addManualRoutes} workspaceHref={workspaceHref} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 w-1/3">
        {showingSavingStatus && <SavingStatus />}
        {children}
        <User />
      </div>
    </header>
  )
};

export default DashboardHeader;
