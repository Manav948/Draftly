"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import AddworkspaceForm from "./AddworkspaceForm";
import { motion } from "framer-motion";
import Warning from "@/components/ui/warning";
import ActiveWorkspaceInfo from "@/components/common/ActiveWorkspaceInfo";

const Addworkspace = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("SIDEBAR");

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <HoverCard openDelay={250} closeDelay={250}>
          {/* Trigger Button */}
          <DialogTrigger asChild>
            <HoverCardTrigger>
              <Button
                onClick={() => setOpen(true)}
                variant="ghost"
                size="icon" 
              >
                <Plus />
              </Button>
            </HoverCardTrigger>
          </DialogTrigger>

          {/* Dialog */}
          <DialogContent
            className="max-w-lg p-0 overflow-hidden rounded-2xl shadow-2xl 
                       border border-gray-200 dark:border-gray-800
                       bg-white dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="p-6"
            >
              <DialogHeader className="mb-4">
                <DialogTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {t("MAIN.WORKSPACE_TITLE")}
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400 text-sm">
                  {t("MAIN.WORKSPACE_DESC")}
                </DialogDescription>
              </DialogHeader>
              <Warning className="hidden sm:flex gap-2" blue>
              <ActiveWorkspaceInfo className="text-left text-secondary-foreground" activeNumber={3} />
              </Warning>
              <AddworkspaceForm onSetOpen={setOpen} />
            </motion.div>
          </DialogContent>
        </HoverCard>
      </Dialog>
    </div>
  );
};

export default Addworkspace;
