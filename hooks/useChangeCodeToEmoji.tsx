"use client";

import { changeCodeToEmoji } from "@/lib/changeCodetoEmoji";
import { useMemo } from "react";

export const useChangeCodeToEmoji = (code: string) => {
  return useMemo(() => {
    return changeCodeToEmoji(code)
  }, [code])
}
