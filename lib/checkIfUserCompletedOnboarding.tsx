import { redirect } from "next/navigation";
import { getAuthSession } from "./auth"

export const checkIfUserCompletedOnboarding = async (currnetPath: string) => {
    const session = await getAuthSession();
    if (!session) redirect("/")
    if (session.user.completeOnboarding && currnetPath === "/onboarding") {
        redirect("/dashboard");
    }
    if (!session.user.completeOnboarding && currnetPath === "/onboarding") {
        redirect("/onboarding?error=not-completed-onboarding");
    }
    return session;
}