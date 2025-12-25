import { Workspace } from "@prisma/client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus2 } from "lucide-react";
import InviteContent from "./InviteContent";

interface Props {
  workspace: Workspace;
}

const InviteUsers = ({ workspace }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
        >
          <UserPlus2 size={18} />
          <span>Invite</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="
        max-w-lg w-full
        dark:bg-[#0e0707]
        border border-border/40 rounded-2xl shadow-xl
        backdrop-blur-md p-6
      ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Invite users to <span className="text-foreground">{workspace.name}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1">
            Share access to this workspace with your teammates by sending them an invite link or email.
          </DialogDescription>
        </DialogHeader>
        <DialogHeader>
            <InviteContent workspace={workspace} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUsers;
