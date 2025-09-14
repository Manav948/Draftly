"use client"
import { ThemeSwitcher } from "@/components/switcher/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Home() {
  const logoutHandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`
    })
  }
  return (
    <>
      <Button onClick={logoutHandler}>Logout</Button>
      <ThemeSwitcher />
    </>
  );
}
