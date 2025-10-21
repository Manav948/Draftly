"use client";
import React, { useEffect } from "react";
import Shortcut from "./sidebarShortcut/Shortcut";
import OptionSidebar from "./optionSidebar/OptionSidebar";
import { useToggleSidebar } from "@/context/ToggleSidebar";
import CloseSidebar from "./CloseSidebar";
import { usePathname } from "next/navigation";
import { Workspace } from "@prisma/client";

interface Props {
    userWorkspace: Workspace[];
    userId: string
    userAdminWorkspaces: Workspace[];
}

const SidebarContainer = ({ userWorkspace, userId, userAdminWorkspaces }: Props) => {
    const { isOpen, setIsOpen } = useToggleSidebar();
    const pathname = usePathname();
    const createdWorkspaces = userWorkspace.filter((workspace) => workspace.creatorId == userId)

    // Auto-close sidebar on route change (mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname, setIsOpen]);

    return (
        <>
            <aside
                className={`
           top-0 sticky left-0 h-screen z-50 flex
          bg-white dark:bg-gray-950 border-r border-gray-300 dark:border-gray-700
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 shadow-lg" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Main Shortcut Sidebar */}
                <div className="w-16 md:w-20 flex flex-col justify-between">
                    <Shortcut userWorkspace={userWorkspace} activeWorkspaces={createdWorkspaces.length} />
                </div>

                {/* Option Sidebar (only for Settings route) */}
                <OptionSidebar activeWorkspaces={createdWorkspaces.length} userAdminWorkspaces={userAdminWorkspaces} />

                {/* Close button for mobile */}
                <CloseSidebar />
            </aside>

            {/* Overlay for mobile */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />
        </>
    );
};

export default SidebarContainer;
