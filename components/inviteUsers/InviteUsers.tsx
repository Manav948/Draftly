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
        bg-gradient-to-br from-background/90 via-background/95 to-background/90 
        dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
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
