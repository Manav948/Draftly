"use client";
import React from "react";
import User from "./User";
import BredCrumNav from "./BredCrumNav";
import OpenSidebar from "./OpenSidebar";

interface Props {
  addManualRoutes?: string[];
}

const DashboardHeader = ({addManualRoutes} : Props) => {
  return (
    <>
      <header className="relative flex items-center justify-between px-5 py-3 bg-white dark:bg-gray-950 border-b border-gray-300 dark:border-gray-800 overflow-hidden">

        {/* Sidebar open button */}
        <div className="flex items-center text-white">
          <OpenSidebar />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-black dark:text-white">
          <BredCrumNav addManualRoutes={addManualRoutes} />
        </div>

        {/* User profile */}
        <div className="ml-auto cursor-pointer">
          <User />
        </div>
      </header>
    </>

  );
};

export default DashboardHeader;
