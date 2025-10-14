"use client";
import { Workspace } from "@prisma/client";
import React from "react";
import WorkspaceComponent from "./Workspace";

interface Props {
  userWorkspaces: Workspace[];
}

const Workspaces = ({ userWorkspaces }: Props) => {
  return (
    <div
      className="
        flex flex-col items-center gap-4
        px-2 overflow-y-hidden
      "
    >
      {userWorkspaces.map((workspace) => (
        <WorkspaceComponent key={workspace.id} workspaces={workspace} />
      ))}
    </div>
  );
};

export default Workspaces;
