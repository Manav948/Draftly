"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { useLocale } from "next-intl";
import { LoginError } from "@/hooks/LoginError";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    providerName: "google" | "github";
    onLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export const ProviderSignInBtn = ({ children, providerName, onLoading, ...props }: Props) => {

    const [showLoggedInfo, setShowLoggedInfo] = useState(false);
    const locale = useLocale()
    LoginError(showLoggedInfo)
    const signInHandler = async () => {
        onLoading(true)
        setShowLoggedInfo(true)
        try {
            await signIn(providerName, { callbackUrl: `/${locale}/onboarding` })
        } catch (error) {
            console.error("Error in signHandler function")
            toast.error("Error occur during sign")
        } finally {
            onLoading(false);
        }

    }
    return (
        <Button onClick={signInHandler} {...props} variant={"secondary"} type="button">
            {children}
        </Button>
    )
}