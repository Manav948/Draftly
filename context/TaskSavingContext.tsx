"use client"

import { createContext, useContext, useState } from "react"

interface Props {
    children: React.ReactNode
}
interface SaveTaskContext {
    status: "unsaved" | "saved" | "pending",
    onSetStatus: (status: "unsaved" | "saved" | "pending") => void
}

export const SaveTaskContext = createContext<SaveTaskContext | null>(null)

export const SaveTaskStateProvider = ({ children }: Props) => {
    const [status, setStatus] = useState<"unsaved" | "saved" | "pending">("saved")

    const onSetStatus = (status: "unsaved" | "saved" | "pending") => {
        setStatus(status)
    }
    return (
        <SaveTaskContext.Provider value={{ status, onSetStatus }}>
            {children}
        </SaveTaskContext.Provider>
    )
}

export const useSaveTaskState = () => {
    const ctx = useContext(SaveTaskContext)
    if (!ctx) throw new Error("invalid use")
    return ctx
}