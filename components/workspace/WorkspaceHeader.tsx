"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Network, PencilRuler, Workflow, ChevronDown, Trash2, Settings, Plus } from "lucide-react"
import NewTask from "../sidebar/optionSidebar/workspaceOption/action/NewTask"
import NewMindMap from "../sidebar/optionSidebar/workspaceOption/action/NewMindMap"
import { Workspace } from "@prisma/client"
import WorkspaceComponent from "../sidebar/sidebarShortcut/workspaces/Workspace"
import { cn } from "@/lib/utils"
import LeaveWorkspace from "../leaveworkspace/LeaveWorkspace"
import { Button } from "../ui/button"

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
    <header className="sticky top-0 z-30 border-b border-gray-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="flex flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between max-w-[1800px] mx-auto w-full">
        
        {/* Left: Workspace Selector */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333]">
            <Network size={12} className="text-gray-500 dark:text-gray-400" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 font-medium hover:bg-gray-100 dark:hover:bg-[#1a1a1a] data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-[#1a1a1a]">
                <span className="max-w-[180px] truncate text-sm">
                  {userWorkspace.find(w => w.id === activeWorkspaceId)?.name ?? "All Workspaces"}
                </span>
                <ChevronDown size={14} className="ml-1 opacity-50" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-[200px] dark:bg-[#111] dark:border-[#222]">
              <DropdownMenuItem
                onClick={() => onWorkspaceChange("all")}
                className={cn("cursor-pointer dark:focus:bg-[#1a1a1a]", activeWorkspaceId === "all" && "font-medium")}
              >
                All Workspaces
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-[#222]" />
              {userWorkspace.map(ws => (
                <DropdownMenuItem
                  key={ws.id}
                  onClick={() => onWorkspaceChange(ws.id)}
                  className={cn("cursor-pointer dark:focus:bg-[#1a1a1a] flex items-center gap-2", ws.id === activeWorkspaceId && "font-medium")}
                >
                  <WorkspaceComponent workspaces={ws} href={href} />
                  {ws.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* New Mind Map */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 dark:bg-[#111] dark:border-[#222] dark:hover:bg-[#1a1a1a] shadow-none">
                <Workflow size={14} /> 
                <span className="text-xs font-medium">New Mind Map</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-[#111] dark:border-[#222] p-1">
              <NewMindMap workspaceId={workspaceId} />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* New Task */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" className="h-8 gap-1.5 bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 shadow-none">
                <Plus size={14} /> 
                <span className="text-xs font-medium">New Task</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="dark:bg-[#111] dark:border-[#222] p-1">
              <NewTask workspaceId={workspaceId} />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings / Delete */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]">
                <Settings size={14} className="text-gray-500 dark:text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] dark:bg-[#111] dark:border-[#222]">
              <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Workspace Settings
              </div>
              <DropdownMenuSeparator className="dark:bg-[#222]" />
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-500 dark:focus:text-red-500 dark:focus:bg-red-500/10 cursor-pointer">
                <LeaveWorkspace workspace={workspace} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default WorkspaceHeader
