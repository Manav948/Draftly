"use client";
import React from "react";
import User from "./User";
import BredCrumNav from "./BredCrumNav";
import Welcoming from "./Welcoming";
import OpenSidebar from "./OpenSidebar";

const DashboardHeader = () => {
  return (
    <>
      <header className="relative flex items-center justify-between px-6 py-6 bg-white dark:bg-gray-950 border-b border-gray-300 dark:border-gray-800">

        {/* Sidebar open button */}
        <div className="flex items-center text-white">
          <OpenSidebar />
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-4 text-black dark:text-white">
          <BredCrumNav />
        </div>

        {/* User profile */}
        <div className="ml-auto cursor-pointer">
          <User />
        </div>
      </header>
      <div className="flex items-start justify-between px-6 py-4 bg-white dark:bg-gray-950 dark:border-gray-800">
        <Welcoming showOnlyOnPath="/dashboard" />
      </div>
    </>

  );
};

export default DashboardHeader;
