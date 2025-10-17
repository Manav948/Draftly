"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

const availableRoutesWithTranselation = [
  "dashboard",
  "settings",
  "security",
  "theme"
]

interface Props {
  addManualRoutes?: string[];
}

const BredCrumNav = ({ addManualRoutes }: Props) => {
  const paths = usePathname();
  const pathNames = addManualRoutes ? addManualRoutes : paths
    .split("/")
    .filter((path) => path !== "en" && path !== "workspace" && path.trim() !== "");
  const t = useTranslations("ROUTES");

  if (pathNames.length > 0) {
    return (
      <nav className="flex items-center gap-2 text-sm text-black dark:text-white">
        {pathNames.map((link, i) => {
          const href = `/${pathNames.slice(0, i + 1).join("/")}`;
          const isLast = i + 1 === pathNames.length;

          return (
            <div key={i} className="flex items-center gap-2">
              {!isLast ? (
                <>
                  <Link
                    href={href}
                    className={cn(
                      "transition-all font-medium relative group hover:text-primary",
                      "after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
                    )}
                  >
                    {t(link.toUpperCase())}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </>
              ) : (
                <span
                  className={cn(
                    "font-semibold relative px-2 py-1 rounded-md",
                    "bg-gray-200/70 text-gray-900 dark:bg-white/80 dark:text-black shadow-sm cursor-pointer"
                  )}
                >
                  {availableRoutesWithTranselation.includes(link) ? t(link.toUpperCase()) : link}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  return null;
};

export default BredCrumNav;
