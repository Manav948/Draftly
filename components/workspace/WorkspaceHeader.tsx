"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar"
import { Network, PencilRuler, Workflow, ChevronDown, Trash2 } from "lucide-react"
import NewTask from "../sidebar/optionSidebar/workspaceOption/action/NewTask"
import NewMindMap from "../sidebar/optionSidebar/workspaceOption/action/NewMindMap"
import { Workspace } from "@prisma/client"
import WorkspaceComponent from "../sidebar/sidebarShortcut/workspaces/Workspace"
import { cn } from "@/lib/utils"
import LeaveWorkspace from "../leaveworkspace/LeaveWorkspace"

interface Props {
  workspaceId: string
  userWorkspace: Workspace[]
  href: string
  workspace: Workspace
  activeWorkspaceId: string
  onWorkspaceChange: (id: string) => void
}

const WorkspaceHeader = ({
  workspaceId,
  userWorkspace,
  href,
  workspace,
  activeWorkspaceId,
  onWorkspaceChange,
}: Props) => {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

        <Menubar className="border-none bg-transparent p-0">
          <MenubarMenu>
            <MenubarTrigger
              className={cn(
                "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted"
              )}
            >
              <Network size={16} />
              <span className="max-w-[180px] truncate">
                {userWorkspace.find(w => w.id === activeWorkspaceId)?.name ?? "All"}
              </span>
              <ChevronDown size={14} />
            </MenubarTrigger>

            <MenubarContent align="start">
              <MenubarItem
                onClick={() => onWorkspaceChange("all")}
                className={activeWorkspaceId === "all" ? "font-semibold text-primary" : ""}
              >
                All Workspaces
              </MenubarItem>

              {userWorkspace.map(ws => (
                <MenubarItem
                  key={ws.id}
                  onClick={() => onWorkspaceChange(ws.id)}
                  className={ws.id === activeWorkspaceId ? "font-semibold text-primary" : ""}
                >
                  <WorkspaceComponent workspaces={ws} href={href} />
                  {ws.name}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Menubar className="border-none bg-transparent p-0 flex gap-2">
          <MenubarMenu>
            <MenubarTrigger className="gap-2 px-3 py-2 hover:bg-muted">
              <PencilRuler size={16} /> New Task
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem>
                <NewTask workspaceId={workspaceId} />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="gap-2 px-3 py-2 hover:bg-muted">
              <Workflow size={16} /> New Mind Map
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem>
                <NewMindMap workspaceId={workspaceId} />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="gap-2 px-3 py-2 hover:bg-muted text-red-500">
              <Trash2 size={16} /> Delete Worksapce
            </MenubarTrigger>
            <MenubarContent align="end">
              <MenubarItem onClick={(e) => e.preventDefault()}>
                <LeaveWorkspace workspace={workspace} />
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </header>
  )
}

export default WorkspaceHeader
