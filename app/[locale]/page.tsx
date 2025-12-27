"use client"
import { HomePage } from "@/components/homePage/HomePage";
import { ThemeSwitcher } from "@/components/switcher/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
