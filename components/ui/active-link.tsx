"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface Props {
  href: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  children?: React.ReactNode;
  include?: string;
  workspaceIcon?: boolean;
  disableActiveStateColor?: boolean;
}

const ActiveLink = ({
  href,
  className,
  variant = "default",
  size = "default",
  children,
  include,
  workspaceIcon,
  disableActiveStateColor = false,
}: Props) => {
  const pathname = usePathname();

  const isActive =
    href === pathname || (include && pathname.includes(include));

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size }),
        isActive
          ? workspaceIcon
            ? "font-semibold border-secondary-foreground border-2"
            : disableActiveStateColor
            ? ""
            : "bg-secondary font-semibold"
          : "",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
