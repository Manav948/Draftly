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
    </span>
  );

  return asChild ? content : <Link href={href}>{content}</Link>;
};

export default ActiveLink;
