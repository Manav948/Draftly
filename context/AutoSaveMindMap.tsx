'use client'
import { createContext, useCallback, useContext, useState } from "react";
import { ReactFlowInstance, ReactFlowJsonObject } from "reactflow"
import { useSaveTaskState } from "./TaskSavingContext";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

interface AutoSaveMindMap {
    onSaved: () => void
    setRfInstance: React.Dispatch<React.SetStateAction<ReactFlowInstance | null>>;
    onSetIds: (mindMapsId: string, workspaceId: string) => void
}

interface Props {
    children: React.ReactNode
}
export const AutoSaveMindMapCtx = createContext<AutoSaveMindMap | null>(
    null
)
export const AutoSaveMindMapProvider = ({ children }: Props) => {
    const [rfInstace, setRfInstance] = useState<null | ReactFlowInstance>(null)
    const [ids, setIds] = useState<null | { mindMapId: string; workspaceId: string }>(null)
    const { onSetStatus } = useSaveTaskState()

    const { mutate: updateMindMap } = useMutation({
        mutationFn: async (flow: ReactFlowJsonObject) => {
            await axios.post(`/api/mind_maps/update`, {
                content: flow,
                workspaceId: ids?.workspaceId,
                mindMapId: ids?.mindMapId
            })
        },
        onError: (err: AxiosError) => {
            console.log(err)
            toast.error("MindMap not Updated")
        },
        onSuccess: () => {
            toast.success("MindMap Updated Successfully")
        }
    })

    const onSaved = useCallback(() => {
        if (rfInstace && ids) {
            const flow = rfInstace?.toObject()
            updateMindMap(flow)
        }
    }, [rfInstace, updateMindMap, ids])

    const onSetIds = useCallback((mindMapId: string, workspaceId: string) => {
        setIds({ mindMapId, workspaceId })
    }, [])
    return (
        <AutoSaveMindMapCtx.Provider value={{ setRfInstance, onSaved, onSetIds }}>
            {children}
        </AutoSaveMindMapCtx.Provider>
    )
}

export const useAutoSaveMindMap = () => {
    const ctx = useContext(AutoSaveMindMapCtx);
    if (!ctx) throw new Error("Invalid use")
    return ctx
}