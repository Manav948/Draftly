"use client"

import ActiveLink from "@/components/ui/active-link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Workspace } from "@prisma/client"
import { LayoutGrid } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import AssignedToMeWorkspace from "./AssignedToMeWorkspace"
import useAssignToMeParams from "@/hooks/useAssignToMeParams"

interface Props {
    userWorkspaces: Workspace[]
}

const RADIO_OPTIONS = [
    { id: "all", label: "All" },
    { id: "tasks", label: "Tasks" },
    { id: "mind-maps", label: "Mind Maps" },
] as const

const AssignedToMeFilter = ({ userWorkspaces }: Props) => {
    const router = useRouter()
    const { currentType, workspaceParam } = useAssignToMeParams()
    const handleChangeRadio = (value: "all" | "tasks" | "mind-maps") => {
        const workspace = workspaceParam ?? "all"
        router.replace(
            `/dashboard/assigned_to_me?workspace=${workspace}&type=${value}`
        )
    }

    return (
        <div className="space-y-6">

            <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">
                    Type
                </p>

                <RadioGroup
                    value={currentType}
                    onValueChange={handleChangeRadio}
                    className=""
                >
                    {RADIO_OPTIONS.map((radio) => (
                        <label
                            key={radio.id}
                            htmlFor={radio.id}
                            className="
                flex items-center rounded-md space-x-2 px-2 py-1
                cursor-pointer transition
                hover:bg-muted
              "
                            onClick={(e) => {
                                const button = e.currentTarget?.firstChild as HTMLButtonElement
                                const id = button.id as "all" | "mind-maps" | "tasks" | null
                                id && handleChangeRadio(id)
                            }}
                        >
                            <RadioGroupItem value={radio.id} id={radio.id} />
                            <span className="text-sm">{radio.label}</span>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <div className="space-y-1.5">
                <p className="text-sm font-semibold text-muted-foreground">
                    Workspace
                </p>

                <div className="space-y-1 flex flex-col gap-2">

                    <ActiveLink
                        href={`/dashboard/assigned_to_me?workspace=all&type=${currentType}`}
                        className="
              flex items-center rounded-md
              text-sm transition
              hover:bg-m hover:text-black
            "
                        disableActiveStateColor
                    >
                        <LayoutGrid size={18} />
                        <span>All Workspaces</span>
                    </ActiveLink>

                    {userWorkspaces.map((workspace) => (
                        <AssignedToMeWorkspace
                            currentType={currentType}
                            workspace={workspace}
                            workspaceFilterParam={workspaceParam}
                            href="dashboard/assigned_to_me"
                            key={workspace.id}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AssignedToMeFilter
