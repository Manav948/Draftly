"use client";
import { Workspace } from "@prisma/client";
import React from "react";
import WorkspaceComponent from "./Workspace";

interface Props {
  userWorkspaces: Workspace[];
  href : string
}

const Workspaces = ({ userWorkspaces , href

 }: Props) => {
  return (
    <div
      className="
        flex flex-col items-center gap-4
        px-2 overflow-y-hidden
      "
    >
      {userWorkspaces.map((workspace) => (
        <WorkspaceComponent key={workspace.id} workspaces={workspace} href={href} />
      ))}
    </div>
  );
};

export default Workspaces;
