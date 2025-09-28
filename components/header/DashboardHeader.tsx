"use client";
import React from "react";
import User from "./User";
import BredCrumNav from "./BredCrumNav";
import Welcoming from "./Welcoming";

const DashboardHeader = () => {
  return (
    <header className="relative flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white dark:bg-gray-950">
      <div className="flex items-center gap-4 text-black">
        <BredCrumNav />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center hidden md:block">
        <Welcoming />
      </div>

      <div className="ml-auto">
        <User />
      </div>
    </header>
  );
};

export default DashboardHeader;
