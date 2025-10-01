"use client";

import { ThemeProvider as NextThemeProvider } from "@/providers/ThemeProvider";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ClientThemeProvider({ children }: Props) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
