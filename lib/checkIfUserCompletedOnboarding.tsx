import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";

export const checkIfUserCompletedOnboarding = async (currentPath: string) => {
  const session = await getAuthSession();
  if (!session) redirect("/");

  // if onboarding completed but user tries to open onboarding page → send to dashboard
  if (session.user.completeOnboarding && currentPath === "/onboarding") {
    redirect("/dashboard");
  }

  // if onboarding NOT completed but user tries to access a protected page → send to onboarding
  if (!session.user.completeOnboarding && currentPath !== "/onboarding") {
    redirect("/onboarding");
  }

  // if user is already on onboarding and not completed → allow them to stay
  return session;
};
