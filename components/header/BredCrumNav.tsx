"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const BredCrumNav = () => {
  const paths = usePathname();
  const pathNames = paths
    .split("/")
    .filter((path) => path !== "en" && path.trim() !== "");
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
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {t(link.toUpperCase())}
                  </Link>
                  <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                </>
              ) : (
                <span className="text-gray-950 dark:text-white font-semibold">
                  {t(link.toUpperCase())}
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
