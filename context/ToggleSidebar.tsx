"use client"

import { createContext, useContext, useState } from "react";

interface Props {
    children: React.ReactNode
}

interface ToggleSidebarContext {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToggleSidebarContext = createContext<ToggleSidebarContext | null> (
    null
);

export const ToggleSidebarProvider = ({children} : Props) => {
    const [isOpen , setIsOpen] = useState(false);
    return (
        <ToggleSidebarContext.Provider value={{isOpen , setIsOpen}}>
            {children}
        </ToggleSidebarContext.Provider>
    );
}

export const useToggleSidebar = () => {
    const ctx = useContext(ToggleSidebarContext);
    if(!ctx) throw new Error("Invalid Use");
    return ctx
}