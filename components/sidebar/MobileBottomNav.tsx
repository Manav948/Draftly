"use client";

import React from "react";
import ActiveLink from "@/components/ui/active-link";
import { Home, Star, Plus, Clock, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Workspace } from "@prisma/client";
import NewTask from "./optionSidebar/workspaceOption/action/NewTask";
import NewMindMap from "./optionSidebar/workspaceOption/action/NewMindMap";

interface Props {
  userWorkspaces: Workspace[];
}

const MobileBottomNav = ({ userWorkspaces }: Props) => {
  const pathname = usePathname();
  const urlWorkspaceId = pathname.split("/")[4];
  const workspaceId = urlWorkspaceId || (userWorkspaces.length > 0 ? userWorkspaces[0].id : undefined);

  return (
    <div className="fixed bottom-0 left-0 lg:hidden w-full bg-white dark:bg-[#0c0c0c] border-t border-gray-300 dark:border-gray-800 z-[60] flex justify-between items-center h-16 px-4">
      <ActiveLink variant="ghost" size="icon" href="/dashboard" className="flex flex-col items-center justify-center w-12 h-12">
        <Home size={22} className={pathname === "/dashboard" ? "text-primary fill-primary/20" : "text-gray-500"} />
      </ActiveLink>
      
      <ActiveLink variant="ghost" size="icon" href="/dashboard/starred" className="flex flex-col items-center justify-center w-12 h-12">
        <Star size={22} className={pathname.includes("/dashboard/starred") ? "text-primary fill-primary/20" : "text-gray-500"} />
      </ActiveLink>

      <div className="flex justify-center -mt-8 relative z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center hover:scale-105 transition-transform">
              <Plus size={28} className="text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-52 mb-2 p-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151515] rounded-xl shadow-xl" side="top" align="center">
            {workspaceId ? (
              <div className="flex flex-col gap-1 w-full relative z-[70]">
                <NewTask workspaceId={workspaceId} />
                <NewMindMap workspaceId={workspaceId} />
              </div>
            ) : (
              <p className="text-sm p-3 text-center text-gray-500">Please select or create a workspace first.</p>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <ActiveLink variant="ghost" size="icon" href="/dashboard/assigned_to_me" className="flex flex-col items-center justify-center w-12 h-12" include="dashboard/assigned_to_me">
        <User2 size={22} className={pathname.includes("/dashboard/assigned_to_me") ? "text-primary fill-primary/20" : "text-gray-500"} />
      </ActiveLink>

      <ActiveLink variant="ghost" size="icon" href="/dashboard/pomodoro" className="flex flex-col items-center justify-center w-12 h-12" include="dashboard/pomodoro">
        <Clock size={22} className={pathname.includes("/dashboard/pomodoro") ? "text-primary fill-primary/20" : "text-gray-500"} />
      </ActiveLink>
    </div>
  );
};

export default MobileBottomNav;
