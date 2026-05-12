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
  asChild?: boolean;
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
  asChild = false,
}: Props) => {
  const pathname = usePathname();
  const isActive = href === pathname || (include && pathname.includes(include));

  const content = (
    <span
      className={cn(
        buttonVariants({ variant, size }),
        "hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors", // Soft hover
        isActive
          ? workspaceIcon
            ? "font-semibold border-gray-400 dark:border-[#555] border-2"
            : disableActiveStateColor
            ? ""
            : "bg-gray-100 text-gray-900 dark:bg-[#1a1a1a] dark:text-[#f0f0f0] font-medium shadow-sm"
          : "text-gray-500 dark:text-gray-400", // Muted text for inactive
        className
      )}
    >
      {children}
    </span>
  );

  return asChild ? content : <Link href={href}>{content}</Link>;
};

export default ActiveLink;
